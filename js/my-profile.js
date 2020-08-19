//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    const usernav = document.getElementById('usernav');
    const close = document.getElementById('close');
    
    let username = JSON.parse(localStorage.getItem('user'));
    
    if(username != null){
        usernav.innerHTML = '<a href="#" id="close" class="subnavbtn nav link active">'+username[0].email+'</a>';
    }else{
        usernav.innerHTML = '<a href="login.html" id="close" class="subnavbtn nav link active">Iniciar sesion</a>';
    }
    
});
