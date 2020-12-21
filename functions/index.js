const functions = require('firebase-functions');

const express = require('express');
const fetch = require('node-fetch');
const https = require('https');
const app = express();
require('dotenv').config();

const url = process.env.DEV_URL;

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
     
      
      res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
      res.json(wallpapers_data);
     
})

app.get('/posts', async(req,res)=>{
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

  const posts_response = await fetch(url+'/posts/', {
        agent,
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    }) 
 
   const posts_data = await posts_response.json();
   
   res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
   res.json(posts_data);
    
  
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

app.get('/getPaymentIntent/:amount', async(req, res) => {
    const amount = req.params.amount;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'gbp',
        payment_method_types: ['card']
    });

    res.send({clientSecret: paymentIntent.client_secret});
})

app.post('/directDonation/', async(req,res)=>{
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
            "amount": req.body.amount,
            "currency": "gbp",
            "goal": req.body.goalId,
            "paymentMethod": req.body.methodName,
            "source": "test_token"
        }

    const direct_donation_response = await fetch(url+'/directDonation/', {
        agent,
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })

    const donation_data = await direct_donation_response.json();

    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.json(donation_data);

})

exports.app = functions.https.onRequest(app);