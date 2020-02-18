import express from 'express'
const app = express()
const port = 5000
import Httyp from 'httyp'

// const BASE_URL = 'https://secureforums.hardwarezone.com.sg'
// const BASE_URL = 'https://forums.hardwarezone.com.sg'
// const BASE_URL = 'https://www.facebook.com'
const BASE_URL = 'https://gateway.reddit.com'

app.get('/*', async (req, res) => {
  console.log(req.url)
  let resp = await Httyp.url(BASE_URL)
    .path(req.url)
    .get()
  let type = resp.headers['content-type']
  if (type) {
    res.type(resp.headers['content-type'])
  }
  res.header('Access-Control-Allow-Origin', '*')
  let data = resp.data as string
  let replaced = data
  if (typeof data === 'object') {
    replaced = JSON.stringify(data)
    replaced = replaced.split('https://www.redditstatic.com').join('http://192.168.0.27:4000')
    replaced = replaced.split('https://redditstatic.com').join('http://192.168.0.27:4000')
    replaced = replaced.split('https://reddit.com').join('http://192.168.0.27:3000')
    replaced = replaced.split('https://www.reddit.com').join('http://192.168.0.27:3000')
    replaced = replaced.split('https://gateway.reddit.com').join('http://192.168.0.27:5000')
  }
  else if (data) {
    replaced = replaced.split('https://www.redditstatic.com').join('http://192.168.0.27:4000')
    replaced = replaced.split('https://redditstatic.com').join('http://192.168.0.27:4000')
    replaced = replaced.split('https://reddit.com').join('http://192.168.0.27:3000')
    replaced = replaced.split('https://www.reddit.com').join('http://192.168.0.27:3000')
    replaced = replaced.split('https://gateway.reddit.com').join('http://192.168.0.27:5000')
  }
  res.send(replaced)
})

app.options('/*', async (req, res) => {
  res.header('access-control-allow-headers', 'Authorization, Content-Type, Reddit-User_Id, X-Reddit-Loid, X-Reddit-Session, X-Reddaid')
  res.header('Access-Control-Allow-Origin', '*')
  res.sendStatus(200)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))