async function loadDynamicCards(){

    let mainContent = document.getElementById('_main_content');
    
    
        const wallpaper =  await fetch('/wallpaper'); 
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
  

   
        const wallpaperCard = createWallpaperCard(`<p>${wallpaperJson.credits}</p>
                                                    <p>#GlobalGoal${wallpaperJson.goalNo}</p>
                                                    <a href="goal.html?no=${wallpaperJson.goalNo}" id="link-goal">Learn More</a>`,
                                                    wallpaperJson.assetUrl,
                                                    wallpaperJson.goalNo
                                                  );
                                                  mainContent.appendChild(coronaCard);                                            
                                                  mainContent.appendChild(wallpaperCard);
         let linkGoal = document.querySelector('#link-goal');

         linkGoal.onclick = function(){
                window.document.location = './goal.html';
         }                                             
                                                  
    
                                                                                                         
                        
 
}



window.addEventListener('load', () => {
    let mainContent = document.getElementById('_main_content');
    loadStaticCards(mainContent);   
})

loadDynamicCards();