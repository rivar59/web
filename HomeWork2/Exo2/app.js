let ballon = document.querySelector('.ballon');
let size = 10;

function sizeBallon(event){
  if (event.key == "ArrowUp"){
    size += 5;
    ballon.style.fontSize = size+'px';
    sizeMax();
  }
  else if(event.key == "ArrowDown"){
      if (size > 10){
        size -= 5;
        ballon.style.fontSize = size+'px';
      }
  }
}

function sizeMax(){
  if (size >= 200){
    ballon.innerHTML = '💥';
    window.removeEventListener('keydown',sizeBallon);
  }
}

window.addEventListener('keydown',sizeBallon);
