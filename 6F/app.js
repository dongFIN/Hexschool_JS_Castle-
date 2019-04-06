const start = document.querySelector(".start")
const main = document.querySelector(".main")
const point = document.querySelector(".main .point")
const reset = document.querySelector(".reset")
const time = document.querySelector(".time")
const ANS = document.querySelector(".ans")
var TIME = 59
var opr = ["+","-","×","÷"]
var nowPoint = 000
var ans = 0

function startB(){
    equation(TIME)
    count()
    setInterval(count,1000)
    start.classList.add("hidden")
    // main.style.display = "inline-block"
    main.classList.remove("hidden")
}
function resetB(){
    history.go(0)
}
function count(){
    if(TIME < 10) time.textContent = "00：0" + TIME
    else time.textContent = "00：" + TIME
    // console.log(TIME)
    if(TIME == 0){
        console.log("TIME" + TIME)
        clearInterval()
        main.classList.add("hidden")
        // main.style.display = "none"
        reset.querySelector(".RScore").textContent = nowPoint;
        reset.classList.remove("hidden")
    }
    TIME = TIME-1
}
function equation(T){
    var num1, num2, OPR
    if(T>40){
        num1 = Math.floor(Math.random()*9 + 1)
        num2 = Math.floor(Math.random()*9 + 1)
    }
    else if(T>20){
         num1 = Math.floor(Math.random()*99 + 1)
         num2 = Math.floor(Math.random()*99 + 1)
    }
    else if(T <= 20){
        num1 = Math.floor(Math.random()*999 + 1)
        num2 = Math.floor(Math.random()*999 + 1)
    }
    OPR = Math.floor(Math.random()*4)
    main.querySelector(".num1").textContent = num1
    main.querySelector(".num2").textContent = num2
    main.querySelector(".opr").textContent = opr[OPR]
    if(OPR == 0) ans = num1 + num2;
    else if(OPR == 1) ans = num1 - num2
    else if(OPR == 2) ans = num1 * num2
    else{
        ans = num1 / num2
        ans = Math.round(ans * 100) / 100
    }
    console.log("ans = " + ans)
}
function judge(){
    if(ANS.value == ans){
        if(TIME > 20) nowPoint++
        else nowPoint+=5
        equation(TIME)
    }
    else nowPoint--
    if(nowPoint<10)point.textContent = "00"+ nowPoint
    else if(nowPoint<100)point.textContent = "0"+ nowPoint
    else point.textContent = nowPoint
    ANS.value = null
}
