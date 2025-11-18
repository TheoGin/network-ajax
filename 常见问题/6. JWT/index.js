const jwt = require("jsonwebtoken");

// console.log(jwt);

const secretKey = "testEncrption";

let token = jwt.sign(
  {
    username: "Sophotheo",
    nickname: "theo",
  },
  secretKey
);

console.log(token); // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNvcGhvdGhlbyIsIm5pY2tuYW1lIjoidGhlbyIsImlhdCI6MTc2MzQ2NTAxM30.8Ap4xyxGx_KKCrioBv8BLhcUGIDxUiW5HNYPGVQ6slE

token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNvcGhvdGhlbyIsIm5pY2tuYW1lIjoidGhlbyIsImlhdCI6MTc2MzQ2NTAxM30.8Ap4xyxGx_KKCrioBv8BLhcUGIDxUiW5HNYPGVQ6slE";

let result = jwt.verify(token, secretKey);
// 1、校验通过
console.log(result); // { username: 'Sophotheo', nickname: 'theo', iat: 1763465013 }

token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ1.eyJ1c2VybmFtZSI6IlNvcGhvdGhlbyIsIm5pY2tuYW1lIjoidGhlbyIsImlhdCI6MTc2MzQ2NTAxM30.8Ap4xyxGx_KKCrioBv8BLhcUGIDxUiW5HNYPGVQ6slE";
result = jwt.verify(token, secretKey);
// 2、校验失败
console.log(result); // JsonWebTokenError: invalid token
