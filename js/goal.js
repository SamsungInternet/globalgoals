

function loadGoal(){
    const goals = postsJson.posts;
    let goalNo = document.location.search.replace(/^.*?\=/,'');
    let spnGoal = document.querySelector('#no');
    spnGoal.innerHTML = goalNo;

}

window.addEventListener('load', () => {
    loadGoal();
})