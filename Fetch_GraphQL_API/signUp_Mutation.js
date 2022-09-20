var axios = require('axios');
//Mutation singUp: Tra ve collection User va token cua user. 
//(Khong can truyen vao token cua user vao header)
var data = JSON.stringify({
  query: `mutation dangKyTaiKhoanMusicApp($email: String! $name: String! $password: String!){
  signUp(input: {
    email: $email
    name: $name
    password: $password
  }){
    token
    user {
      id
      name
    }
  }
}`,
  variables: {"email":"youremail@gmail.com","name":"Thanh An","password":"uyi123"}
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
