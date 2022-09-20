var axios = require('axios');
var data = JSON.stringify({
  query: `mutation CapNhatBaiHat($songId: String!, $name: String, $author: String, $ URI: String, $imageURL: String, $title: String){
  updateSong(input:{
    songId: $songId,
    name: $name, 
    author: $author,
    URI: $URI, 
    imageURL: $imageURL,
    title: $title
  }){
    id
    name
    author
    URI
    imageURL
    title
  }
}`,
  variables: {"songId":"62a615ffdf4a87de1c93cf82","name":"Song to update","author":"update author's name","URI":"update URI","imageURL":"Update imageURL","title":"Replace title with this title"}
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
