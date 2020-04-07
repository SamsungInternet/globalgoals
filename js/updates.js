
function getWallpapers(){
    const arrayWallpapers = wallpapersJson.wallpapers;
    let wallpaperElement = document.getElementById('wallpaper');
   

    /*Get Only Quotes and Texts*/
    let quotesAndTexts = arrayWallpapers.filter(wallpaper => wallpaper.type == 'TEXT' || wallpaper.type == 'QUOTE');
    /*Get One Random*/
    let wallpaper = quotesAndTexts[Math.floor(Math.random() * quotesAndTexts.length)];
    wallpaperElement.className +=' gg-g'+ wallpaper.goalNo;

    let finalTemplate = `${wallpaper.type == 'QUOTE'? 
                                `<img src= ${wallpaper.assetUrl} alt=${wallpaper.title}>`:
                                `<p>${wallpaper.data}</p>`}
                        <p>${wallpaper.credits}</p>
                        <p>#GlobalGoal${wallpaper.goalNo}</p>
                        <a href="goal.html?no=${wallpaper.goalNo}" id="link-goal">Learn More</button>`

    return finalTemplate;
    
}

window.addEventListener('load', () => {
    let link = document.getElementById('undp-link');
    let modal = document.getElementsByClassName('modal')[0];
    let close = document.getElementsByClassName('close')[0];
    let goalDiv = document.getElementsByClassName('goal-img')[0]; 
   

    goalDiv.innerHTML += getWallpapers();
    
    let linkGoal = document.querySelector('#link-goal');

    linkGoal.onclick = function(){
        window.document.location = './goal.html';
    }

    link.onclick = function(){
        modal.style.display = "block";
    }

    close.onclick = function(){
        modal.style.display= "none";
    }

})

