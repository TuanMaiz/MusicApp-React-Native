const { ApolloServer, gql } = require('apollo-server');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
dotenv.config();

const {DB_URI, DB_NAME, JWT_Secret, ADMIN_ID} = process.env;

const _idToString = ({_id}) => {
  objId = JSON.stringify(_id);
  objId = objId.slice(1); //Remove quote at the beginning of string
  objId = objId.slice(0, 24);//Remove quote at the end of string
  return objId;
}

const getToken = (user) => jwt.sign({id: user._id}, JWT_Secret, {expiresIn: '14 days'})

const getUserFromToken = async (token, db) =>{
  if(!token){
    return null;
  }
  tokenData = jwt.verify(token, JWT_Secret);
  if(!tokenData?.id){
    return null;
  }

  return (await db.collection("Users").findOne({_id: ObjectId(tokenData.id)}));
}

const typeDefs = gql`
  type Query {
    myPlayLists: [PlayList]
    searchSongByName(name: String!): [Song]
    searchSongByTitle(title: String!): [Song]
    myLikedSongs: [Song]
  }

  type Mutation {
    signUp(input: signUpInput!): AuthUser!
    signIn(input: signInInput!): AuthUser!
    createPlayList(input: createPlayListInput!): PlayList!
    addSongToPlayList(songId: String!, playListId: String!): PlayList! #addSongToPlayList ~ update play list
    likeASong (songId: String!): User!
    addSong(input: addSongInput!): Song!
    #Draft
    addTitleToSong(input: songTitleInput!): Song
    updateSongTitle(input: songTitleInput!): Song
    deleteSongTitle(input: songTitleInput!): Song 
    #Draft
    deleteSong(songId: String!): Song
    updateSong(input: updateSongInput!): Song
  }

  input signInInput {
    email: String!
    password: String!
  }

  input signUpInput {
    email: String!
    password: String!
    name: String!
    avatar: String
  }

  input addSongInput {
    name: String!
    author: String!
    URI: String!
    title: String #Khong nhap vao mang title duoc
    imageURL: String
  }

  input updateSongInput{
    songId: String!
    name: String
    author: String
    URI: String
    imageURL: String
    title: String
  }

  #Draft
  input songTitleInput {
    songId: String!
    title: String!
  }

  input createPlayListInput {
    name: String!
    imageURL: String
    description: String
  }

  type AuthUser {
    user: User!
    token: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    likedSongs: [Song]
    avatar: String
  }

  type Song {
    id: ID!
    name: String!
    author: String!
    URI: String!
    imageURL: String!
    title: [String!]!
  }

  type PlayList {
    id: ID!
    author: User!
    name: String!
    songArr: [Song]
    imageURL: String
    description: String
  }
  
`;

