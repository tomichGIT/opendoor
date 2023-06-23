

// este si fuera http://localhost:3000/?g=8
// const urlParams = new URLSearchParams(window.location.search);
// const guestId = urlParams.get("g");

// este si fuera http://localhost:3000/8
// const url = window.location.pathname;
// const segments = url.split('/');
// const uuid = segments[segments.length - 1];


function init(){
  /*
  `<script>
        var userData = {
            nombre: "${nombre}",
            uuid: "${guestId}",
            expiration: "${expiration_date}",
            tf_expired: false
        };
      </script>`
*/
  const txt_nombre=document.getElementById('txt_nombre');
  const txt_timer=document.getElementById('txt_timer');

  const remainingTime = getRemainingTime(userData.expiration);
  console.log(remainingTime);

  txt_nombre.innerHTML=userData.nombre;
  txt_timer.innerHTML=remainingTime;//userData.expiration;
}
init();


function getRemainingTime(dateString) {
  const targetDate = new Date(dateString);
  const currentDate = new Date();

  if (targetDate < currentDate) {
    return 'Tiempo expirado';
  }

  const remainingMilliseconds = targetDate - currentDate;
  let remainingSeconds = Math.floor(remainingMilliseconds / 1000);
  let remainingMinutes = Math.floor(remainingSeconds / 60);
  let remainingHours = Math.floor(remainingMinutes / 60);
  let remainingDays = Math.floor(remainingHours / 24);

  remainingSeconds=String(remainingSeconds).padStart(2, '0');
  remainingMinutes=String(remainingMinutes %60).padStart(2, '0');
  remainingHours=String(remainingHours %24).padStart(2, '0');
  remainingDays=String(remainingDays).padStart(2, '0');

  return `${remainingDays} días ${remainingHours}:${remainingMinutes}`;
  //return `Tiempo restante: ${remainingDays} días, ${remainingHours % 24} horas, ${remainingMinutes % 60} minutos, ${remainingSeconds % 60} segundos`;
}



const doorBtn = document.getElementById('doorBtn');
doorBtn.addEventListener('click', (e) => {
  e.preventDefault();
  // Aquí puedes agregar la lógica para activar la apertura de la puerta del edificio
  // Esto podría incluir llamadas a una API o integración con dispositivos de control de acceso.


  fetch("api/opendoor/"+userData.uuid, {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({id:uuid})
  })
  .then(response => response.json())
  .then(data => {

    //data.error=0;
 
        initCounter5segs();
        divOpenDoor.classList.add('hidden');

        // Automatically show the button and hide the message after 5 seconds
        setTimeout(() => {
          divOpenDoor.classList.remove('hidden');
          divMsgStatus.classList.add('hidden');
        }, 10000);


      if(data.error==0){
        divMsgStatus.classList.remove('hidden');
        successMsg.classList.remove('hidden');
        errorMsg.classList.add('hidden');
      }else{
        divMsgStatus.classList.remove('hidden');
        successMsg.classList.add('hidden');
        errorMsg.classList.remove('hidden');
      }
  })
  .catch(error => {
    // Handle any errors that occur during the fetch request
    console.error('Error:', error);
  });

});




const divOpenDoor = document.getElementById('divOpenDoor');
const divMsgStatus = document.getElementById('divMsgStatus');
const successMsg = document.getElementById('successMsg');
const errorMsg = document.getElementById('errorMsg');

 


    function initCounter5segs(){

      const countdown = document.querySelectorAll('.countdown');

      // counter de 5 segundos
      let secondsLeft = 10;
      const countdownInterval = setInterval(() => {
        secondsLeft--;
        countdown.forEach(item=>{
          item.textContent = secondsLeft;
        })
        if (secondsLeft <= 0) {
          clearInterval(countdownInterval);
        }
      }, 1000);
    }