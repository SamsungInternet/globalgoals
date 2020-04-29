/* Enums */
var CardLayoutType = {
    BLANK: 1,
    VERTICAL: 2,
    HORIZONTAL: 3,
    WALLPAPER: 4,
    GOAL_ICON: 5,
    properties: {
        1: {name: 'blank', css_abbrev: 'blank'},
        2: {name: 'vertical', css_abbrev: 'vert'},
        3: {name: 'horizontal', css_abbrev: 'horz'},
        4: {name: 'wallpaper', css_abbrev: 'wallp'},
        5: {name: 'goal_icon', css_abbrev: 'goal'}
    }
};

/*prefers-color-scheme support on older browser*/
if (window.matchMedia('(prefers-color-scheme: dark)').media === 'not all') {
    document.documentElement.style.display = 'none';
    document.head.insertAdjacentHTML(
        'beforeend',
        '<link rel="stylesheet" href="css/gg-light.css" onload="document.documentElement.style.display = \'\'">'
    );
}

window.addEventListener('load', () => {
    
   /*Sticky header global app*/
    let _page_title = document.querySelector('#_page_title');
    let observerStickyTitle = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                document.querySelector('._sticky_title').classList.add('_sticky_title_disappear');
                document.querySelector('._sticky_title').classList.remove('_sticky_title_appear');
            } else {
                document.querySelector('._sticky_title').classList.add('_sticky_title_appear');
                document.querySelector('._sticky_title').classList.remove('_sticky_title_disappear');
            }
        });
    });
    observerStickyTitle.observe(_page_title);

    /*cards animation entrance*/
    let contentCards = document.querySelectorAll('.gg-bubble-vert, .gg-bubble-horz');
    let animCardEntry = [
        { transform: 'translateX(300px)' },
        { transform: 'translateX(0px)' }
    ];
    let animCardEntryTiming = {
        duration: 500,
        easing: 'ease-out',
        fill: 'forwards',
    };

    let observerCards = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            let cardEntryAnim = entry.target.animate(animCardEntry, animCardEntryTiming);
            cardEntryAnim.onfinish = function() { observerCards.unobserve(entry.target) };
        });
    },
    {threshold:0});
    contentCards.forEach(card => { observerCards.observe(card); });
});

/* Card creator */
let createCard = (cLayoutType, cTitle, cContent, cImageUrl, cGGNum, cLink, cLanguage, cBadge) => {
    let card = document.createElement('div');
    card.setAttribute('class', getCSSCardLayout(cLayoutType, cGGNum, cBadge));
    let content;
    switch(cLayoutType) {
        case CardLayoutType.HORIZONTAL:
        case CardLayoutType.VERTICAL:
            content = getHorzVertContent(cLayoutType, cTitle, cContent, cImageUrl, cLanguage);
            content.forEach(part => {
                card.appendChild(part);
            });
            break;
        case CardLayoutType.WALLPAPER:
            card.appendChild(getWallpaperContent(cImageUrl, cLink, cContent));
            break; 
        case CardLayoutType.BLANK:
            card.innerHTML = cContent;
            if(cBadge) {
                let badge = document.createElement('span');
                badge.innerText = cGGNum;
                badge.setAttribute('class', 'gg-bubble-badge');
                badge.setAttribute('style', `background-color: var(--gg${cGGNum}-color)`);
                card.appendChild(badge);
            }
            break;
        case CardLayoutType.GOAL_ICON:
            card.appendChild(getGoalIconContent(cImageUrl, cLink, cLanguage));
        break;
    }
    return card;
}

let getCSSCardLayout = (cLayoutType, cGGNum, cBadge) => {
    let classes = 'oui-bubble ';
    classes += `gg-bubble-${CardLayoutType.properties[cLayoutType].css_abbrev}`;
    if(cGGNum != null && ! cBadge)
            classes += ` gg-g${cGGNum}`;
    return classes;    
}

let getHorzVertContent = (cLayoutType, cTitle, cContent, cImageUrl) => {
    let content = [];
    let cContentContainer = document.createElement('div');
    cContentContainer.setAttribute('class', `bubble-cont-${CardLayoutType.properties[cLayoutType].css_abbrev}`)
    let title = document.createElement('h3');
    title.innerText = cTitle;
    let cardContent = document.createElement('span');
    cardContent.innerHTML = cContent;
    cContentContainer.appendChild(title);
    cContentContainer.appendChild(cardContent);
    let image = document.createElement('img');
    image.setAttribute('src', cImageUrl);
    image.setAttribute('class', `bubble-img-${CardLayoutType.properties[cLayoutType].css_abbrev}`);
    content.push(image);
    content.push(cContentContainer);
    return content;
}

let getWallpaperContent = (cImageUrl, cLink, cContent) => {
    let content = document.createElement('div');

    let wallpaper = document.createElement('img');
    wallpaper.setAttribute('src', cImageUrl);
    wallpaper.setAttribute('class', 'wallpaper_image');
    
    if(cLink != null) {
        let lwallpaper = document.createElement('a');
        lwallpaper.setAttribute('href', cLink);
        lwallpaper.appendChild(wallpaper);
        content.appendChild(lwallpaper);
    }
    else{
        content.appendChild(wallpaper)
    }
    if(cContent) {
        let details = document.createElement('span');
        details.setAttribute('class', 'wallp_details');
        details.innerHTML = cContent;
        content.appendChild(details);
    }
    
    return content;
};

let getGoalIconContent = (cIconUrl, cLinkDestination, cLangauge) => {
    let link = document.createElement('a');
    link.setAttribute('href', cLinkDestination);
    let image = document.createElement('img');
    image.setAttribute('src', cIconUrl);
    link.appendChild(image);
    return link;
};


