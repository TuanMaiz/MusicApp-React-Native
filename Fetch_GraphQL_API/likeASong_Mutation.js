var axios = require('axios');
// Can token de dinh danh nguoi dung truoc khi thich bai hat
var data = JSON.stringify({
  query: `mutation ThichBaiHat($songId: String!){
  likeASong(songId: $songId){
    id
    name
    email
    likedSongs {
      id
      name
      author
      URI
      imageURL
      title
    }
    avatar
  }
}`,
  variables: {"songId":"629c0da3d34d170b61d5e1ae"}
});

var config = {
  method: 'post',
  url: 'https://apollo-api-for-musicapp.herokuapp.com/',
  headers: { 
    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWI5ZmQ2ZTY3ZjExYTQxMTA4NDUwZSIsImlhdCI6MTY1NDQ0ODM4MywiZXhwIjoxNjU1NjU3OTgzfQ.QIs2Ua-Ff4hwYr3q1iMBN9bcp3iLnTepPWnycwLftQc', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
