const UTCtime = new Date()
const MON = [" JAN"," FEB"," MAR"," APR"," MAY"," JUN"," JUL"," AUG"," SEP"," OCT"," NOV"," DEC"]
const DATE = [31,28,31,30,31,30,31,31,30,31,30,31,29]
var NY = document.querySelector(".NY")
var LD = document.querySelector(".LD")
var BK = document.querySelector(".BK")
var TW = document.querySelector(".TW")
var SD = document.querySelector(".SD")

reset(1)
setInterval(reset,3600000)
function reset(){
    // var nowHr = 20
    // var nowMin = 12
    // var nowDate = 1
    // var nowMonth = 3
    // var nowYear = 2220
    var nowHr = UTCtime.getUTCHours()
    var nowMin = UTCtime.getUTCMinutes()
    var nowDate = UTCtime.getUTCDate()
    var nowMonth = UTCtime.getUTCMonth()
    var nowYear = UTCtime.getUTCFullYear()

    subSet(nowHr,nowMin,nowDate,nowMonth,nowYear,NY,4)
    addSet(nowHr,nowMin,nowDate,nowMonth,nowYear,LD,0)
    addSet(nowHr,nowMin,nowDate,nowMonth,nowYear,BK,7)
    addSet(nowHr,nowMin,nowDate,nowMonth,nowYear,TW,8)
    addSet(nowHr,nowMin,nowDate,nowMonth,nowYear,SD,10)

    //LD.querySelector(".localTime").textContent = (nowHr) + ":" + nowMin;
}

function subSet(hr,min,date,mon,year,LOCAL,sub){
    var flag = 0, inputTime = '';
    if(hr-sub < 0){
        hr = hr-sub+24;
        if(date==1){
            if(mon == 1){
                mon = 12;
                year--;
                date = 31;
            }
            else{
                if(mon==3 && year%4 == 0){
                    if(year%100==0 && year%400!=0)date = 28
                    else date = 29
                }
                else date = DATE[mon-2]
                mon--
            }
        }
        else date--
    }    
    else{
        if(hr-sub < 10) flag = 1;
        hr = hr-sub;
    }
    
    if(flag) inputTime = "0" + hr + ":"; 
    else inputTime = hr + ":";
    if(min < 10)inputTime += ("0"+min);
    else inputTime += min;
    LOCAL.querySelector(".localTime").textContent = inputTime
    LOCAL.querySelector(".localDate").textContent = date + MON[mon-1] + ", " + year
    color(hr,LOCAL)
}

function addSet(hr,min,date,mon,year,LOCAL,add){
    var flag = 0;
    if(hr+add > 24){                    //加一天
        hr = hr+add-24;
        if(mon==2 && date >= 27){
            if(year%4==0){
                if(year%400 ==0 && date == 28) date = 29
                else if((year%400==0 && date==29)||
                        (year%100 ==0 && date == 28)||
                        (year%100 !=0 && date == 29)){
                    date = 1
                    mon++
                }
                else date ++
            }
            else if(date == 28){
                mon++
                date = 1
            }
            else date++
        }
        else if(date==DATE[mon-1]){
            if(mon == 12){
                mon = 1;
                year++;
            }
            else mon++
            date = 1
        }
        else date++
    }
    else hr = hr+add  
    if(hr < 10) flag = 1;  
    if(flag) inputTime = "0" + hr + ":"; 
    else inputTime = hr + ":";
    if(min < 10)inputTime += ("0"+min);
    else inputTime += min;
    LOCAL.querySelector(".localTime").textContent = inputTime
    LOCAL.querySelector(".localDate").textContent = date + MON[mon-1] + ", " + year
    color(hr,LOCAL)
}

function color(hr,LOCAL){
    if(hr > 17 || hr < 6){
        LOCAL.style.color = "white"
        LOCAL.style.backgroundColor = "black"
    }
    LOCAL.style.backgroundcolor = "white"
}

