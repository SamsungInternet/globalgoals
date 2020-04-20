window.addEventListener('load', () => {
    let link = document.getElementById('collected-data');
    let modal = document.getElementsByClassName('modal')[0];
    let close = document.getElementsByClassName('close')[0];

    link.onclick = function(e){
        modal.style.display = "block";
        e.preventDefault()
    }

    close.onclick = function(){
        modal.style.display= "none";
    }
})
