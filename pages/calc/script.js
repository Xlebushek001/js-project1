var a = "";
let b = "";
var sign = "";
var result = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/', '+/-', '%'];

const out = document.querySelector('.screen p');

function clearAll(){
    a = '';
    b = '';
    sign = '';
    result = false;
    out.textContent = 0;
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector(".buttons").onclick = (event) =>{
    if(!event.target.classList.contains("btn")) return;
    if(event.target.classList.contains("ac")) return;
    out.textContent = '';

    const key = event.target.textContent;
    
    if (digit.includes(key)){
        console.log(sign)
        if(b === "" && sign === ""){
            a += key;
            out.textContent = a;
        }
        else if(a !== "" && b !== "" && result){
            b = key;
            result = false;
            out.textContent = b;
        }
        else{
            b += key;
            out.textContent = b;
        }
        return;
    }
    if (action.includes(key)){
        sign = key;
        out.textContent = sign;
        return;
    }
    if (key === '='){
        if ( b === '') b = a;
        switch(sign){
            case '+':
                a = a - (-b); 
                break;
            case '-':
                a = a - b; 
                break;
            case 'X':
                a = a * b; 
                break;
            case '/':
                if(b === '0'){
                    out.textContent = "Ошибка";
                    a='';
                    b='';
                    sign='';
                    return;
                }
                a = a / b; 
                break;
            case "+/-":
                a = a * (-1);
                break;
            case '%':
                a = a / 100;
        }
        result = true;
        out.textContent = a;
    }
} 

