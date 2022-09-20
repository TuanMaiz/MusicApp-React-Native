var axios = require('axios');
// Mutation addSongToPlayList: can truyen id cua bai hat can them va id cua
// play list can update. Can truyen token vao header. Neu bai hat da duoc them
// vao play list, ket qua se tra ve play list tuong ung voi id cua play list
// da nhap vao va khong thay doi play list
var data = JSON.stringify({
  query: `mutation ThemBaiVaoPlayList($songId: String!, $playListId: String!){
  addSongToPlayList(songId: $songId, playListId: $playListId){
    id
    author {
      id
      name
      email
    }
    name
    songArr {
      id
      name
      author
      URI
      imageURL
    }
  }
}`,
  variables: {"playListId":"629b9f74e67f11a41108450d","songId":"629c0da3d34d170b61d5e1ae"}
});

var config = {
  method: 'post',
  url: 'https://apollo-api-for-musicapp.herokuapp.com/',
  headers: { 
    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWI2MTkzMGNkZmJjZmM3NzUyZjAyYyIsImlhdCI6MTY1NDM1MDIyNywiZXhwIjoxNjU1NTU5ODI3fQ.DsZCWQTNaDY2r_is8lEkMgrQKnIm1TRMyV7yJ6Bg_W8', 
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
