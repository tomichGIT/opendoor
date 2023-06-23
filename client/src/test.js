import {setReactive} from './js/libs/reactive.js';

  // Sample data
const myData = [
  {
    id: 12,
    building: "San Martin 440",
    door: "SMD 440",
    link_url: "https://us-apia.coolkit.cc/v2/smartscene2/webhooks/execute?id=1fb4a1500da34e41a20413f789227f7d",
    created_at: "2023-06-21T16:49:01.000Z",
    updated_at: "2023-06-22T06:59:20.000Z"
  },
  {
    id: 33,
    building: "Via Brasil 460",
    door: "HAll - Via Brasil 460",
    link_url: "http://eweling.omc/asdlakjas/aseqowid",
    created_at: "2023-06-21T16:49:12.000Z",
    updated_at: "2023-06-21T16:49:25.000Z"
  },
  {
    id: 125,
    building: "Via Brasil 460",
    door: "Puerta 2 - Via Brasil 460",
    link_url: "http://eweling.asdomc/asdlakjas/aseqowid",
    created_at: "2022-06-21T16:49:12.000Z",
    updated_at: "2022-06-21T16:49:25.000Z"
  },
];

// Get DOM elements
const itemsList = document.getElementById("itemsList");
const itemsTableBody = document.getElementById("itemsTableBody");
const addItemBtn = document.getElementById("addItemBtn");


// ------ Eventlisteners de botones de ADD y Remove ---------

// Event listener for add item button
addItemBtn.addEventListener("click", () => {
    reactiveData.push({
        id: 27,
        building: "new Building",
        door: "new Updated Door",
        link_url: "https://newLink.com/updated",
        created_at: "2024-06-21T16:49:01.000Z",
        updated_at: "2024-06-22T06:59:20.000Z"
    })
});

function updateRemoveButtons(){
    // Function to update remove butto
    console.log("updating botones de remove");
    
  const removeButtons = itemsList.getElementsByClassName('removeBtn');
  Array.from(removeButtons).forEach(button => {
    button.addEventListener('click', removeItem);
  });

  const removeButtons2 = itemsTableBody.getElementsByClassName('removeBtn');
  Array.from(removeButtons2).forEach(button => {
    button.addEventListener('click', removeItem);
  });
}
// ------ Eventlisteners de botones de ADD y Remove ---------







const reactiveData =setReactive(myData, renderItems);

// rendering the UI
function renderItems(){
    console.log("Corriendo render Item");
    // limpiar tabla e items:
    itemsList.innerHTML="";
    itemsTableBody.innerHTML="";

    if(reactiveData.length==0){
        itemsList.innerHTML="<li>No se encontraron datos...</li>";
        itemsTableBody.innerHTML="<tr><td colspan='5'>No se encontraron datos...</td></tr>";
    }

    // Update the list and table with the initial myData
    reactiveData.forEach((item) => {
        addItem(item);
    });
    updateRemoveButtons();
}
// run the first time
renderItems();



// Function to add an item
function addItem(item) {
    const index = reactiveData.indexOf(item);
  
    const newItem = document.createElement("li");
    //newItem.textContent = `Item ${item.id} (${item.door})`;
    newItem.innerHTML = `Item ${item.id} (${item.door}) <button data-id="${index}" class="removeBtn">Remove</button>`;
    itemsList.appendChild(newItem);
  
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
      <td>${item.building}</td>
      <td>${item.door}</td>
      <td>${item.link_url}</td>
      <td><button data-id="${index}" class="removeBtn">Remove</button></td>
    `;
    itemsTableBody.appendChild(tableRow);
}
// Function to remove an item
function removeItem(event) {
    const button = event.currentTarget;
    const dataId = button.getAttribute("data-id");
    reactiveData.splice(dataId, 1);
}
// Function Simulate updating an item after 3 seconds
setTimeout(() => {
  reactiveData[1] = {
    id: 33,
    building: "Updated Building",
    door: "Updated Door",
    link_url: "https://example.com/updated",
    created_at: "2023-06-21T16:49:01.000Z",
    updated_at: "2023-06-22T06:59:20.000Z"
  };
}, 3000);