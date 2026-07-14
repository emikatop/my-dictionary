// словам треба ж десь бути і показуватись нет?
let dictionary = [];

async function loadWords() {
    const response = await fetch('http://localhost:3000/words');
    const words = await response.json();
    dictionary = words;
    renderTable();
}

// ДОМ елімєнти привязка до нтмл треба ж їх якось поєднати нет? 
const addNewBtn = document.getElementById("add-new-btn");
const tableBody = document.getElementById("table-body");
const form = document.getElementById("add-form");
const modal = document.getElementById("modal");
const cancelBtn = document.getElementById("cancel-btn");

const rowActionsOverlay = document.getElementById('row-actions');
const editBtn = document.getElementById('edit-btn');
const deleteBtn = document.getElementById('delete-btn');
let selectedIndex = null;

// таблиця має ж відображати шо там в dictionary, нє так лі? 
function renderTable() {

    // спочатку почисти таблицю бо інакше нові накладуться на старі webreloads і будуть дублікати
    tableBody.innerHTML = "";

    // на випадок якшо пусто і ще раз нич в сєйфі нема 
    if (dictionary.length === 0) {
        tableBody.innerHTML = 
            `
            <tr>
                <td colspan = "3" class = "empty-state">
                    No entries yet...
                 </td>
            </tr>
            `;
        return;
    }

    // а тут я кароче створюю ту таблицю
    dictionary.forEach((entry, index) => {
        const row = document.createElement("tr");
        row.innerHTML = 
        `
        <td>${entry.word}</td>
        <td> ${entry.example}</td>
        <td> ${entry.translation}</td>
        `
        tableBody.appendChild(row);

        row.addEventListener('click', function() {
        selectedIndex = index;
        rowActionsOverlay.classList.remove('hidden');
        rowActionsOverlay.style.display = 'flex';

    });

});
}


// і нарешті канешно же ми дійшли до попапа.. ісе цікаво

function openModal() {
    modal.classList.remove("hidden");
    modal.style.display = "flex";
}

function closeModal() {
    modal.classList.add("hidden");
    modal.style.display = "none";
    selectedIndex = null;

    document.getElementById('word').value = '';
    document.getElementById('example').value = '';
    document.getElementById('translation').value = '';
}


// додаю евент лісенери шоб кнопки робили

// add new btn -> modal open
addNewBtn.addEventListener("click", openModal);

async function addWord(newEntry) {
        const response = await fetch('http://localhost:3000/words', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(newEntry)
        })

        const addedWord = await response.json();
        dictionary.unshift(addedWord);
        renderTable();
    }

// form subbmition in the modal
form.addEventListener("submit", async function(e){
    e.preventDefault();
     
    // створюю об'єкт з того шо юзер вписав в поля(value=get the value):
    const newEntry = {
        word: document.getElementById("word").value.trim(),
        example: document.getElementById("example").value.trim(),
        translation: document.getElementById("translation").value.trim() 
    }

if (selectedIndex !== null) {
    const id = dictionary[selectedIndex].id
    await fetch(`http://localhost:3000/words/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry)
    })
    await loadWords()
    selectedIndex = null;
} else {
        await addWord(newEntry);
        selectedIndex = null;
    }         
            
    closeModal();                
})

// cancel btn
cancelBtn.addEventListener("click", closeModal); 

// close by clicking outside modal
modal.addEventListener("click", function(e){
    if (e.target === modal) {
        closeModal();
    }
}); 
// target=element which юзер клікнув 

// закрити по кліку на фон
rowActionsOverlay.addEventListener('click', function(e) {
    if (e.target === rowActionsOverlay) {
        rowActionsOverlay.classList.add('hidden');
    }
});

// delete
deleteBtn.addEventListener('click', async function () {
    const id = dictionary[selectedIndex].id
    await fetch(`http://localhost:3000/words/${id}`, {
        method: 'DELETE'
    })
    await loadWords()
    rowActionsOverlay.classList.add('hidden')
});

// edit - поки просто закриває, зробимо потім
editBtn.addEventListener('click', function() {
    rowActionsOverlay.classList.add('hidden');
    rowActionsOverlay.style.display = 'none';

    // заповни поля модала існуючими даними
    document.getElementById('word').value = dictionary[selectedIndex].word;
    document.getElementById('example').value = dictionary[selectedIndex].example;
    document.getElementById('translation').value = dictionary[selectedIndex].translation;

    openModal();
});

//Light/Dark theme
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', function() {
    document.documentElement.classList.toggle('light');
    const isLight = document.documentElement.classList.contains('light');
    themeToggle.innerHTML = isLight ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
    lucide.createIcons();
});

loadWords();