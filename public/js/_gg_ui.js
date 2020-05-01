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

/* Card creator aliases */

let createBlankCard = (cContent, cGGNum, cBadge) => {
    return createCard(CardLayoutType.BLANK, null, cContent, null, cGGNum, null, null, cBadge);
};

let createVerticalCard = (cTitle, cContent, cImageUrl, cGGNum, cActions, cLanguage) => {
    return createCard(CardLayoutType.VERTICAL, cTitle, cContent, cImageUrl, cGGNum, null, cLanguage, 0, cActions);
};

let createHorizontalCard = (cTitle, cContent, cImageUrl, cGGNum, cActions, cLanguage) => {
    return createCard(CardLayoutType.HORIZONTAL, cTitle, cContent, cImageUrl, cGGNum, null, cLanguage, 0, cActions);
};

let createWallpaperCard = (cContent, cImageUrl, cGGNum, cLink, cLanguage) => {
    return createCard(CardLayoutType.WALLPAPER, null, cContent, cImageUrl, cGGNum, cLink, cLanguage);
};

let createGoalIconCard = (cGGNum, cImage, cLink, cLanguage) => {
    return createCard(CardLayoutType.GOAL_ICON, null, null, cImage, cGGNum, cLink, cLanguage);
};

/* Card creator */
let createCard = (cLayoutType, cTitle, cContent, cImageUrl, cGGNum, cLink, cLanguage, cBadge, cActions) => {
    let card = document.createElement('div');
    card.setAttribute('class', getCSSCardLayout(cLayoutType, cGGNum, cBadge));
    let content;
    switch(cLayoutType) {
        case CardLayoutType.HORIZONTAL:
        case CardLayoutType.VERTICAL:
            content = getHorzVertContent(cLayoutType, cTitle, cContent, cImageUrl, cLanguage, cActions);
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

// returns the css string that a gg card needs depending on its layout
let getCSSCardLayout = (cLayoutType, cGGNum, cBadge) => {
    let classes = 'oui-bubble ';
    classes += `gg-bubble-${CardLayoutType.properties[cLayoutType].css_abbrev}`;
    if(cGGNum != null && ! cBadge)
            classes += ` gg-g${cGGNum}`;
    return classes;    
}

// creates the content for vertical and horizontal cards
let getHorzVertContent = (cLayoutType, cTitle, cContent, cImageUrl, cLanguage, cActions) => {
    let content = [];
    let cContentContainer = document.createElement('div');
    cContentContainer.setAttribute('class', `bubble-cont-${CardLayoutType.properties[cLayoutType].css_abbrev}`)
    //title of the card
    let title = document.createElement('h3');
    title.innerText = cTitle;
    //content of the card
    let cardContent = document.createElement('span');
    cardContent.innerHTML = cContent;
    cContentContainer.appendChild(title);
    cContentContainer.appendChild(cardContent);
    if(cActions != null) {
        cContentContainer.appendChild(getActionsContent(cActions));
    }
    //image in the card
    let image = document.createElement('img');
    image.setAttribute('src', cImageUrl);
    image.setAttribute('class', `bubble-img-${CardLayoutType.properties[cLayoutType].css_abbrev}`);
    content.push(image);
    content.push(cContentContainer);
    return content;
}

// creates the content for wallpaper cards
let getWallpaperContent = (cImageUrl, cLink, cContent) => {
    let content = document.createElement('div');

    let wallpaper = document.createElement('img');
    wallpaper.setAttribute('src', cImageUrl);
    wallpaper.setAttribute('class', 'wallpaper_image');
    
    if(cLink != null) { //makes the image clickable if a url was specified
        let lwallpaper = document.createElement('a');
        lwallpaper.setAttribute('href', cLink);
        lwallpaper.appendChild(wallpaper);
        content.appendChild(lwallpaper);
    }
    else{
        content.appendChild(wallpaper)
    }
    if(cContent) { //if there's additional content to add after the image it's created here
        let details = document.createElement('span');
        details.setAttribute('class', 'wallp_details');
        details.innerHTML = cContent;
        content.appendChild(details);
    }
    
    return content;
};

// creates the content of global icon cards (the ones in Goals page)
let getGoalIconContent = (cIconUrl, cLinkDestination, cLanguage) => {
    let link = document.createElement('a');
    link.setAttribute('href', cLinkDestination);
    let image = document.createElement('img');
    image.setAttribute('src', cIconUrl);
    link.appendChild(image);
    return link;
};

// creates the link-like options or actions present in some cards
let getActionsContent = (cActions) => {
    let actions = document.createElement('span');
    actions.setAttribute('class', 'bubble-actions');
    cActions.forEach(act => {
        let action = document.createElement('a');
        action.setAttribute('class', 'bubble-action');
        action.innerText = act[0];
        action.setAttribute('src', act[1]);
        actions.appendChild(action);        
    });
    return actions;
}

// create static content

let loadStaticCards = (cMainContent) =>{
    const donateCard = createVerticalCard( 'Donate directly to the UNDP',
    'Donate to the <a href=# id="undp-link">UNDP</a> to help tackle the root causes of poverty and create a better life for everyone.',
     'images/raster/hands-vert.jpg',
     0,
     [['Donate','https://give.undp.org/give/120717/#!/donation/checkout']]);

    cMainContent.appendChild(donateCard);

    const learnCard = createVerticalCard('Learn about the Global Goals',
        'World leaders agreed to 17 goals for a better world by 2030. These goals have the power to change the world and the people in it',
        '/images/raster/goals-vert.jpg',                                
        0,
        [['Learn more','goals.html']]
        );

    cMainContent.appendChild(learnCard);
    const peopleCard = createHorizontalCard('We the People',
    'This star-studded video introduces the new plan for the people and planet: the UN Global Goals for Sustainable Development. Audio is in English.</p>',
    '/images/raster/video-horz.jpg',
    0,
    [['Watch','https://youtu.be/RpqVmvMCmp0']]
    );

    cMainContent.appendChild(peopleCard);

    const workCard   = createHorizontalCard('How this app works',
    'When you see ads from this app, you will earn money for donations that support the Global Goals, such as fighting to end poverty, reducing social inequality, and tackling climate change.',
    '/images/raster/boy-horz.jpg',
    0,
    null
    );

    cMainContent.appendChild(workCard);   
}

