import express from 'express'
const app = express()
const port = 3000
import Httyp from 'httyp'
import { StringUtil } from '@aelesia/commons'

// const BASE_URL = 'https://secureforums.hardwarezone.com.sg'
// const BASE_URL = 'https://forums.hardwarezone.com.sg'
// const BASE_URL = 'https://www.facebook.com'
const BASE_URL = 'https://reddit.com'

app.get('/*', async (req, res) => {
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
  if (data) {
    // replaced = StringUtil.replace_all(replaced, BASE_URL, 'http://localhost:3000')
    // replaced = StringUtil.replace_all(replaced, 'https://www.reddit.com', 'http://localhost:3000')
    // replaced = StringUtil.replace_all(replaced, 'https://redditstatic.com', 'http://localhost:4000')
    replaced = replaced.split('https://www.redditstatic.com').join('http://192.168.0.27:4000')
    replaced = replaced.split('http://192.168.0.27:4000/desktop2x/fonts').join('https://www.redditstatic.com/desktop2x/fonts')
    replaced = replaced.split('https://reddit.com').join('http://192.168.0.27:3000')
    replaced = replaced.split('https://www.reddit.com').join('http://192.168.0.27:3000')
    replaced = replaced.split('https://www.gateway.reddit.com').join('http://192.168.0.27:5000')
    replaced = replaced.split('https://gateway.reddit.com').join('http://192.168.0.27:5000')
  }
  res.send(replaced)
})


app.post('/*', async (req, res) => {
  res.sendStatus(204)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
