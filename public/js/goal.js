
function searchGoal(goalNo){
    const goalsArray = goalsJson.goals;
    return goalsArray.find(element => element.goalNo == goalNo);
}

function loadGoalCard(goal){
    let card = ` <div class="oui-bubble gg-bubble-horz goal-desc">
                    <div class="bubble-cont-horz">
                        <h3>Goal ${goal.goalNo}: ${goal.title}</h3>
                        <h4>${goal.subtitle}</h4>
                        <p>${goal.description}</p>
                        <a href="${goal.url}">Learn More</a>  
                    </div>
                    <img src="images/gg_icons/gg_${goal.goalNo}_icon.svg" class="bubble-img-horz gg-g${goal.goalNo}">                                                       
                </div>`
    document.getElementById('_goal_content').innerHTML+=card;
}

function loadProblemCard(goal){
    let card =  ` <div class="oui-bubble gg-bubble-horz ">
                    <div class="bubble-cont-horz">
                        <h3>Problems and Solutions</h3>
                        <p>${goal.facts[0]}
                           To help solve our world's problems, Samsung will donate all earnings from the ads below.</p>
                    </div>
                </div>`
    document.getElementById('_goal_content').innerHTML+=card;            
}

function loadFactsCard(goal){
    let card = `<div class="oui-bubble gg-bubble-horz ">
                    <div class="bubble-cont-horz">
                        <h3>Facts and Figures</h3>     
                        <div class="bubble-cont-horz">                       
                            <ul>    `;
    
    for(let i=0; i < goal.facts.length; i++){
        card+= `<li class="oui-bubble-item">${goal.facts[i]}</li>`
    }

    card+=`     </ul>
            </div>
           </div>`
     
    document.getElementById('_main_content').innerHTML+=card;       

}

window.addEventListener('load', () => {
    let goalNo = document.location.search.replace(/^.*?\=/,'');
    let spnGoal = document.querySelector('#no');
    spnGoal.innerHTML = goalNo;
    let currentGoal = searchGoal(goalNo);
    loadGoalCard(currentGoal);
    loadProblemCard(currentGoal);
    loadFactsCard(currentGoal);
})