const express = require('express');
const fetch = require('node-fetch');
const https = require('https');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});

app.use(express.static('public'));

app.get('/wallpapers', async (req,res)=>{
    const agent = new https.Agent({
        rejectUnauthorized: false
      });

    const body = {
        "key": process.env.API_KEY,
        "uid": process.env.UID,
        "language": ["en-UK"],
        "deviceModel": "Samsung",
        "salesCode": "",
        "clientVersion": "1",
        "country":"UK"
      };


    const wallpapers_response = await fetch('https://dev.samsungglobalgoals.com/api/v3/wallpapers/', {
        agent,
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },

    }) 
 
   const wallpapers_data = await wallpapers_response.json();
  
   res.json(wallpapers_data)
})

