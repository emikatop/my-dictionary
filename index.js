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
