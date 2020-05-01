window.addEventListener('load', async () => {
    let link = document.getElementById('undp-link');
    let modal = document.getElementsByClassName('modal')[0];
    let close = document.getElementsByClassName('close')[0];
    let goalDiv = document.getElementsByClassName('goal-img')[0]; 
    let mainContent = document.getElementById('_main_content');

    const wallpaper = await fetch('/wallpaper');
    const wallpaperJson = await wallpaper.json();

    const coronaCards = await fetch('/corona');
    const coronaJson = await coronaCards.json();

  

    const donateCard = createVerticalCard( 'Donate directly to the UNDP',
                               'Donate to the <a href=# id="undp-link">UNDP</a> to help tackle the root causes of poverty and create a better life for everyone.',
                                'images/raster/hands-vert.jpg',
                                0,
                                [['Donate','https://give.undp.org/give/120717/#!/donation/checkout']]);

    mainContent.appendChild(donateCard);
    
    const learnCard = createVerticalCard('Learn about the Global Goals',
                                'World leaders agreed to 17 goals for a better world by 2030. These goals have the power to change the world and the people in it',
                                '/images/raster/goals-vert.jpg',                                
                                0,
                                [['Learn more','goals.html']]
                                );
    
    mainContent.appendChild(learnCard);

    const peopleCard = createHorizontalCard('We the People',
                                            'This star-studded video introduces the new plan for the people and planet: the UN Global Goals for Sustainable Development. Audio is in English.</p>',
                                            '/images/raster/video-horz.jpg',
                                            0,
                                            [['Watch','https://youtu.be/RpqVmvMCmp0']]
                                            );
    
    mainContent.appendChild(peopleCard);

    const workCard   = createHorizontalCard('How this app works',
                                   'When you see ads from this app, you will earn money for donations that support the Global Goals, such as fighting to end poverty, reducing social inequality, and tackling climate change.',
                                    '/images/raster/boy-horz.jpg',
                                    0,
                                   null
                                  );
    
    mainContent.appendChild(workCard);

    const wallpaperCard = createWallpaperCard(`<p>${wallpaperJson.credits}</p>
                                                   <p>#GlobalGoal${wallpaperJson.goalNo}</p>
                                                   <a href="goal.html?no=${wallpaperJson.goalNo}" id="link-goal">Learn More</a>`,
                                                   wallpaperJson.assetUrl,
                                                   wallpaperJson.goalNo
                                                );                                    
                        

    mainContent.appendChild(wallpaperCard);
    

    let linkGoal = document.querySelector('#link-goal');

    linkGoal.onclick = function(){
        window.document.location = './goal.html';
    }

   /* link.onclick = function(){
        modal.style.display = "block";
    }

    close.onclick = function(){
        modal.style.display= "none";
    }*/

})

