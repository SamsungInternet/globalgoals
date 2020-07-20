function getNewsCards(posts){

  
    let articles = posts.filter(post => post.batch == 'undp_article');
        /*Get One Random*/
    let article = articles[Math.floor(Math.random() * articles.length)];

    
    if (article.type == 'NORMAL'){
        articleCard = createVerticalCard(article.title,
                        article.message,
                        article.assetUrl,
                        article.goalNo,
                        [[article.action,article.actionUrl]]);
    }else{
        articleCard = createHorizontalCard(article.title,
            article.message,
            article.assetUrl,
            article.goalNo,
            [[article.action,article.actionUrl]]);
    } 

    return articleCard;
        
}

function getVideoCards(posts){
    let videos = posts.filter(post => post.batch == 'undp_video');
    /*Get One Random*/
    let video = videos[Math.floor(Math.random() * videos.length)];


    if (video.type == 'NORMAL'){
        videoCard = createVerticalCard(video.title,
                        video.message,
                        video.assetUrl,
                        video.goalNo,
                        [[video.action,video.actionUrl]]);
    }else{
        videoCard = createHorizontalCard(video.title,
            video.message,
            video.assetUrl,
            video.goalNo,
            [[video.action,video.actionUrl]]);
    } 

    return videoCard;

}

function getEcommerceCards(posts){
    let cards = posts.filter(post => post.batch == 'undp_ecommerce');
    /*Get One Random*/
    let card = cards[Math.floor(Math.random() * cards.length)];


    if (card.type == 'NORMAL'){
        ecommerceCard = createVerticalCard(card.title,
                        card.message,
                        card.assetUrl,
                        card.goalNo,
                        [[card.action,card.actionUrl]]);
    }else{
        ecommerceCard = createHorizontalCard(card.title,
            card.message,
            card.assetUrl,
            card.goalNo,
            [[card.action,card.actionUrl]]);
    } 

    return ecommerceCard;


}

function getPodcastCards(postsJson){

}


async function loadDynamicCards(postsData){

    
    
    try {
        
        const wallpaper =  await fetch('/wallpaper');  
        const wallpaperJson = await wallpaper.json();

        const coronaCards = await fetch('/corona');          
        const coronaJson = await coronaCards.json();

        const posts = await fetch('/posts');
        const postJson = await posts.json();

        const newsCard = getNewsCards(postJson.posts);
        const videoCard = getVideoCards(postJson.posts);
        const ecommerceCard = getEcommerceCards(postJson.posts);
        


        

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