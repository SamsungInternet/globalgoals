function getPostsCards(posts, type){

  
    let cards = posts.filter(post => post.batch == type);
        /*Get One Random*/
    let card = cards[Math.floor(Math.random() * cards.length)];

    
    if (card.type == 'NORMAL'){
        postCard = createVerticalCard(card.title,
                        card.message,
                        card.assetUrl,
                        card.goalNo,
                        [[card.action,card.actionUrl]]);
    }else{
        postCard = createHorizontalCard(card.title,
            card.message,
            card.assetUrl,
            card.goalNo,
            [[card.action,card.actionUrl]]);
    } 

    return postCard;
        
}

async function loadDynamicCards(postsData){

    
    
    try {
        
        const wallpaper =  await fetch('/wallpaper');  
        const wallpaperJson = await wallpaper.json();

        const coronaCards = await fetch('/corona');          
        const coronaJson = await coronaCards.json();

        const posts = await fetch('/posts');
        const postJson = await posts.json();

        const newsCard = getPostsCards(postJson.posts, 'undp_article');
        const videoCard = getPostsCards(postJson.posts, 'undp_video');
        const ecommerceCard = getPostsCards(postJson.posts, 'undp_ecommerce');
        const podcastCard = getPostsCards(postJson.posts, 'undp_goalcast');
        


        

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
        let mainContent = document.getElementById('_main_content');

        mainContent.appendChild(coronaCard);                                            
        mainContent.appendChild(wallpaperCard);
        mainContent.appendChild(newsCard);
        mainContent.appendChild(videoCard);
        mainContent.appendChild(ecommerceCard);
        mainContent.appendChild(podcastCard);
        
        let linkGoal = document.querySelector('#link-goal');

         linkGoal.onclick = function(){
                window.document.location = './goal.html';
         }                                             
                                                  
    }catch(error){
        console.log(error);
    }   
                                                                  
                        
 
}



window.addEventListener('load', () => {
    let mainContent = document.getElementById('_main_content');
    loadStaticCards(mainContent);   
})

loadDynamicCards();