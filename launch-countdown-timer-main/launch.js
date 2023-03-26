const day = document.querySelector('.days')
const min = document.querySelector('.minutes')
const hour = document.querySelector('.hours')
const second = document.querySelector('.seconds')

let timeLeft ={
    d:0,
    h:0,
    m:0,
    s:0
}


let totalSeconds;


function init(){
    totalSeconds = Math.floor((new Date('05.01.2023') - new Date())/1000)
    setTimeLeft()
    let interval = setInterval(()=>{
        if (totalSeconds < 0){
            clearInterval(interval)
        }
        countTime();
        console.log(timeLeft)
    },1000)
}

function countTime(){
    if (totalSeconds > 0){
        --timeLeft.s;
        if(timeLeft.m >=0 && timeLeft.s < 0 ){
            timeLeft.s = 59;
            --timeLeft.m 
            if(timeLeft.h >=0 && timeLeft.m < 0 ){
                timeLeft.m = 59;
                --timeLeft.h
                if(timeLeft.d >=0 && timeLeft.h < 0 ){
                    timeLeft.h = 23;
                    --timeLeft.d                      
                }                     
            }                     
        }
    }
    --totalSeconds
    printTime()
}
function printTime(){
    animateFlip(second, timeLeft.s);
    animateFlip(min , timeLeft.m);
    animateFlip(hour, timeLeft.h);
    animateFlip(day, timeLeft.d);
}
//------- thanks to competent_dev for the help with the animation

function animateFlip(element, value){
    const valueInDom = element.querySelector('.bottom-back').innerText;
    const currentValue = value < 10 ? '0' + value : '' + value
    element.querySelector('.top-back span').innerText = currentValue
    element.querySelector('.bottom-back span').innerText = currentValue

    if (valueInDom === currentValue) return;

    gsap.to(element.querySelector('.top'), 0.5,{
        rotationX: '-180deg',
        transferPerspective: 300,
        ease: Quart.easeOut,
        onComplete: ()=>{
            element.querySelector('.top').innerText = currentValue
            element.querySelector('.bottom').innerText = currentValue
            gsap.set(element.querySelector('.top'), {rotationX: 0})
        }
    })

    gsap.to(element.querySelector('.top-back'), 0.5,{
        rotationX: 0,
        transferPerspective:300,
        clearProps: 'all'
    })
}
function setTimeLeft(){
    timeLeft.d = Math.floor(totalSeconds/(60*60*24));
    timeLeft.h = Math.floor(totalSeconds/(60*60)%24);
    timeLeft.m = Math.floor(totalSeconds/(60)%60);
    timeLeft.s = Math.floor(totalSeconds%60)
}

init()