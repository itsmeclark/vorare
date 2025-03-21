//slide image
let slideImages = document.getElementsByClassName("pic")

var counter = 0
function slideNext(){
    slideImages[0].style.transform = "translateX(-100%)"
    slideImages[1].style.transform = "translateX(-100%)"
    slideImages[0].style.transitionDuration = "2s"
    slideImages[1].style.transitionDuration = "2s"
    slideImages[2].style.transform = "translateX(-100%)"
    slideImages[2].style.transitionDuration = "2s"
    setTimeout(()=> {
        counter++
        slideImages[0].style.transform = "translateX(-200%)"
        slideImages[1].style.transform = "translateX(-200%)"
        slideImages[0].style.transitionDuration = "2s"
        slideImages[1].style.transitionDuration = "2s"
        slideImages[2].style.transform = "translateX(-200%)"
        slideImages[2].style.transitionDuration = "2s"
        if(counter === 2){
            slideImages[0].style.transform = "translateX(0%)"
            slideImages[1].style.transform = "translateX(0%)"
            slideImages[0].style.transitionDuration = "2s"
            slideImages[1].style.transitionDuration = "2s"
            slideImages[2].style.transform = "translateX(0%)"
            slideImages[2].style.transitionDuration = "2s"
            counter = 0
        }
        
    }, 4000)


}
setInterval(slideNext, 8000)


