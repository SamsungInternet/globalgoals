const express = require('express');
const fetch = require('node-fetch');
const https = require('https');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 8080;
const url = process.env.DEV_URL;

app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});

app.use(express.static('public'));


app.get('/wallpaper', async (req,res)=>{
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



    
        const wallpapers_response = await fetch(url+'/wallpapers/', {
            agent,
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },

        })
        
        const wallpapers_data = await wallpapers_response.json();
        /*Retrieve One Random Wallpaper */
        /*Filter only wallpapers with quotes */
        let wallpaperQuotes = wallpapers_data.wallpapers.filter(wallpaper => wallpaper.type == 'QUOTE');
        /*Get One Random*/
        let wallpaper = wallpaperQuotes[Math.floor(Math.random() * wallpaperQuotes.length)];
        
      //  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
        res.json(wallpaper)    
   
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

  const post_response = await fetch(url+'/posts/', {
        agent,
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },

    }) 
 
   const post_data = await post_response.json();

   
   /*Filter corona cards */
   let coronaCards = post_data.posts.filter(card=>card.batch == 'covid' && card.screens == 'UPDATES');
  
   let coronaCard  = coronaCards[Math.floor(Math.random() * coronaCards.length)];

   res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
   res.json(coronaCard);
    
  
})

app.get('/globalDonations', async(req,res)=>{
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

  const donations_response = await fetch(url+'/getGlobalDonations/', {
        agent,
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    }) 
 
   const donations_data = await donations_response.json();

   res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
   res.json(donations_data);
    
  
})