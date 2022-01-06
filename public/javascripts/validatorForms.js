// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
})()


  
const $ = id => document.getElementById(id);
  
//Envio del formulario
$('form-register').addEventListener('submit', e => {
  e.preventDefault();

  let elementosForm = $('form-register').elements;
  let error = false;

  for (let i = 0; i < elementosForm.length - 3; i++) {
      
      if(!elementosForm[i].value){
          elementosForm[i].classList.add('is-invalid')
          error = true
      }
  }
  
  let cont = document.getElementById('talles').children;
  let i = 0;
  let al_menos_uno = false;
  while (i < cont.length) {
      if (cont[i].tagName == 'INPUT' && cont[i].type == 'checkbox') {
          // Verifica si esta checked
          if (cont[i].checked) {
              al_menos_uno = true;
          }
      }
      i++
  }
  
  //Valida si al menos un checkbox es checked
  if (!al_menos_uno) {
      $('talles').classList.add('is-invalid')
      $('error-talles').innerHTML = "Debes seleccionar talles"
  }else{
      $('talles').classList.remove('is-invalid')
      $('talles').classList.add('is-valid')
      $('error-talles').innerHTML = null
  }
  
  if(!al_menos_uno){
      error = true
  }

  if(!error){
      $('form-register').submit()
  }

  console.log(error);
 
})