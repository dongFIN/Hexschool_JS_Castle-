const container = document.querySelector('.container')


for(var i = 2; i < 10; i++){
    var box = document.createElement('div')
    container.appendChild(box)
    box.classList.add('boxes')
    var num = document.createElement('p')
    num.classList.add('num')
    box.appendChild(num)
    num.innerHTML = i;
    for(var j = 1; j < 10; j++){
        var line =  document.createElement('p')
        // line.classList.add('line')
        // box.appendChild(line)
        line.innerHTML = i + ' x ' + j + ' = ' + i*j ;
        line.classList.add('line')
        box.appendChild(line)
    }
}