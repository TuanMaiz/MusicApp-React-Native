var axios = require('axios');
//Query searchSongByName: Can truyen vao $name chinh xac ten bai hat 
//luu trong db. (Khong can truyen vao token cua user vao header: nguoi dung 
//khong can dang nhap cung co the tim bai hat) 
var data = JSON.stringify({
  query: `query TimBaiHatTheoTen($name: String!) {
  searchSongByName(name: $name) {
    id
    name
    author
    URI
    imageURL
  }
}`,
  variables: {"name":"Cry baby"}
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
