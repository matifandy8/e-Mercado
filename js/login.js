//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  const usernav = document.getElementById('usernav');
  const close = document.getElementById('close');
  
  let username = JSON.parse(localStorage.getItem('user'));
  
  if(username != null){
      usernav.innerHTML = '<a href="#" id="close" class="">'+username[0].email+'</a>';
  }else{
      usernav.innerHTML = '<a href="login.html" id="close" class="">Iniciar sesion</a>';
  }
  
  close.addEventListener('click',function(){
    localStorage.clear('user');
    location.href='index.html';
   });
});

function validation(){
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;
    var error_message = document.getElementById('error_message');
    var text;

    error_message.style.padding = "10px";

    if(email === ''){
      text = "Escriba un email";
      error_message.innerHTML = text;
      return false;
    }
    if(password === ''){
      text = "Escriba una contraseña";
      error_message.innerHTML = text;
      return false;
    }
    window.location="e-mercado.html"
    return true;
}

// ------------------------

const form = document.getElementById('myform');
const email = document.getElementById('inputEmail');
const password = document.getElementById('inputPassword');

form.addEventListener('submit', (e) => {
    e.preventDefault();
let users = Array(
        {
          email: email.value,
          contraseña: password.value
        }
);
    localStorage.setItem('user',JSON.stringify(users));
    validation();
});

