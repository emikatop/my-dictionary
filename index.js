// словам треба ж десь бути і показуватись нет?
let dictionary = [];

// закачати слова в сєйф на браузєрі, бо десь ж мають лежати поки ти не вчишся 
function saveToStorage() {
  localStorage.setItem("myDictionary", JSON.stringify(dictionary));
}

// викачати слова з сєйфа, але пропусти через зміну формату
function loadFromStorage(){
    const savedData = localStorage.getItem("myDictionary")
    if (savedData) {
        dictionary = JSON.parse(savedData)
    }
}

// ДОМ елімєнти привязка до нтмл треба ж їх якось поєднати нет? 

const addNewBtn = document.getElementById("add-new-btn");
const tableBody = document.getElementById("dictionary-table");
const form = document.getElementById("add-form");
const modal = document.getElementById("modal");
const cancelBtn = document.getElementById("cancel-btn");

`