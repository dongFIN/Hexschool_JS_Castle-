var hour = document.querySelector("#hour")
var min = document.querySelector("#min")
var sec = document.querySelector("#second")
var Hr = 0
var Min = 0
var Sec = 0

setInterval(clock,1000)
function clock(){
    var timeNow = new Date()
    Hr = timeNow.getHours()
    Min = timeNow.getMinutes()
    Sec = timeNow.getSeconds()
    hour.style.transform = "translate("+640+"px,400px) rotate(" + (Hr*30 + Min*0.5-180) + "deg)"
    min.style.transform = "translate(640px,400px) rotate(" + (Min*6-180) + "deg)"
    sec.style.transform = "translate(640px,400px) rotate(" + (Sec*6-180) + "deg)"
    console.log(Hr +" "+ Min +" "+ Sec)
}

// setInterval(clockTest,1)
function clockTest(){
    hour.style.transform = "translate(640px,400px) rotate(" + (Hr*30 + Min*0.5-180) + "deg)"
    min.style.transform = "translate(640px,400px) rotate(" + (Min*6-180) + "deg)"
    sec.style.transform = "translate(640px,400px) rotate(" + (Sec*6-180) + "deg)"
    Hr = Sec/3600
    Min = Sec/60
    Sec++
}


