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

app.get('/corona', async(req,res)=>{
  const agent = new https.Agent({
    rejectUnauthorized: false
  });

  const body = 
    {
      "key": process.env.API_KEY,
      "uid": process.env.UID,
      "country": "UK",
      "language": ["en-EN"],
      "deviceModel" : "Samsung",
      "clientVersion" : "1.0",
      "salesCode" : ""
  }

  const post_response = await fetch('https://dev.samsungglobalgoals.com/api/v3/posts/', {
        agent,
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },

    }) 
 
   const post_data = await post_response.json();

   
   /*Filter corona cards */
   let coronaCards = post_data.posts.filter(card=>card.batch == 'covid' && card.screens == 'UPDATES');
  
   let coronaCard  = coronaCards[Math.floor(Math.random() * coronaCards.length)];

   res.json(coronaCard);
    
  
})

