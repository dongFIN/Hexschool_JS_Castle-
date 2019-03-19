var btn = document.querySelectorAll(".btn")  //所有案件都監聽
var number = document.querySelector(".number")  //顯示器數字:現在輸入、計算結果
var upFunction = document.querySelector(".upFunction") //顯示器上方算式
//內部運算變數
var showNum = '' //更改顯示器數字：當按下+-/ 算出正確答案
var opr = ''
var showFunction = " " //更改算式：當按下+-*/ == showNum+showFunction
var ans = 0; //答案
//判斷各個的flag
var point = 0 //判斷.在當回合被按過與否
var count = 0 //小數點位數 以解決BUG
var C = 0     //最大小數點位數
var oprTF = 0
var calTF = 0
var RES = 0

for(var i of btn){
    i.addEventListener('click',judgeNum)
}

//小數點
//00初始判斷
//按完0後再接數字

function judgeNum(event){
    var NUM = event.currentTarget

    if(NUM.classList.contains("num")){ //判斷是不是數字
        if(RES){
            upFunction.innerHTML = "&nbsp" 
            RES = 0
            ans = 0;        // 如果按完 = 接著按數字：ans歸零、上方過程淨空
        } 
        if(calTF){
            showFunction += opr
            calTF = 0;      // 如果按下運算符號計算完後 按數字(表示確認符號進到下一回合)：上方過程確定加上opr
        }
        if(point) count++   //計算小數點位數 以四捨五入解決隱藏BUG 0.3-0.5001 = -0.2001 (最多小數四位)
        
        if(showNum == "" && NUM.textContent == "00")showNum = "0" // 開頭為0 || 00 判斷
        else if(showNum == "0"){
            if(NUM.textContent == "0" || NUM.textContent == "00")showNum = "0"
            else showNum = NUM.textContent
        }
        else showNum = showNum + NUM.textContent;
        number.textContent = showNum;
    }
    else if(NUM.classList.contains("point") && !point && showNum != ""){ // 如果還沒被按過 && 前方已有數字
        showNum = showNum + NUM.textContent;
        number.textContent = showNum;
        point = 1;
    }
    else if(NUM.classList.contains("back")){
        if(showNum != ""){
            console.log(showNum.charAt(showNum.length-1))
            if(showNum.charAt(showNum.length-1) == ".") point = 0
            showNum = showNum.substring(0,showNum.length-1)
            number.textContent = showNum
        }
    }
    else if(NUM.classList.contains("oprator")){ //理當按下符號後會進行運算
        if(RES){
            RES = 0
            upFunction.textContent = ans;
            showNum = ans                  // 如果按完 = 接著按符號：上方過程 = showNum = ans
        }
        if(!oprTF){                        // 第一次按下 不能運算
            ans = parseFloat(showNum)
            showNum = ""
            showFunction = ans
        }
        C = (count > C) ? count : C        // "上次"和"此次" 小數位數比較
        if(oprTF)calculate(showNum);
        opr = NUM.textContent
        oprTF = 1;
        showFunction += (showNum )//+ opr);
        showNum = ''
        upFunction.textContent = (showFunction + opr)  // 還不能將showFunction寫死opr until按數字
        calTF = 1
        point = 0   // 符號過後 下一次num可按小數點
    }
    else if(NUM.classList.contains("ansButton")){
        C = (count > C) ? count : C
        if(oprTF)calculate(showNum);
        upFunction.textContent = showFunction+showNum;
        showFunction = ''
        showNum = ''
        oprTF = 0
        RES = 1  // 用於 = 後 繼續計算 || 下回合運算(按數字)
        point = 0
    }
    else if(NUM.classList.contains("reset")){
        showNum = ''
        opr = ''
        showFunction = " "
        ans = 0
        point = 0 
        count = 0 
        C = 0
        oprTF = 0
        calTF = 0
        RES = 0
        upFunction.innerHTML = "&nbsp"
        number.textContent = "0"
    }
}

function calculate(event){
    if(showNum != ""){
        if(opr == "÷") ans = ans / parseFloat(event)
        else if(opr == "×") ans = ans * parseFloat(event)
        else if(opr == "+") ans = ans + parseFloat(event)
        else if(opr == "-") ans = ans - parseFloat(event)
        // console.log(ans)
        if(C > 0){ 
            var i = Math.pow(10,C)
            ans = Math.round(ans * i) / i   // 四捨五入至最大位數
            count = 0
        }
         if(ans.toString().length > 10)ans = ans.toString().substring(0,11)
    }    // 限制ans為10個 (數字+符號
    number.textContent = ans
}
