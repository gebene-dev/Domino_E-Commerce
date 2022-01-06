const $ = id => document.getElementById(id);

let regExLetter = /^[A-Z]+$/i;
let regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;


window.addEventListener('load', () => {

    let listEmails;
    const emailVerify = async() =>{
    try {
        const response = await fetch("http://localhost:3000/api/users/emails");
        const result = await response.json();
        console.log(result)
        return result;
        } catch (error) {
            console.log(error);
        }
    }

    emailVerify().then(array =>{
        listEmails = array
    })

   

    /* validaciones */
    
    $('nombre').addEventListener('blur', () => {
       
        switch (true) {
            case !$('nombre').value.trim():
                $('nombre').classList.add('is-invalid')    
                $('error-nombre').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> Debes poner un nombre</span>"
                break;
            case $('nombre').value.trim().length < 2 || $('nombre').value.trim().length > 50 :
                $('nombre').classList.add('is-invalid')    
                $('error-nombre').innerText = "Debe tener entre 2 y 50 caracteres"
                break;
            case !regExLetter.test($('nombre').value.trim()):
                $('nombre').classList.add('is-invalid')    
                $('error-nombre').innerText = "Solo caracteres alfabéticos"
                break;
            default:
                $('nombre').classList.remove('is-invalid')
                $('nombre').classList.add('is-valid')
                $('error-nombre').innerText = null
                break;
        }
    })

    $('apellido').addEventListener('blur', () => {
        
        switch (true) {
            case !$('apellido').value.trim():
                $('apellido').classList.add('is-invalid')    
                $('error-apellido').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> Debes poner un apellido</span>"
                break;
            case $('apellido').value.trim().length < 2 || $('apellido').value.trim().length > 50 :
                $('apellido').classList.add('is-invalid')    
                $('error-apellido').innerText = "Debe tener entre 2 y 50 caracteres"
                break;
            case !regExLetter.test($('apellido').value.trim()):
                $('apellido').classList.add('is-invalid')    
                $('error-apellido').innerText = "Solo caracteres alfabéticos"
                break;
            default:
                $('apellido').classList.remove('is-invalid')
                $('apellido').classList.add('is-valid')
                $('error-apellido').innerText = null
                break;
        }
    })

    $('email').addEventListener('blur', async () => {

        switch (true) {
            case !regExEmail.test($('email').value):
                $('email').classList.add('is-invalid')    
                $('error-email').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> Debes poner un email válido</span>"
                break;
            case await listEmails.includes($('email').value.trim()) :
                $('email').classList.add('is-invalid')    
                $('error-email').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> El email ya esta registrado</span>"
                break;
            default:
                $('email').classList.remove('is-invalid')
                $('email').classList.add('is-valid')
                $('error-email').innerHTML = null
                break;
        }
    })

    $('contraseña').addEventListener('focus', () => {
        $('error-contraseña').innerHTML = "<span style='color: gray'>La contraseña debe tener entre 6 y 15 caractres, un número y una mayúscula</span>"

    })

    $('contraseña').addEventListener('blur', () => {
        if(!regExPass.test($('contraseña').value)){
            $('contraseña').classList.add('is-invalid')
            $('error-contraseña').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> Debes poner una contraseña válida</span>"
        }else{
            $('contraseña').classList.remove('is-invalid')
            $('contraseña').classList.add('is-valid')
            $('error-contraseña').innerHTML = null
        }
    })

    $('birthday').addEventListener('blur', () => {
        if(!$('birthday').value){
            $('birthday').classList.add('is-invalid')
            $('error-birthday').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> Debes poner una fecha de nacimiento</span>"
        }else{
            $('birthday').classList.remove('is-invalid')
            $('birthday').classList.add('is-valid')
            $('error-birthday').innerHTML = null
        }
    })

    $('acepta').addEventListener('click', () => {
        $('acepta').classList.toggle('is-valid')
        $('acepta').classList.remove('is-invalid')
        $('error-acepta').innerHTML = null
    })


    /* envio del formulario */

$('form-register').addEventListener('submit', e => {
    e.preventDefault();

    let elementosForm = $('form-register').elements;
    let error = false;

    for (let i = 0; i < elementosForm.length - 2; i++) {
        
        if(!elementosForm[i].value){
            elementosForm[i].classList.add('is-invalid')
            $('error-empty').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> Los campos señalados son obligatorios</span>";
            error = true
        }
    }

    if(!$('acepta').checked){
        $('acepta').classList.add('is-invalid')
        $('error-acepta').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> Debes aceptar los términos y condiciones</span>";
        error = true
    }
    if(!error){
        $('form-register').submit()
    }
    console.log(elementosForm);
})

})
