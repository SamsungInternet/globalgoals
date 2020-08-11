
function searchGoal(goalNo){
    const goalsArray = goalsJson.goals;
    return goalsArray.find(element => element.goalNo == goalNo);
}

function getPostsCards( goal, posts, type){
  
    let cards = posts.filter(post => post.batch == type && post.goalNo == goal && post.screens == 'GOAL_DETAILS');
        /*Get One Random*/
    let card = cards[Math.floor(Math.random() * cards.length)];    
    console.log(card);
    
    if (card.type == 'NORMAL'){
        postCard = createVerticalCard(card.title,
                        card.message,
                        card.assetUrl,
                        0,
                        [[card.action,card.actionUrl]],
                        card.showGoalTags, 
                        card.goalTags);
    }else{
        postCard = createHorizontalCard(card.title,
            card.message,
            card.assetUrl,
            0,
            [[card.action,card.actionUrl]],
            card.showGoalTags, 
            card.goalTags);
    } 

    return postCard;
        
}


async function loadPostCards(goal){    
   
    
    try {
        
        let mainContent = document.getElementById('_main_content');
        const posts = await fetch('/posts');
        const postJson = await posts.json();
        if(goal==3){
            const coronaCard = getPostsCards(3, postJson.posts, 'covid');
            mainContent.appendChild(coronaCard); 
        }
        
       /* const surveyCard = getSurvey(postJson.posts);
        const newsCard = getPostsCards(postJson.posts, 'undp_article');
        const videoCard = getPostsCards(postJson.posts, 'undp_video');
        const ecommerceCard = getPostsCards(postJson.posts, 'undp_ecommerce');
        const podcastCard = getPostsCards(postJson.posts, 'undp_goalcast');
        const coronaCard = getPostsCards(postJson.posts, 'covid');
        
         

       
        mainContent.appendChild(videoCard);
        mainContent.appendChild(surveyCard);
        mainContent.appendChild(coronaCard);          
        mainContent.appendChild(newsCard);
        mainContent.appendChild(ecommerceCard);
        mainContent.appendChild(podcastCard);      */ 
                                                
                                                  
    }catch(error){
        console.log(error);
    }   
                                                                  
                        
 
}


function loadStaticGoalsCards(cRootContent){
    const learnCard = createVerticalCard('Learn about the Global Goals',
    'World leaders agreed to 17 goals for a better world by 2030. These goals have the power to change the world and the people in it',
    '/images/raster/goals-vert.jpg',                                
    0,
    [['Learn more','goals.html']]
    );


    cRootContent.appendChild(learnCard);

    const developedCard = createVerticalCard('Developed by United Nations',
    'The 17 Global Goals, also called the Sustainable Development Goals (SDGs), were built on decades of work by the UN and adopted by all host countries.',
    '/images/raster/goals-vert.jpg',                                
    0,
    [['Learn more','www.undp.org']]
    );

    cRootContent.appendChild(developedCard);

}

function loadGoalCard(goal){

    const goalCard = createHorizontalCard( `${goal.goalNo}: ${goal.title}`,
                                             goal.description,
                                             `images/gg_icons/gg_${goal.goalNo}_icon.svg`,
                                             goal.goalNo,
                                             [['Learn More', goal.url]]);
    return goalCard;
}

function loadProblemCard(goal){
    let problemCard = createBlankCard(`<h3>Problems and Solutions</h3>
                                            <p>${goal.facts[0]}
                                            To help solve our world's problems, Samsung will donate all earnings from the ads below.</p>
                                        `,0)
    return problemCard;            
}

function loadFactsCard(goal){
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

window.addEventListener('load', () => {
    let goalNo = document.location.search.replace(/^.*?\=/,'');
    let spnGoal = document.querySelector('#no');
    spnGoal.innerHTML = goalNo;
    let currentGoal = searchGoal(goalNo);
    const mainContent = document.getElementById('_main_content');
    
    
    let goalCard = loadGoalCard(currentGoal);
    mainContent.appendChild(goalCard);

    let problemCard = loadProblemCard(currentGoal);
    mainContent.appendChild(problemCard);
    
    let factCard = loadFactsCard(currentGoal);
    mainContent.appendChild(factCard);
    loadStaticGoalsCards(mainContent);
    loadPostCards(goalNo);
})

