var axios = require('axios');
//Query myPlayLists: can truyen token vaoheader 
//de xac thuc nguoi dung va tim
// play list da duoc tao boi nguoi dung do. (Can dang nhap de tim play list)
//neu nguoi dung chua co play list data se null
var data = JSON.stringify({
  query: `query PlayListCuaToi{
  myPlayLists {
    name
    id
    imageURL
    description,
    author {
      name
      email
      avatar
    }
  ,
    
  }
}`,
  variables: {}
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

// getData = async () =>{
//       try{
//           const response = await axios(config)
//           const playListArr = response.data.data.myPlayLists
//           playListArr.forEach(playList => {
//               playList.data = playList.songArr
//               delete playList.songArr 
//               console.log(playList.data);
//           })
//           // console.log(playListArr);
  
//       }
//       catch(error){
//           console.log(error);
//       }
//   }
  
//   getData();