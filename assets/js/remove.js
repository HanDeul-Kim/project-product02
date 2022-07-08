    const layout01 = document.querySelector(".layout01");
    const layout02 = document.querySelector(".layout02");
    const layout03 = document.querySelector(".layout03");

    const main = document.querySelector("#main01");

    function close() {
        if(layout01.style.display == 'block'){
            main.classList.add('off');
        } else if(layout02.style.display == 'block') {
            main.classList.add('off');
        } else if(layout03.style.display == 'block') {
            main.classList.add('off');
        } else {
            main.classList.remove('off');
        }
    }  
    setInterval(function(){
        close();
    }, 10);