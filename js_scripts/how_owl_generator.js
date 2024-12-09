const owls = ["data/photos/filin_3.jpg", 
                "data/photos/fishy_4.jpg",
                "data/photos/neotropiki_3.jpg",
                "data/photos/neyasut_5.jpg",
                "data/photos/polar_5.jpg",
                "data/photos/sipuha_5.jpg",
                "data/photos/splushka_6.jpg",
                "data/photos/suchi_6.jpg",
                "data/photos/yastreb_2.jpg",
                "data/photos/yshastue_3.jpg"
]
const names = ["Ты - филин!",
                "Ты - рыбная сова!",
                "Ты - неотропическая сова!",
                "Ты - неясыть!",
                "Ты - полярная сова!",
                "Ты - сипуха!",
                "Ты - сплюшка!",
                "Ты - сыч!",
                "Ты - ястребиная сова!",
                "Ты - ушастая сова!"
]

function errorHandler() {
    const responseBody = document.getElementById("sova_result");
    const errorText = document.createElement("p");
    errorText.className = "error";
    errorText.textContent = "Упс... Кажется возникла какая-то неполадка. Попробуйте ещё раз или вернитесь позднее. Не унывайте и оставайтесь на советиве :>";
    responseBody.appendChild(errorText);
}

async function fetchRandomInteger() {
    const url = 'https://www.random.org/integers/?num=1&min=0&max=9&col=1&base=10&format=plain&rnd=new';

    try {
        document.getElementById('loader').style.display = 'block';
        const response = await fetch(url);
        if (!response.ok) {
            errorHandler();
            document.getElementById('loader').style.display = 'none';
            throw new Error('Network response was not ok');
        }

        const data = await response.text();
        const randomInteger = parseInt(data.trim(), 10);
        const responseBody = document.getElementById("sova_result");
        const responseText = document.createElement("p");
        responseText.className = "sova_name";
        responseText.textContent = names[randomInteger];
        responseBody.appendChild(responseText);
        const responseJpgWrapper = document.createElement("p");
        responseJpgWrapper.className = "response_photo";
        const responseJpg = document.createElement("img");
        responseJpg.style.width = "80%";
        responseJpg.style.height = "45%";
        responseJpg.alt = "";
        responseJpg.src = owls[randomInteger];
        responseJpgWrapper.appendChild(responseJpg);
        responseBody.appendChild(responseJpgWrapper);
        document.getElementById('before_text').style.display = 'none';
        document.getElementById('loader').style.display = 'none';
    } catch (error) {
        errorHandler();
        document.getElementById('loader').style.display = 'none';
        console.error('Error fetching random integer:', error);
    }
}

function getOwlResult() {
    document.getElementById('getOwlButton').style.display = 'none';
    fetchRandomInteger();
}
document.getElementById("getOwlButton").addEventListener("click", getOwlResult);
