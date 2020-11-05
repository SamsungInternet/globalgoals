// import {loadStripe} from '@stripe/stripe-js';
// const stripe = loadStripe('pk_test_qw1GN1EHv140IRz7N9Q6QcyX', {apiVersion: "2020-08-27"});

const stripe = Stripe('pk_test_qw1GN1EHv140IRz7N9Q6QcyX');
//creates the donation history UI chart 
let createDonationChart = (data) => {
    let total = 0;
    data.forEach(number => {total += number});
    let chart = document.createElement('div');
    chart.setAttribute('id', 'donation-chart');
    chart.setAttribute('class', 'donation-chart oui-bubble oui-bubble-donation-chart');
    let header = document.createElement('header');
    header.setAttribute('class', 'donation-chart-header');
    header.innerHTML = "<h3>Everyone's donation history</h3>";
    chart.appendChild(header);
    for(let ggnum = 0; ggnum < data.length; ggnum++) {
        let line = `<div class="donation-chart-line">
        <img src="images/gg-tile/en/gg-${ggnum+1}.svg" class="donation-chart-icon gg-g${ggnum+1}">
        <span class="donation-chart-bar gg-g${ggnum+1}" style="width:${(data[ggnum]/total*100)}%"></span>
        <p class="donation-chart-text">${(data[ggnum]/total*100).toFixed(1)}%</p>
    </div>`;
    chart.innerHTML += line;
    }
    return chart;
};

async function loadDonationsCard(){
    try{
        const donations = await fetch('/globalDonations');
        const donationsJson = await donations.json();
        let donationChart = createDonationChart(donationsJson.donations);
        document.getElementById('_main_content').appendChild(donationChart);
    }catch(error){
        console.log(error);
    }
}

async function loadDirectDonation(amount, goalId){
    try{
        const directDonation = await fetch(`/directDonation/${amount}/${goalId}`);
        // const directDonationsJson = await directDonation.json();
        // console.log(directDonationsJson);

    }catch(error){
        console.log(error);
    }
}

async function manageStripe(amount){
    const paymentRequest = stripe.paymentRequest({
        country: 'GB',
        currency: 'gbp',
        total: {
            label: 'Demo total',
            amount: amount * 100,
        },
        requestPayerName: true,
        requestPayerEmail: true,
    });

    await paymentRequest.canMakePayment()
    paymentRequest.show();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
const donateLink = document.createElement('a')
donateLink.text = "DONATE NOW"
donateLink.addEventListener('click', () => {
    manageStripe(1)
})

window.addEventListener('load', () => {
    //adds the default donate card
    let mc = document.getElementById('_main_content');
    const stripe = Stripe('pk_test_qw1GN1EHv140IRz7N9Q6QcyX', {
        apiVersion: "2020-08-27",
    });
    let defaultDonateCard = createVerticalCard('Donate directly to the UNDP', 'Donate to the UNDP to help tackle the root causes of poverty and create a better life for everyone.', '/images/raster/donate_vert.webp', 0, [['Donate', 'https://give.undp.org/give/120717/#!/donation/checkout']]);
    const amount = getRandomInt(5, 20);
    const goalId = 12; // should be dynamic
    let specificDonateCard = createVerticalCard(
        `Donate £${amount}`,
        `Donate £${amount} to directly support a specific Global Goal through a quick in-app purchase.` +
        'Your generosity is appreciated.',
        '/images/raster/donate_vert.webp',
        0, // What is this?
        [['Donate', '']]
    );

    // mc.appendChild(defaultDonateCard);
    mc.appendChild(donateLink);
});

loadDirectDonation(20, 12)
loadDonationsCard();