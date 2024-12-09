// function loadFormData() {
//     const name = localStorage.getItem("name");
//     const title = localStorage.getItem("title");
//     const newsText = localStorage.getItem("newsText");

//     if (name) document.getElementById("name").value = name;
//     if (title) document.getElementById("title").value = title;
//     if (newsText) document.getElementById("newsText").value = newsText;
// }

// // Функция для сохранения данных в LocalStorage
// function saveFormData() {
//     localStorage.setItem("name", document.getElementById("name").value);
//     localStorage.setItem("title", document.getElementById("title").value);
//     localStorage.setItem("newsText", document.getElementById("newsText").value);
// }

// // Загрузка данных при загрузке страницы
// window.onload = function() {
//     loadFormData();
// };

// // Обработчик события для сохранения данных при изменении формы
// document.getElementById("newsForm").addEventListener("input", saveFormData);

// // Функция для обработки отправки формы
// document.getElementById("newsForm").addEventListener("submit", function(event) {
//     event.preventDefault(); // Предотвращаем стандартное поведение отправки формы

//     // Получаем значения формы
//     const name = document.getElementById("name").value;
//     const title = document.getElementById("title").value;
//     const newsText = document.getElementById("newsText").value;

//     // Создаем объект отзыва
//     const newsData = {
//         name: name,
//         title: title,
//         newsText: newsText
//     };

//     // Сохраняем объект в localStorage с уникальным ключом (например, по времени)
//     localStorage.setItem(`news_${Date.now()}`, JSON.stringify(newsData));

//     // Очистка формы после отправки
//     document.getElementById("newsForm").reset();

//     // Очистка данных из localStorage после отправки
//     localStorage.removeItem("name");
//     localStorage.removeItem("title");
//     localStorage.removeItem("newsText");
// });


function displayNews() {
    const keys = Object.keys(localStorage);
    const newsTableBody = document.getElementById("news_generator");
    const newsTextModule = document.getElementById("newsTextModule");
    const anotherText = document.getElementById("anotherText");
    newsTableBody.innerHTML = "";

    if (keys.length === 0) {
        const noNewsMessage = document.createElement("tr");
        const noNewsCell = document.createElement("td");
        noNewsCell.colSpan = 3; // Changed to 3 to match the number of columns
        noNewsCell.textContent = "Нет доступных новостей.";
        noNewsMessage.appendChild(noNewsCell);
        newsTableBody.appendChild(noNewsMessage);
        return;
    }

    keys.forEach((key) => {
        const newsData = JSON.parse(localStorage.getItem(key));

        if (newsData) {
            const newRow = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = newsData.name;
            newRow.appendChild(nameCell);

            const titleCell = document.createElement("td");
            titleCell.textContent = newsData.title;
            newRow.appendChild(titleCell);

            const newsTextCell = document.createElement("td");
            newsTextCell.textContent = newsData.newsText;
            newRow.appendChild(newsTextCell);

            newsTableBody.appendChild(newRow);
        }
    });
}

function clearLocalStorage() {
    localStorage.clear();
    displayNews();
}
document.getElementById("clearStorageButton").addEventListener("click", clearLocalStorage);

document.getElementById("newsForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById("name").value;
    const title = document.getElementById("title").value;
    const newsText = document.getElementById("newsText").value;

    // Create a unique key for each news item
    const key = Date.now().toString();
    const newsData = { name, title, newsText };

    localStorage.setItem(key, JSON.stringify(newsData));
    
    // Clear form inputs
    this.reset();

    // Refresh the displayed news
    displayNews();
});

window.onload = function() {
    displayNews();
};