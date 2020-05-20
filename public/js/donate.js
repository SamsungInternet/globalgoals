window.addEventListener('load', () => {
    //adds the default donate card
    let mc = document.getElementById('_main_content');
    let defaultDonateCard = createVerticalCard('Donate directly to the UNDP', 'Donate to the UNDP to help tackle the root causes of poverty and create a better life for everyone.', '/images/raster/donate_vert.jpg', 0, [['Donate', '#']]); 
    mc.appendChild(defaultDonateCard);
});