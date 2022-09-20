var axios = require('axios');
//Mutation signIn: Tra ve collection User va user's token. (Moi lan dang nhap se 
//tao ra 1 token khac va luu vao db). (Khong can truyen vao token cua user vao header)
var data = JSON.stringify({
  query: `mutation dangNhapTaiKhoan ($email: String! $password: String!){
  signIn (input: {
    email: $email,
    password: $password})
  {
    token,
    user{
      id
      name
      email
      avatar
    }
  }
}`,
  variables: {"email":"hello@gmail.com","password":"huy123"}
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
