var request = require('request')
function HTTP (params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://api.waditu.com',
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
      },
      body: {
        api_name: params.interface,
        token: "c2284318d101be62a7d4c8d7a69cc67f14af57b58c1c3423f04c28cb",
        params: params.data
      }
    }, function(error, response, body) {
      resolve(body.data)
    })
  })
}

module.exports = HTTP