// Data
let dictionary = [];

// DOM Elements
const tableBody = document.getElementById("table-body");
const addBtn = document.getElementById("add-new-btn");
const modal = document.getElementById("modal");
const form = document.getElementById("add-form");
const cancelBtn = document.getElementById("cancel-btn");

// Load from Local Storage
function loadDictionary() {
    const saved = localStorage.getItem("dictionary");
    if (saved) dictionary = JSON.parse(saved) //json -> js object (because localStorage can only save strings)
    renderTable();
}

// Save to Local Storage
function saveDictionary() {
    localStorage.setItem("dictionary", JSON.stringify) // js object -> json
}

// Render the Table
function renderTable(){
   tableBody.innerHTML = "";
   if (dictionary.length === 0) {
    tableBody.innerHTML = `
    <tr>
    <td colspan = "3" 
    style="text-align:center; color:#666; padding:30px;>

        No words yet. 
        <br> Add some by tapping the <em>Add New</em> button. 

     </td>
    </tr>
    `
    return;
   }
}



// Modal Controls

// Add New word

// Cancel Button

// Tap anywhere to close Modal

// Delete

// Open Modal

// Start the App