const resolvers = {
  Query: {
    searchSongByName: async (root, {name}, {db}) =>  await db.collection("Songs").find({name: name}).toArray(), //Can add authorization by token
    myPlayLists: async (root, data, {db, user}) => {
      if(!user) throw new Error("Please sign in to see your play list!")
      const playListArr = await db.collection("PlayLists").find({"author._id": user._id}).toArray();
      return playListArr;
    },
    searchSongByTitle: async (root, {title}, {db, user}) => await db.collection("Songs").find({title: title}).toArray(),
    myLikedSongs: async (root, data, {db, user}) => {
      if(!user) throw new Error("Please sign in to see your liked song!")
      return (user.likedSongs)

    }
    
  },
  Mutation: {
    addTitleToSong: async (root, {title}, {db, user}) =>{

    }, 
    signUp: async (root, {input}, {db}) => {
      userEmail = await db.collection("Users").findOne({email: input.email});
      if (userEmail){
        throw new Error("Email already existed");
      }
      const hashedPassword = bcryptjs.hashSync(input.password);
      const user = {
        ...input,
        password: hashedPassword
      }
      const result = await db.collection("Users").insertOne(user);
      return({
        user,
        token: getToken(user)
      });

    },
    signIn: async (root, {input}, {db}) => {
      userEmail = input.email;
      user = await db.collection("Users").findOne({email: userEmail});
      //Check if email is already existed
      if (!user) {
        throw new Error("Invalid email or password!");
      }
      const checkPassword = bcryptjs.compareSync(input.password, user.password);
      if (!checkPassword) {
        throw new Error("Invalid email or password!");
      }
      return ({
        token: getToken(user),
        user,
      });
    },
// Chi nhap vao 1 title, khong nhap mang cac title duoc
    addSong: async (root, {input}, {db, user}) => {
      //Check if user is admin
      if (_idToString(user)!= ADMIN_ID) 
      {
        throw new Error("Only admin can add song to database")
      }
      //Check if song is already existed
      song = await db.collection("Songs").findOne({name: input.name, author: input.author, URI: input.URI});
      if (song){
        console.log("Song was already added.");
        return ({...song})
      }
      const newSong = {
        name: input.name,
        author: input.author,
        imageURL: input.imageURL,
        URI: input.URI,
        title: [input.title]
      }
      await db.collection("Songs").insertOne(newSong);
      // console.log(newSong);
      return({
        ...newSong
      })
    },
    
    deleteSong: async (root, {songId}, {db, user}) => {
      //Check if user is admin
      if (_idToString(user)!= ADMIN_ID) 
      {
        throw new Error("Only admin can delete song in database")
      }
      //Check if song is existed, if not return null
      songToDelete = await db.collection("Songs").findOne({_id: ObjectId(songId)})
      if(songToDelete == null) return null;
      await db.collection("Songs").deleteOne({_id: ObjectId(songId)});
      return (songToDelete);
    },

    updateSong: async (root, {input}, {db, user}) => {
      //Check if user is admin
      if (_idToString(user)!= ADMIN_ID) 
      {
        throw new Error("Only admin can update song in database")
      }
      //Find song to update
      songToUpdate = await db.collection("Songs").findOne({_id: ObjectId(input.songId)})
      //Check if song is existed if not return null
      if(songToUpdate == null) return null
      if(input.name){
        songToUpdate = {...songToUpdate, name: input.name}
      }
      if(input.author){
        songToUpdate = {...songToUpdate, author: input.author}
      }
      if(input.URI){
        songToUpdate = {...songToUpdate, URI: input.URI}
      }
      if(input.imageURL){
        songToUpdate = {...songToUpdate, imageURL: input.imageURL}
      }
      if(input.title){
        songToUpdate = {...songToUpdate, title: [input.title]}
      }
      //Delete _id to update document in mongodb
      delete songToUpdate._id
      await db.collection("Songs").replaceOne({_id: ObjectId(input.songId)},{...songToUpdate})
      //Add id to return to api
      songToUpdate = {...songToUpdate, id: input.songId}
      return songToUpdate;
    },

    createPlayList: async (root, {input}, {db, user}) => {
      if (!user) throw new Error("Please sign in to create your play list!")

      //Add current user as author of play list
      const author = await db.collection("Users").findOne({_id: user._id})
      const newPlayList = {...input, author};
      await db.collection("PlayLists").insertOne(newPlayList);
      // console.log(author);
      return({...newPlayList})
    },

    addSongToPlayList: async (root, {songId, playListId}, {db, user}) => {
      if (!user) throw new Error("Please sign in to add song to your play list!")
      playListToUpdate = await db.collection("PlayLists").findOne({_id: ObjectId(playListId)})
      
      //save last song array
      lastSongArr = playListToUpdate.songArr;
      if(typeof(lastSongArr) == 'undefined')
      {
        songToAdd = await db.collection("Songs").findOne({_id: ObjectId(songId)})
        await db.collection("PlayLists").updateOne({_id: ObjectId(playListId)}, {$set: {songArr: [{...songToAdd}]}})
        updatedPlayList = await db.collection("PlayLists").findOne({_id: ObjectId(playListId)})
        return({...updatedPlayList})
      }
      //check if song is already add to play list
      let checkExists = 0
      playListToUpdate.songArr.forEach(item => {
        if(JSON.stringify(item._id) === JSON.stringify(ObjectId(songId))){
          checkExists = 1
          return
        }
      })

      if (checkExists === 1) {
        return({...playListToUpdate})
      } 
      //find song with songId 
      songToAdd = await db.collection("Songs").findOne({_id: ObjectId(songId)})
      newSongArr = [...lastSongArr, {...songToAdd}];
      await db.collection("PlayLists").updateOne({_id: ObjectId(playListId)}, {$set: {songArr: [...newSongArr]}})
      updatedPlayList_2 = await db.collection("PlayLists").findOne({_id: ObjectId(playListId)})
      return({...updatedPlayList_2})
    },
    likeASong: async (root, {songId}, {db, user}) => {
      if(!user) throw new Error("Please sign in to like this song!")
      likedSong = await db.collection("Songs").findOne({_id: ObjectId(songId)})
      //Save last liked song array of user 
      lastLikedSongArr = user.likedSongs;
      //Check if user liked any song yet
      if (typeof(lastLikedSongArr) == 'undefined'){
        console.log("11111111");

        console.log({...user, likedSongs: likedSong});
        await db.collection("Users").updateOne({_id: user._id}, {$set:{likedSongs:[likedSong]}})
        return({...user, likedSongs: [likedSong]})
      }
      //Check if that song was liked by user already
      let checkExists = 0;
      lastLikedSongArr.forEach(song => {
        if(JSON.stringify(likedSong._id) == JSON.stringify(song._id)){
          checkExists = 1;
          return;
        }
      })
      if(checkExists === 1){
        return (user)
      }

      newLikedSongArr = [...lastLikedSongArr, likedSong]
      await db.collection("Users").updateOne({_id: user._id}, {$set:{likedSongs:newLikedSongArr}})
      return({...user, likedSongs: newLikedSongArr})
    }
  },
  //Custom resolver here
  User: {
    id: ({_id, id}) => {
      if(id) return id;
      objId = JSON.stringify(_id);
      objId = objId.slice(1); //Remove quote at the beginning of string
      objId = objId.slice(0, 24);//Remove quote at the end of string
      return (objId);
    }
  },

  Song: {
    id: ({_id, id}) => {
      if(id) return id;
      objId = JSON.stringify(_id);
      objId = objId.slice(1);
      objId = objId.slice(0, 24);
      return (objId);
    }
  },

  PlayList: {
    id: ({_id, id}) => {
      if(id) return id;
      objId = JSON.stringify(_id);
      objId = objId.slice(1); 
      objId = objId.slice(0, 24);
      return (objId);
    }
  }

};

start = async () => {
  try {
    const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    await client.connect();
    const db = client.db(DB_NAME);
    const server = new ApolloServer({ typeDefs, resolvers, 
      context: async ({req}) => {
      const user = await getUserFromToken(req.headers.authorization, db)
      return {
        db,
        user
      }
    }});
    server.listen({ port: process.env.PORT || 5000 }).then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
    // client.close();
}
  catch (err) {
    console.log(err);
  }
}

start();
  
  