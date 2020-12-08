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

async function manageStripe(amount, goalId){
    const paymentRequest = stripe.paymentRequest({
        country: 'GB',
        currency: 'gbp',
        total: {
            label: 'Donation',
            amount: amount * 100,
        },
        requestPayerName: true,
        requestPayerEmail: true
    });

    await paymentRequest.canMakePayment().then(() => {
        paymentRequest.show();
    })

    const clientSecret = await fetch(`/getPaymentIntent/${amount}`);
    const cs = await clientSecret.json();
    paymentRequest.on('paymentmethod', async (ev) => {
        const {error: confirmError} = await stripe.confirmCardPayment(
            cs.clientSecret,
            {payment_method: ev.paymentMethod.id},
            {handleActions: false}
        );

        if (confirmError) {
            console.log(confirmError)
            ev.complete('fail');
        } else {
            try{
                ev.complete('success');
                const body = {
                    amount: `${amount}`,
                    goalId: `${goalId}`,
                    methodName: `${ev.methodName}`
                }
                await fetch('directDonation/',{
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(body)
                    }
                )
            }catch(error){
                console.log(error);
            }    
        }
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

window.addEventListener('load', () => {
    //adds the default donate card
    let mc = document.getElementById('_main_content');
    const stripe = Stripe('pk_test_qw1GN1EHv140IRz7N9Q6QcyX', {
        apiVersion: "2020-08-27",
    });
    let defaultDonateCard = createVerticalCard('Donate directly to the UNDP', 'Donate to the UNDP to help tackle the root causes of poverty and create a better life for everyone.', '/images/raster/donate_vert.webp', 0, [['Donate', 'https://give.undp.org/give/120717/#!/donation/checkout']]);
    const amount = getRandomInt(5, 20);
    const goalId = getRandomInt(1, 19)
    let specificDonateCard = createVerticalCard(
        `Donate £${amount}`,
        `Donate £${amount} to directly support a specific Global Goal through a quick in-app purchase.` +
        'Your generosity is appreciated.',
        '/images/raster/donate_vert.webp',
        0, // What is this?
        [['Donate', '#']] // Add donate link here
    );

    mc.appendChild(specificDonateCard);
    const donate = document.getElementById('donate');
    donate.addEventListener('click', () => {
        manageStripe(amount)
    }); 

});

loadDonationsCard();