var axios = require('axios');
var data = JSON.stringify({
  query: `query TimBaiHatTheoChuDe($title: String!) {
  searchSongByTitle(title: $title) {
    id
    title
    name
    author
    URI
    imageURL
  }
}`,
  variables: {"title":"Made for you"}
});

var config = {
  method: 'post',
  url: 'https://apollo-api-for-musicapp.herokuapp.com/',
  headers: { 
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
