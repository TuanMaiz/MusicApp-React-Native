var axios = require('axios');
//Chi admin moi co the su dung(admin token)
var data = JSON.stringify({
  query: `mutation XoaBaiHat ($songId: String!){
  deleteSong(songId: $songId) {
    id
    name
    author
    URI
    imageURL
    title
  }
}`,
  variables: {"songId":"62a615ffdf4a87de1c93cf82"}
});

var config = {
  method: 'post',
  url: 'https://apollo-api-for-musicapp.herokuapp.com/',
  headers: { 
    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTViNDIwYzM1YmM1ZjVhMTEwOWVkYiIsImlhdCI6MTY1NTAyNjcyMCwiZXhwIjoxNjU2MjM2MzIwfQ.eZdzzBDeumUo6kyEV91T5NThCJOKAWeCwhy_Qt8jjKo', 
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
