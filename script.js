const apiKey = "d9da4cc59b5c654bf1e12c497ca927c5";

const btn = document.getElementById("searchBtn");
const result = document.getElementById("weatherResult");

btn.addEventListener("click", getWeather);

function getWeather() {
    const city = document.getElementById("cityInput").value.trim();

    if (city === "") {
        result.innerHTML = "<p>❗ Masukkan nama kota</p>";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=id&appid=${apiKey}`;

    result.innerHTML = "<p>⏳ Mengambil data...</p>";

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data); // DEBUG WAJIB

            if (data.cod != 200) {
                result.innerHTML = "<p>❌ Kota tidak ditemukan</p>";
                return;
            }

            result.innerHTML = `
                <p><strong>${data.name}</strong></p>
                <p>🌡️ Suhu: ${data.main.temp} °C</p>
                <p>💧 Kelembapan: ${data.main.humidity} %</p>
                <p>🌬️ Angin: ${data.wind.speed} m/s</p>
                <p>☁️ Cuaca: ${data.weather[0].description}</p>
            `;
        })
        .catch(err => {
            console.error(err);
            result.innerHTML = "<p>⚠️ Gagal mengambil data</p>";
        });
}
