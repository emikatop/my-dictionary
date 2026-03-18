// словам треба ж десь бути і показуватись нет?
let dictionary = [];

// закачати слова в сєйф на браузєрі, бо десь ж мають лежати поки ти не вчишся 
function saveToStorage() {
  localStorage.setItem("myDictionary", JSON.stringify(dictionary));
}
//каже блін ваня ош локал сторедж фігня і треба скл пілключати а я хз як ну ладно розберемось


// викачати слова з сєйфа, але пропусти через зміну формату
function loadFromStorage(){
    const savedData = localStorage.getItem("myDictionary")
    if (savedData) {
        dictionary = JSON.parse(savedData)
    }
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
}


// додаю евент лісенери шоб кнопки робили

// add new btn -> modal open
addNewBtn.addEventListener("click", openModal);

// form subbmition in the modal
form.addEventListener("submit",function(e){
    e.preventDefault();
     
    // створюю об'єкт з того шо юзер вписав в поля(value=get the value):
    const newEntry = {
        word: document.getElementById("word").value.trim(),
        example: document.getElementById("example").value.trim(),
        translation: document.getElementById("translation").value.trim() 
    }

    if (!newEntry.word || !newEntry.example || !newEntry.translation) {
        alert("Fill out all the fields first");
        return;
    }

    if (selectedIndex !== null) {
    dictionary[selectedIndex] = newEntry;  // оновити існуючий
    selectedIndex = null;
    } else {
    dictionary.push(newEntry);             // додати новий
    }

    saveToStorage();            
    renderTable();             
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
deleteBtn.addEventListener('click', function () {
        dictionary.splice(selectedIndex, 1);
        saveToStorage();
        renderTable();
        rowActionsOverlay.classList.add('hidden');
    }
);

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

// Без цього — відкриваєш словник, а таблиця пуста. Хоча дані є.
loadFromStorage();
renderTable();