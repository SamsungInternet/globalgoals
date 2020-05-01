document.getElementsByTagName("main")[0].addEventListener("scroll", onScroll);

// screens
var main = document.getElementById('main')
var second = document.getElementById('second')

// buttons
var next = document.getElementById('next')
var close = document.getElementById('close')

// Dots
var mainDot = document.getElementById('main-dot')
var secondDot = document.getElementById('second-dot')

// Fired when scrolling happens
function onScroll(){
    if(isInViewport(main)){
        close.classList.add('hidden')
        next.classList.remove('hidden')

        secondDot.classList.remove('dot-selected')
        mainDot.classList.add('dot-selected')

    }else{
        next.classList.add('hidden')
        close.classList.remove('hidden')

        mainDot.classList.remove('dot-selected')
        secondDot.classList.add('dot-selected')
    }
}

// Check if element is in viewport
function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return rect.left >= 0
}