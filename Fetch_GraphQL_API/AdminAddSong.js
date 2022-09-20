var axios = require('axios');
//Chi admin moi co the su dung(admin token)
var data = JSON.stringify({
  query: `mutation ThemBaiHat($name: String!, $author: String!, $imageURL: String
, $URI: String!, $title: String!) {
  addSong(input: {
    name: $name
    author: $author
    imageURL: $imageURL
    URI: $URI
    title: $title
  }) {
    name,
    author,
    id,
    imageURL, 
    URI
    title
  }
}`,
  variables: {"name":"Test song for admin","author":"No one","imageURL":"Hinhanh","URI":"Fileamthanh","title":"For testing"}
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
