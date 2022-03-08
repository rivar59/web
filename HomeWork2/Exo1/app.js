let one = document.querySelector(".div1");
let two = document.querySelector(".div2");
let five = document.querySelector(".div3");
let value = document.querySelector(".value");
let stop = document.querySelector(".StopPropagation");
let reset = document.querySelector('.reset');

let counterValue = 0;

var propagation = 0;

function checkValue(){
  if (counterValue >= 30){
    console.log(">30");
    two.style.backgroundColor = 'grey';
    two.removeEventListener('click',ftwo);
  }
  if (counterValue >= 50){
    five.removeEventListener('click',ffive);
    five.style.backgroundColor = 'black';
  }
}


reset.addEventListener('click',()=>{
  counterValue = 0;
  value.innerHTML = counterValue;
  one.style.backgroundColor = 'blue';
  two.style.backgroundColor = 'red';
  five.style.backgroundColor = 'yellow';
  restart();
});

stop.addEventListener('click',()=>{
  propagation += 1 % 2;
});

one.addEventListener('click',fone);

function fone(event){
    
  console.log("1");
  counterValue += 1;
  value.innerHTML = counterValue;
  if (propagation == 1){
      event.stopPropagation();
  }
  checkValue();
}

two.addEventListener('click',ftwo);

function ftwo(event){
  console.log("2");
  counterValue += 2;
  value.innerHTML = counterValue;
  if (propagation == 1){
    event.stopPropagation();
}
  checkValue();
}

five.addEventListener('click',ffive);

function ffive(event){
    console.log("5");
    console.log(propagation);
  counterValue += 5;
  value.innerHTML = counterValue;
  if (propagation == 1){
    event.stopPropagation();
}
  checkValue();
}

function restart(){
    one.removeEventListener('click',fone);
    two.removeEventListener('click',ftwo);
    five.removeEventListener('click',ffive);
    one.addEventListener('click',fone);
    two.addEventListener('click',ftwo);
    five.addEventListener('click',ffive);
    propagation = 0;
}