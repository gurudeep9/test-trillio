// doc: https://copyprogramming.com/howto/check-if-token-expired-using-this-jwt-library
function isTokenExpired (token) {
  const payloadBase64 = token.split('.')[1]
  const decodedJson = Buffer.from(payloadBase64, 'base64').toString()
  const decoded = JSON.parse(decodedJson)
  const exp = decoded.exp
  const expired = Date.now() >= exp * 1000
  return expired
}
// token expired
// const status = isTokenExpired(
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmVzdXMgSnV2aW5hbyIsImVtYWlsIjoianV2aTY5ZWxwYXB1QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiSmVzdXMgSnV2aW5hbyIsInJlc3RhdXJhbnQiOnsiaWRTdG9yZSI6ImQ5OWY0ZTc1LTRiOWQtNjJmMi1iNDA3LWJjZjZhNjQzMWZmOCIsImlkIjoiNGRmZjM5MDUtMDYxZS05ZGVlLWEwZWYtMTcyMjQwZTYxZDJkIn0sImlkIjoiNGRmZjM5MDUtMDYxZS05ZGVlLWEwZWYtMTcyMjQwZTYxZDJkIiwiaWF0IjoxNzA2MzQyNDUzLCJleHAiOjE3MDY2NzU3NTN9.oCaX_xB2rP1x1fR0ILA37nCapkSu4vWN5jmT3NNDahM"
// );
const status = isTokenExpired(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmVzdXMgSnV2aW5hbyIsImVtYWlsIjoianV2aTY5ZWxwYXB1QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiSmVzdXMgSnV2aW5hbyIsInJlc3RhdXJhbnQiOnsiaWRTdG9yZSI6ImQ5OWY0ZTc1LTRiOWQtNjJmMi1iNDA3LWJjZjZhNjQzMWZmOCIsImlkIjoiNGRmZjM5MDUtMDYxZS05ZGVlLWEwZWYtMTcyMjQwZTYxZDJkIn0sImlkIjoiNGRmZjM5MDUtMDYxZS05ZGVlLWEwZWYtMTcyMjQwZTYxZDJkIiwiaWF0IjoxNzA2MzQyNDUzLCJleHAiOjE3MDY2NzU3NTN9.oCaX_xB2rP1x1fR0ILA37nCapkSu4vWN5jmT3NNDahM'
)

console.log(status)
