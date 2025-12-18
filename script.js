const apiKey = "d9da4cc59b5c654bf1e12c497ca927c5";

const btn = document.getElementById("btnSearch");
btn.addEventListener("click", getWeather);

function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (city === "") {
        alert("Masukkan nama kota dulu!");
        return;
    }

    getCurrentWeather(city);
    getForecast(city);
}

function translateWeather(desc) {
    const map = {
        "broken clouds": "Berawan Tebal",
        "scattered clouds": "Berawan",
        "few clouds": "Sedikit Berawan",
        "overcast clouds": "Mendung",
        "clear sky": "Cerah",
        "light rain": "Hujan Ringan",
        "moderate rain": "Hujan Sedang",
        "heavy intensity rain": "Hujan Lebat",
        "drizzle": "Hujan Rintik",
        "mist": "Berkabut"
    };
    return map[desc] || desc;
}

function getCurrentWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== 200) {
                alert("Kota tidak ditemukan");
                hideAll();
                return;
            }

            const weather = translateWeather(data.weather[0].description);

            document.getElementById("currentTitle").style.display = "block";
            document.getElementById("currentWeather").style.display = "block";

            document.getElementById("currentTitle").innerText =
                `Cuaca Kota ${data.name} Sekarang`;

            document.getElementById("currentWeather").innerHTML = `
                <p><span>🌡️ Suhu</span><span>${data.main.temp} °C</span></p>
                <p><span>💧 Kelembapan</span><span>${data.main.humidity} %</span></p>
                <p><span>🌬️ Angin</span><span>${data.wind.speed} m/s</span></p>
                <p><span>☁️ Cuaca</span><span>${weather}</span></p>
            `;
        })
        .catch(err => {
            console.error(err);
            alert("Gagal mengambil cuaca saat ini");
            hideAll();
        });
}

function getForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=en`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== "200") return;
            showForecast(data);
        })
        .catch(err => console.error(err));
}

function showForecast(data) {
    document.getElementById("forecastTitle").style.display = "block";
    document.getElementById("forecast").style.display = "grid";

    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "";

    data.list.slice(0, 8).forEach(item => {
        const time = item.dt_txt.split(" ")[1];
        const temp = item.main.temp.toFixed(2);
        const weather = translateWeather(item.weather[0].description);

        const div = document.createElement("div");
        div.className = "forecast-item";
        div.innerHTML = `
            <div class="time">${time}</div>
            <div class="temp">${temp}°C</div>
            <div class="desc">${weather}</div>
        `;

        forecastDiv.appendChild(div);
    });
}

function hideAll() {
    document.getElementById("currentTitle").style.display = "none";
    document.getElementById("currentWeather").style.display = "none";
    document.getElementById("forecastTitle").style.display = "none";
    document.getElementById("forecast").style.display = "none";
}
