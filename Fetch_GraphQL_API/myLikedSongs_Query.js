var axios = require('axios');
// Can token de xem danh sach bai hat da thich
var data = JSON.stringify({
  query: `query BaiHatDaThichCuaToi{
  myLikedSongs {
    id
    name
    author
    URI
    imageURL
    title
  }
}`,
  variables: {}
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
