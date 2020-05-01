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

    

    if (coronaJson.type == 'NORMAL'){
        coronaCard = createVerticalCard(coronaJson.title,
                          coronaJson.message,
                          coronaJson.assetUrl,
                          coronaJson.goalNo,
                          [[coronaJson.action,coronaJson.actionUrl]]);
    }else{
        coronaCard = createHorizontalCard(coronaJson.title,
            coronaJson.message,
            coronaJson.assetUrl,
            coronaJson.goalNo,
            [[coronaJson.action,coronaJson.actionUrl]]);
    }

    mainContent.appendChild(coronaCard);
  

   
    const wallpaperCard = createWallpaperCard(`<p>${wallpaperJson.credits}</p>
                                                   <p>#GlobalGoal${wallpaperJson.goalNo}</p>
                                                   <a href="goal.html?no=${wallpaperJson.goalNo}" id="link-goal">Learn More</a>`,
                                                   wallpaperJson.assetUrl,
                                                   wallpaperJson.goalNo
                                                );                                    
                        

    mainContent.appendChild(wallpaperCard);

    loadStaticCards(mainContent); 
    

    let linkGoal = document.querySelector('#link-goal');

    linkGoal.onclick = function(){
        window.document.location = './goal.html';
    }

   /* Check Modal for UNDP link
    link.onclick = function(){
        modal.style.display = "block";
    }

    close.onclick = function(){
        modal.style.display= "none";
    }*/

})

