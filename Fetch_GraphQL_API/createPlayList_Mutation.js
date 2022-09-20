var axios = require('axios');
//Mutation createPlayList: can truyen header de xac thuc nguoi dung va them
// play list cho nguoi dung do. (Can dang nhap de tao play list)
var data = JSON.stringify({
  query: `mutation ThemPlayList ($name: String!, $description: String, $imageURL: String){
  createPlayList(input: {
    name: $name,
    description: $description,
    imageURL: $imageURL
  }) {
    name,
    id,
    author {
      id, 
      name,
      email
    }
  }
}`,
  variables: {"name":"OST play list","description":null,"imageURL":"imageurl.jpg"}
});

var config = {
  method: 'post',
  url: 'https://apollo-api-for-musicapp.herokuapp.com/',
  // Them Authorization cho header. Token cua nguoi dung xem trong db
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
