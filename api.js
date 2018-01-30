let http = require('http')
let request = require('request')

http.createServer((req,res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  request('https://www.shanbay.com/api/v2/news/articles/?ipp=10&page=1', (err, resp, body) => {
    if (!err && resp.statusCode == 200) {
      res.end(body, 'utf-8')
    }
  })
}).listen(3388)