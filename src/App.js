import { useState } from "react";

const api = {
  key: "6704480e874351b2969e4f1d27a226f5",
  base: "http://api.openweathermap.org/data/2.5"
};

function App() {

  const[query, setQuery] = useState("");
  const[weather, setWeather] = useState("");

  const search = (event) => {
    if(event.code === "Enter"){

        fetch(`${api.base}/weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((response)=>{
          return response.json();
        })
        .then((response)=>{
          setWeather(response);
          setQuery("");
        })
      };
  };

  const dateBuilder = (now) => {
    const months = [
      "Ocak", "Şubat", "Mart", "Nisan",
      "Mayıs", "Haziran", "Temmuz", "Ağustos",
      "Eylül", "Ekim", "Kasım", "Aralık"
    ];
    const days = ["Pazar","Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

    let day = days[now.getDay()];
    let date = now.getDate()
    let month = months[now.getMonth()];
    let year = now.getFullYear();


    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={
      (typeof weather.main != "undefined")
        ? (weather.main.temp > 20)
          ? "app warm"
          : "app"
        : "app"
      }>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}>
          </input>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name} {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ("")
      }
      </main>
    </div>
  );
}

export default App;
