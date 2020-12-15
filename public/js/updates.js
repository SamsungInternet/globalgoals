function loadRandomGoal(){
    const goals = goalsJson.goals;
    let goal = goals[Math.floor(Math.random() * goals.length)];
    return goal;
}

function loadGoalCard(goal){
    const goalCard = createHorizontalCard( `${goal.goalNo}: ${goal.title}`,
                                             goal.description,
                                             `images/gg_icons/gg_${goal.goalNo}_icon.svg`,
                                             goal.goalNo,
                                             [['Learn More', goal.url]]);
    return goalCard;
}

function loadFactsGoalCard(goal){
    let content = `    <h1>Facts and Figures</h1>     
                        <div>                       
                            <ul>    `;

    for(let i=0; i < goal.facts.length; i++){
    content+= `<li class="oui-bubble-item">${goal.facts[i]}</li>`
    }

    content+=`</ul> `

    let factCard = createBlankCard(content, goal.goalNo, true);
    return factCard; 

}

function getSurvey(posts){
    let card = posts.find(post => post.id == 'article_51_0_en-ca');
       
    postCard = createVerticalCard(card.title,
        card.message,
        card.assetUrl,
        card.goalNo,
        [[card.action,card.actionUrl]],
        card.showGoalTags, 
        card.goalTags);
    return postCard;
}


function getPostsCards(posts, type){
  
    let cards = posts.filter(post => post.batch == type && post.screens == 'UPDATES');
        /*Get One Random*/
    let card = cards[Math.floor(Math.random() * cards.length)];

    
    if (card.type == 'NORMAL'){
        postCard = createVerticalCard(card.title,
                        card.message,
                        card.assetUrl,
                        card.goalNo,
                        [[card.action,card.actionUrl]],
                        card.showGoalTags, 
                        card.goalTags);
    }else{
        postCard = createHorizontalCard(card.title,
            card.message,
            card.assetUrl,
            card.goalNo,
            [[card.action,card.actionUrl]],
            card.showGoalTags, 
            card.goalTags);
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
                                                        '/images/raster/wallpaper-quote.jpg',
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
        
        const surveyCard = getSurvey(postJson.posts);
        const newsCard = getPostsCards(postJson.posts, 'undp_article');
        const videoCard = getPostsCards(postJson.posts, 'undp_video');
        const ecommerceCard = getPostsCards(postJson.posts, 'undp_ecommerce');
        const podcastCard = getPostsCards(postJson.posts, 'undp_goalcast');
        const coronaCard = getPostsCards(postJson.posts, 'covid');
        
        let mainContent = document.getElementById('_main_content');  

       
        mainContent.appendChild(videoCard);
        mainContent.appendChild(surveyCard);
        mainContent.appendChild(coronaCard);          
        mainContent.appendChild(newsCard);
        mainContent.appendChild(ecommerceCard);
        mainContent.appendChild(podcastCard);       
                                                
                                                  
    }catch(error){
        console.log(error);
    }   
                                                                  
                        
 
}

window.addEventListener('load', () => {
    let mainContent = document.getElementById('_main_content');
    let goal = loadRandomGoal();
    let goalCard = loadGoalCard(goal);
    mainContent.appendChild(goalCard);
    loadStaticCards(mainContent);   
    let factCard = loadFactsGoalCard(goal);
    mainContent.appendChild(factCard);
   
    let buttonShowMore = document.getElementById('_btn_showmore');
    buttonShowMore.classList.remove('hidden')
})

let cls = 0;

new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (!entry.hadRecentInput) {
      cls += entry.value;
      console.log('Current CLS value:', cls, entry);
    }
  }
}).observe({type: 'layout-shift', buffered: true});

loadWallpapers();
loadPostCards();

