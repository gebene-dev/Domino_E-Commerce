const $ = id => document.getElementById(id);

let regExTel = /[0123456789]{7,20}/;
let regExLetter = /^[A-Z]+$/i;
let regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;


window.addEventListener('load', () => {

    /* validaciones */

    $('motivo').addEventListener('blur', async () => {

        if (!$('motivo').value.trim()) {
            $('motivo').classList.add('is-invalid')    
            $('error-motivo').innerHTML = "Debes ingresar un motivo"
        }else{
            $('motivo').classList.remove('is-invalid')
            $('motivo').classList.add('is-valid')
            $('error-motivo').innerHTML = null
        }
    })
    
    $('nombre').addEventListener('blur', () => {
       
        switch (true) {
            case !$('nombre').value.trim():
                $('nombre').classList.add('is-invalid')    
                $('error-nombre').innerHTML = "Debes ingresar un nombre"
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

   
    $('telefono').addEventListener('blur', async () => {

        if (!regExTel.test($('telefono').value)) {
            $('telefono').classList.add('is-invalid')    
            $('error-telefono').innerHTML = "Debes ingresar un telefono válido"
        }else{
            $('telefono').classList.remove('is-invalid')
            $('telefono').classList.add('is-valid')
            $('error-telefono').innerHTML = null
        }

    })

    $('email').addEventListener('blur', async () => {

        if (!regExEmail.test($('email').value)) {
            $('email').classList.add('is-invalid')    
            $('error-email').innerHTML = "Debes ingresar un email válido"
        }else{
            $('email').classList.remove('is-invalid')
            $('email').classList.add('is-valid')
            $('error-email').innerHTML = null
        }

    })

    $('mensaje').addEventListener('blur', async () => {

        if (!$('mensaje').value.trim()) {
            $('mensaje').classList.add('is-invalid')    
            $('error-mensaje').innerHTML = "Debes ingresar un mensaje"
        }else{
            $('mensaje').classList.remove('is-invalid')
            $('mensaje').classList.add('is-valid')
            $('error-mensaje').innerHTML = null
        }

    })


    /* envio del formulario */

    $('form-contacto').addEventListener('submit', e => {
        e.preventDefault();
    
        let elementosForm = $('form-contacto').elements;
        let error = false;
        console.log(elementosForm);
    
        for (let i = 0; i < elementosForm.length - 2; i++) {
            
            if(!elementosForm[i].value){
                elementosForm[i].classList.add('is-invalid')
                $('error-empty').innerHTML = "Los campos señalados son obligatorios";
                error = true
            }
        }

        if(!error){
            $('form-contacto').submit()
        }
        
    })
    
    })