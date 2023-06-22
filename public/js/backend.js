    const privateSection = document.querySelectorAll('.private'); // solo elementos privados
    const loginSection = document.querySelectorAll('.login'); // solo elementos en pantalla de login
    //const publicSection = document.querySelectorAll('.public'); // elementos publicos (tanto login y privado)

    const tablaSensores = document.querySelector('#tablaSensores tbody');
    const tablaClientes = document.querySelector('#tablaClientes tbody');
    const tablaLogs = document.querySelector('#tablaLogs tbody');

    // botones para agregar    
    //const addDoorBtn = document.getElementById('addDoorBtn');
    //const addGuestBtn = document.getElementById('addGuestBtn'); 
    // addDoorBtn.addEventListener('click', () => {
    //     console.log('Abrir Modal y Formulario!');

    // //     // Create the inline form elements
    // //   const formRow = document.createElement('tr');
    // //   formRow.innerHTML = `
    // //     <td><input type="text" class="border border-gray-300 p-2"></td>
    // //     <td><input type="text" class="border border-gray-300 p-2"></td>
    // //     <td><input type="text" class="border border-gray-300 p-2"></td>
    // //     <td>
    // //       <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Save</button>
    // //       <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Cancel</button>
    // //     </td>
    // //   `;

    // //   // Remove the "Buscando datos..." row
    // //   doorsList.innerHTML = '';

    // //   // Append the form row to the doors list
    // //   doorsList.appendChild(formRow);


    // });


    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    loginBtn.addEventListener('click', () => {
        console.log('¡Accediste!');
        myApp.tf_login=true;
        checkLogin();
    });
    logoutBtn.addEventListener('click', () => {
        console.log('Logout!');
        myApp.tf_login=false;
        checkLogin();
    });


    // my Store con todas las props de mi app (la puedo enviar a una cookie o local Storage)
    const myApp = {
        "tf_login" : true // Replace with the actual condition to determine the login status
    }



    function checkLogin(){
        if (myApp.tf_login) {
            loginSection.forEach(section => {   section.classList.add('hidden');        });
            privateSection.forEach(section => { section.classList.remove('hidden');     });
            //publicSection.forEach(section => {  section.classList.add('hidden');        });
        } else {
            loginSection.forEach(section => {   section.classList.remove('hidden');     });
            privateSection.forEach(section => { section.classList.add('hidden');        });
            //publicSection.forEach(section => {  section.classList.remove('hidden');     });
        }
    }


    function initApp(){
        checkLogin();

        getDoors();
        getGuests();
        getLogs();
    }

    let A_doors=[];
    function getDoors(){
        fetch('/api/sensores')
        .then(response => response.json())
        .then(data => {

            A_doors=data; // también lo guardo en una variable para usar en otros lados (los select)
            // Process the retrieved data
          
            // limpia o pone en mensaje de 0 elementos
            tablaSensores.innerHTML =(data.length)?'':'<tr><td colspan="4" class="h-32 text-xl text-center"><span>No se encontrar Registros</span></td></tr>'; // Clear existing content
     
            // agrego form de nuevo
            tablaSensores.innerHTML =`<tr>
                                <td class="py-2 px-4"><input type="text" value="" class="border border-gray-300" style="width:100%;" /></td>
                                <td class="py-2 px-4"><input type="text" value="" class="border border-gray-300" style="width:100%;" /></td>
                                <td class="py-2 px-4"><input type="text" value="" class="border border-gray-300" style="width:100%;" /></td>
                                <td class="py-2 px-4"><button data-id="0" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded edit">Guardar</button></td>
                                </tr>
            `;


            // Process the retrieved data
            data.forEach((sensor, index) => {
                const row = document.createElement('tr');
                row.classList.add(index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100');

                const rowHtml=`<!-- Example guest data -->
                                    <td class="py-2 px-4">${sensor.building}</td>
                                    <td class="py-2 px-4">${sensor.door}</td>
                                    <td class="py-2 px-4">${sensor.link_url}</td>
                                    <td class="py-2 px-4">
                                        <button data-id="${sensor.id}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded edit">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button data-id="${sensor.id}" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded delete">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                            `;
                
                row.innerHTML=rowHtml;                
                tablaSensores.appendChild(row);
            });
          console.log(data); // Replace with your desired logic
        })
        .catch(error => {
          // Handle any errors that occur during the fetch request
          console.error('Error:', error);
        });
    }

    function getGuests(){
        fetch('/api/clientes')
        .then(response => response.json())
        .then(data => {
            // Process the retrieved data
          
            // limpia o pone en mensaje de 0 elementos
            tablaClientes.innerHTML =(data.length)?'':'<tr><td colspan="5" class="h-32 text-xl text-center"><span>No se encontrar Registros</span></td></tr>'; // Clear existing content


            
            // agrego form de nuevo
            let optionsHtml="";
            A_doors.forEach((item, index) => {
                optionsHtml+=`<option value="${item.id}">${item.door}</option>`;
            });
            tablaClientes.innerHTML =`<tr>
                                        <td class="py-2 px-4">&nbsp;</td>
                                        <td class="py-2 px-4"><input type="text" value="" class="border border-gray-300" style="width:100%;" /></td>
                                        <td class="py-2 px-4"><input type="text" value="" class="border border-gray-300" style="width:100%;" /></td>
                                        <td class="py-2 px-4"><select>${optionsHtml}</select></td>
                                        <td class="py-2 px-4"><input type="text" value="" class="border border-gray-300" style="width:100%;" /></td>
                                        <td class="py-2 px-4"><select><option value="12">12hs</option><option value="24">24hs</option><option value="48">48hs</option></select></td>
                                        <td class="py-2 px-4"><button data-id="0" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded edit">Guardar</button></td>
                                    </tr>
                `;
     
            // Process the retrieved data
            data.forEach((item, index) => {
                const row = document.createElement('tr');
                row.classList.add(index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100');

                const rowHtml=` <td class="py-2 px-4">${item.id}</td>
                                <td class="py-2 px-4">${item.name}</td>
                                <td class="py-2 px-4">${item.apartment}</td>
                                <td class="py-2 px-4">${item.door}</td>
                                <td class="py-2 px-4">${formatDate(item.arriving_date)}</td>
                                <td class="py-2 px-4">${formatDate(item.expiration_date)}</td>
                                <td class="py-2 px-4">
                                    <button data-id="${item.id}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button data-id="${item.id}" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                                        <i class="fas fa-key"></i>
                                    </button>
                                    <button data-id="${item.id}" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded delete">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>

                                    <a href="http://localhost:3000/${item.id}" target="_blank" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                </td>`;
                
                row.innerHTML=rowHtml;                
                tablaClientes.appendChild(row);
            });
          console.log(data); // Replace with your desired logic
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


    function formatDate(dateString){
        //const dateString = "2023-06-21T23:14:06.000Z";
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return date.toLocaleString('en-US', options);
        
    }