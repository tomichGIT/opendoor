    import { formatDate } from './libs/dates.js';
    import { shorterText, showHideMoreInfo } from './libs/texts.js';
    import {setReactive} from './libs/reactive.js';
    
   /*
   ejemplo link apertura puerta:
   https://us-apia.coolkit.cc/v2/smartscene2/webhooks/execute?id=1fb4a1500da34e41a20413f789227f7d

   ejemplo response:
    {
        "error": 0,
        "msg": "",
        "data": {}
    }
   */
   
    const privateSection = document.querySelectorAll('.private'); // solo elementos privados
    const loginSection = document.querySelectorAll('.login'); // solo elementos en pantalla de login

    const tablaSensores = document.querySelector('#tablaSensores');
    const tablaClientes = document.querySelector('#tablaClientes');
    const tablaLogs = document.querySelector('#tablaLogs');


    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    loginBtn.addEventListener('click', () => {
        const getUser=document.getElementById('username').value;
        const getPass=document.getElementById('password').value;
        // demo user
        if(getUser=="arielgrovpman" && getPass=="opendoor123!"){
            console.log('¡Accediste!');
            myApp.tf_login=true;
            checkLogin();
        } else {
            alert("credenciales inválidas");
        }
    });
    logoutBtn.addEventListener('click', () => {
        console.log('Logout!');
        myApp.tf_login=false;
        checkLogin();
    });

    // mis elementos reactivos, ejecutan su render automáticamente luego de modificar su vector.
    // al hacer un update de la información, los render corren solos.
    const A_doors=setReactive([], renderDoors);
    const A_guests=setReactive([], renderGuests);

    // my Store con todas las props de mi app (la puedo enviar a una cookie o local Storage)
    const myApp = {
        "tf_login" : true, // Replace with the actual condition to determine the login status
        "A_doors" : A_doors,
        "A_guests" : A_guests
    }

    
    const saveDoorBtn = document.getElementById("saveDoorBtn");
    saveDoorBtn.addEventListener('click', (e) => {

        const txt_edificio=tablaSensores.querySelector("#txt_edificio").value;
        const txt_nombre=tablaSensores.querySelector("#txt_nombre").value;
        const txt_link=tablaSensores.querySelector("#txt_link").value;
        const dataId = saveDoorBtn.getAttribute("data-id");

        if(txt_edificio.length < 3 || txt_nombre.length < 3){
            alert("Nombre de edificio o de Puerta muy cortos"); return;
        }
  
        // if(dataId =="new"){
        //     A_doors.push(doorData)
        // }else {
        //     A_doors[dataId]=doorData;
        // }

        const doorData = {
            building:txt_edificio,
            door:txt_nombre,
            link_url:txt_link
        };

        // si tiene id estoy editando, si no creo uno nuevo
        // dataId es del array del DOM, el id original lo obtengo acá.
        const fetchUrl=(A_doors[dataId])?'/api/sensores/'+A_doors[dataId].id:'/api/sensores';

        fetch(fetchUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(doorData)
        })
        .then(response => response.json())
        .then(data => {
            // lo guardo en mi variable reactiva (ejecuta automáticamente renderDoors() )
            getDoors();
        })
        .catch(error => {
          // Handle any errors that occur during the fetch request
          console.error('Error:', error);
        });


    });
    function removeDoor(event){
        // confirmación y luego eliminar
        const dataId = event.currentTarget.getAttribute("data-id");
        
        const confirmation = confirm("esta seguro que quieres borrar? "+dataId);
        if (!confirmation) { return }

        const itemId = A_doors[dataId].id;
    
        fetch('/api/sensores/'+itemId, {method:"DELETE"})
        .then(response => response.json())
        .then(data => {
            // lo guardo en mi variable reactiva (ejecuta automáticamente renderDoors() )
            getDoors();
        })
        .catch(error => {
          // Handle any errors that occur during the fetch request
          console.error('Error:', error);
        });
        //A_doors.splice(dataId, 1);
    }
    function editDoor(event){
        // cargar el formulario con los datos
        // esta funcion NO LLEVA  FETCH REQUEST!
        const dataId = event.currentTarget.getAttribute("data-id");
        console.log("editando door: "+dataId);

        const txt_edificio=tablaSensores.querySelector("#txt_edificio");
        const txt_nombre=tablaSensores.querySelector("#txt_nombre");
        const txt_link=tablaSensores.querySelector("#txt_link");
        
        saveDoorBtn.setAttribute("data-id", dataId);

        txt_edificio.value=A_doors[dataId].building;
        txt_nombre.value=A_doors[dataId].door;
        txt_link.value=A_doors[dataId].link_url;
    }
    function renderDoors(){
        //console.log("Rendering A_doors:", A_doors);

        // Limpio el formulario
        tablaSensores.querySelector("#txt_edificio").value="";
        tablaSensores.querySelector("#txt_nombre").value="";
        tablaSensores.querySelector("#txt_link").value="";
        saveDoorBtn.setAttribute("data-id", "new");

        // // limpia o pone en mensaje de 0 elementos
        tablaSensores.querySelector("tbody").innerHTML =(A_doors.length)?'':'<tr><td colspan="4" class="h-32 text-xl text-center"><span>No se encontrar Registros</span></td></tr>'; // Clear existing content
        
            // Process the retrieved data
            A_doors.forEach((sensor, index) => {
            const row = document.createElement('tr');
            row.classList.add(index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100');

            var sensorLink = shorterText(sensor.link_url, 35);

            const rowHtml=`<!-- Example guest data -->
                                <td class="py-2 px-4">${sensor.building}</td>
                                <td class="py-2 px-4">${sensor.door}</td>
                                <td class="py-2 px-4">${sensorLink}</td>
                                <td class="py-2 px-4">
                                    <button data-id="${index}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded editDoor"><i class="fas fa-edit"></i></button>
                                    <button data-id="${index}" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded removeDoor"><i class="fas fa-trash-alt"></i></button>
                                </td>
                        `;
            
            row.innerHTML=rowHtml;                
            tablaSensores.querySelector("tbody").appendChild(row);
        });
        //console.log(A_doors); // Replace with your desired logic
        
        // Update de Buttons
        const removeButtons = tablaSensores.querySelectorAll('tbody .removeDoor');
        removeButtons.forEach(button => {
          button.addEventListener('click', removeDoor);
        });
        const editButtons = tablaSensores.querySelectorAll('tbody .editDoor');
        editButtons.forEach(button => {
          button.addEventListener('click', editDoor);
        });

    }



    const saveGuestBtn = document.getElementById("saveGuestBtn");
    saveGuestBtn.addEventListener('click', e => {

        const txt_fullname=tablaClientes.querySelector("#txt_fullname").value;
        const txt_apartment=tablaClientes.querySelector("#txt_apartment").value;
        const txt_dates=tablaClientes.querySelector("#txt_date").value;

        const select_sensores=tablaClientes.querySelector("#select_sensores").value;
        const select_timeout=tablaClientes.querySelector("#select_timeout").value;

        const dataId = saveDoorBtn.getAttribute("data-id");

        if(txt_fullname.length < 3 || txt_apartment.length < 3){
            alert("Nombre de cliente o de Apartamento muy cortos"); return;
        }

        const guestData = {
            txt_fullname:txt_fullname,
            txt_apartment:txt_apartment,
            select_sensores:select_sensores,
            txt_dates:txt_dates,
            select_timeout:select_timeout
        };

        // si tiene id estoy editando, si no creo uno nuevo
        // dataId es del array del DOM, el id original lo obtengo acá.
        const fetchUrl=(A_guests[dataId])?'/api/clientes/'+A_guests[dataId].id:'/api/clientes';

        fetch(fetchUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(guestData)
        })
        .then(response => response.json())
        .then(data => {
            // lo guardo en mi variable reactiva (ejecuta automáticamente renderDoors() )
            getGuests();
        })
        .catch(error => {
          // Handle any errors that occur during the fetch request
          console.error('Error:', error);
        });


    });
    function removeGuest(event){
        const dataId = event.currentTarget.getAttribute("data-id");

        const cliente= A_guests[dataId].name;
        
        const confirmation = confirm("esta seguro que quieres borrar este pasajero? "+cliente);
        if (!confirmation) { return }

        const itemId = A_guests[dataId].id;
    
        fetch('/api/clientes/'+itemId, {method:"DELETE"})
        .then(response => response.json())
        .then(data => {
            // lo guardo en mi variable reactiva (ejecuta automáticamente renderGuests() )
            getGuests();
        })
        .catch(error => {
          // Handle any errors that occur during the fetch request
          console.error('Error:', error);
        });
    }
    function editGuest(event){
        // cargar el formulario con los datos
        // esta funcion NO LLEVA  FETCH REQUEST!
        const dataId = event.currentTarget.getAttribute("data-id");
        console.log("editando guest: "+dataId);

        const txt_fullname=tablaClientes.querySelector("#txt_fullname");
        const txt_apartment=tablaClientes.querySelector("#txt_apartment");
        const txt_date=tablaClientes.querySelector("#txt_date");
        const select_sensores=tablaClientes.querySelector("#select_sensores");

        // Falta autoseleccionar Door y Expiration
        
        saveDoorBtn.setAttribute("data-id", dataId);

        txt_fullname.value=A_guests[dataId].name;
        txt_apartment.value=A_guests[dataId].apartment;
        txt_date.value=A_guests[dataId].arriving_date.substring(0, 16); // para datetime
        //txt_date.value=A_guests[dataId].arriving_date.substring(0, 10); // para date

        select_sensores.value = A_guests[dataId].id_sensor.toString();
        
    }
    function renderGuests(){
        

        // Limpio el formulario
        tablaClientes.querySelector("#txt_fullname").value="";
        tablaClientes.querySelector("#txt_apartment").value="";
        tablaClientes.querySelector("#txt_date").value="";
        saveGuestBtn.setAttribute("data-id", "new");

        // limpia o pone en mensaje de 0 elementos
        tablaClientes.querySelector("tbody").innerHTML =(A_guests.length)?'':'<tr><td colspan="5" class="h-32 text-xl text-center"><span>No se encontrar Registros</span></td></tr>'; // Clear existing content


            
        // agrego form de nuevo
        let optionsHtml="";
        myApp.A_doors.forEach((item, index) => {
            //console.log("item es:", item);
            optionsHtml+=`<option value="${item.id}">${item.door}</option>`;
        });
        tablaClientes.querySelector("#select_sensores").innerHTML=optionsHtml;
        
 
        // Process the retrieved data
        A_guests.forEach((item, index) => {
            const row = document.createElement('tr');
            row.classList.add(index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100');

            const rowHtml=` <td class="py-2 px-4">${item.id}</td>
                            <td class="py-2 px-4">${item.name}</td>
                            <td class="py-2 px-4">${item.apartment}</td>
                            <td class="py-2 px-4">${item.door}</td>
                            <td class="py-2 px-4">${formatDate(item.arriving_date)}</td>
                            <td class="py-2 px-4">${formatDate(item.expiration_date)}</td>
                            <td class="py-2 px-4">
                                <button data-id="${index}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded editGuest"><i class="fas fa-edit"></i></button>
                                <button data-id="${index}" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded removeGuest"><i class="fas fa-trash-alt"></i></button>
                                <a href="http://localhost:3000/${item.uuid}" target="_blank" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"><i class="fas fa-eye"></i></a>
                                <button data-id="${index}" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"><i class="fas fa-key"></i></button>
                            </td>`;
            
            row.innerHTML=rowHtml;                
            tablaClientes.querySelector("tbody").appendChild(row);
        });
      //console.log(A_guests); // Replace with your desired logic

          // Update de Buttons
          const removeButtons = tablaClientes.querySelectorAll('tbody .removeGuest');
          removeButtons.forEach(button => {
            button.addEventListener('click', removeGuest);
          });
          const editButtons = tablaClientes.querySelectorAll('tbody .editGuest');
          editButtons.forEach(button => {
            button.addEventListener('click', editGuest);
          });


    }

    function checkLogin(){
        if (myApp.tf_login) {
            loginSection.forEach(section => {   section.classList.add('hidden');        });
            privateSection.forEach(section => { section.classList.remove('hidden');     });
            getData();
        } else {
            loginSection.forEach(section => {   section.classList.remove('hidden');     });
            privateSection.forEach(section => { section.classList.add('hidden');        });
        }
    }


    function initApp(){
        checkLogin();
    }

    function getData(){
        getDoors();
        //getGuests();
        getLogs();
    }


    function getDoors(){
        A_doors.length = 0; // lo vacío (es constant, asique no lo puedo = [] )
        fetch('/api/sensores')
        .then(response => response.json())
        .then(data => {
            // lo guardo en mi variable reactiva (ejecuta automáticamente renderDoors() )
            A_doors.push(...data);
            getGuests();
        })
        .catch(error => {
          // Handle any errors that occur during the fetch request
          console.error('Error:', error);
        });
    }
    function getGuests(){
        A_guests.length = 0; // lo vacío (es const, asi que no lo puedo vacíar con = []  )
        fetch('/api/clientes')
        .then(response => response.json())
        .then(data => {
            A_guests.push(...data);            
        })
        .catch(error => {
          // Handle any errors that occur during the fetch request
          console.error('Error:', error);
        });
    }
    function getLogs(){
        fetch('/api/logs')
        .then(response => response.json())
        .then(data => {
          // Process the retrieved data
          
            // limpia o pone en mensaje de 0 elementos
            tablaLogs.innerHTML =(data.length)?'':'<tr><td colspan="4" class="h-32 text-xl text-center"><span>No se encontrar Registros</span></td></tr>'; // Clear existing content
     
            // Process the retrieved data
            data.forEach((item, index) => {
                const row = document.createElement('tr');
                row.classList.add(index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100');

                const rowHtml=`
                                <td class="py-2 px-4">${formatDate(item.created_at)}</td>
                                <td class="py-2 px-4">${item.client}</td>
                                <td class="py-2 px-4">${item.ip}</td>
                                <td class="py-2 px-4">${item.device}</td>
                            `;
                
                row.innerHTML=rowHtml;                
                tablaLogs.appendChild(row);
            });
          console.log(data); // Replace with your desired logic
        })
        .catch(error => {
          // Handle any errors that occur during the fetch request
          console.error('Error:', error);
        });
    }

    initApp();


  