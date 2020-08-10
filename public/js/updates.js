

function getPostsCards(posts, type){

  
    let cards = posts.filter(post => post.batch == type && post.screens == 'UPDATES');
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


async function loadWallpapers(){
    try {
        
          
        const wallpapers =  await fetch('/wallpaper');  
        const wallpaperJson = await wallpapers.json();
        let wallpaperCard = '';
        
        /*Retrieve One Random Wallpaper */
        /*Filter only wallpapers with quotes */
        let wallpaperQuotes = wallpaperJson.wallpapers.filter(wallpaper => wallpaper.type == 'QUOTE');
        /*Get One Random*/
       
        if(wallpaperQuotes.length > 0){
            let wallpaper = wallpaperQuotes[Math.floor(Math.random() * wallpaperQuotes.length)];

            wallpaperCard = createWallpaperCard(`<p>${wallpaper.credits}</p>
                                                        <p>#GlobalGoal${wallpaper.goalNo}</p>
                                                        <a href="goal.html?no=${wallpaper.goalNo}" id="link-goal">Learn More</a>`,
                                                        wallpaper.assetUrl,
                                                        wallpaper.goalNo
                                                    );
        }else{
            wallpaperCard = createWallpaperCard(`<p>Julia Gillard</p>
                                                        <p>#GlobalGoal4</p>
                                                        <a href="goal.html?no=4" id="link-goal">Learn More</a>`,
                                                        '/images/raster/wallpaper-quote.webp',
                                                        4 
                                                      )
        }                                            
        
                                           

        let mainContent = document.getElementById('_main_content');                                          

        mainContent.appendChild(wallpaperCard);                                          
              
     
    }catch(error){
        console.log(error);
    }
}

async function loadPostCards(){    
   
    
    try {
        
   
        const posts = await fetch('/posts');
        const postJson = await posts.json();
        

        const newsCard = getPostsCards(postJson.posts, 'undp_article');
        const videoCard = getPostsCards(postJson.posts, 'undp_video');
        const ecommerceCard = getPostsCards(postJson.posts, 'undp_ecommerce');
        const podcastCard = getPostsCards(postJson.posts, 'undp_goalcast');
        const coronaCard = getPostsCards(postJson.posts, 'covid');
        
        let mainContent = document.getElementById('_main_content');  

        mainContent.appendChild(coronaCard);   
        mainContent.appendChild(newsCard);
        mainContent.appendChild(videoCard);
        mainContent.appendChild(ecommerceCard);
        mainContent.appendChild(podcastCard);       
                                                
                                                  
    }catch(error){
        console.log(error);
    }   
                                                                  
                        
 
}



window.addEventListener('load', () => {
    let mainContent = document.getElementById('_main_content');
    loadStaticCards(mainContent);   
    let buttonShowMore = document.getElementById('_btn_showmore');
    buttonShowMore.classList.remove('hidden')
})

loadWallpapers();
loadPostCards();
