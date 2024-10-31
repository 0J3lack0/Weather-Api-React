import { useState } from "react";
import axios from "axios";
import { Input, Button } from "reactstrap";
import PropTypes from "prop-types";
import "./css/dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard({
  setBackgroundImage,
  setCardHidden,
  setTemp,
  setHumidity,
  setIcon,
  setDescription,
}) {
  const [charValue, setCharValue] = useState("");
  const [selectedCity, setSelectedCity] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [citiesData, setCitiesData] = useState([]);
  const BASE_URL = "http://localhost/get_city.php";

  const searchCity = async (e) => {
    setCharValue(e.target.value);
    const response = await axios.post(
      BASE_URL,
      { city_name: charValue },
      {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
    if (response.data.message === "No city found with name") {
      setCitiesData([{ id: 9999999, name: "No city found with name" }]);
    } else {
      const citiesData = await response.data.cities;
      //   console.log(citiesData);
      setCitiesData(citiesData);
    }
  };

  const postWeatherApi = async (cityData) => {
    const apiKey = "084fedb2ab5c8369b3a030eff24e4e74";
    const url = "https://api.openweathermap.org/data/2.5/weather?";
    const responseWeatherApi = await axios.get(
      `${url}lat=${cityData.lat}&lon=${cityData.lon}&units=metric&appid=${apiKey}`
    );
    const weatherData = await responseWeatherApi.data;
    // console.log("data:  ", weatherData);
    setCardHidden(false);
    setTemp(weatherData.main.temp);
    setHumidity(weatherData.main.humidity);
    setIcon(weatherData.weather[0].icon);
    setDescription(weatherData.weather[0].description);
    const weatherMain = weatherData.weather[0].main;
    if (weatherMain === "Clear") {
      setBackgroundImage("url('./src/images/clear.gif')");
    } else if (weatherMain === "Clouds") {
      setBackgroundImage("url('./src/images/cloud.gif')");
    } else if (weatherMain === "Snow") {
      setBackgroundImage(
        "url('./src/images/snow.gif'), url('./src/images/snow_background.jpg')"
      );
    } else if (weatherMain === "Rain" || weatherMain === "Drizzle") {
      setBackgroundImage(
        "url('./src/images/rain.gif'), url('./src/images/rain_background.jpg')"
      );
    } else if (weatherMain === "Thunderstorm") {
      setBackgroundImage("url('./src/images/storm.gif')");
    } else if (
      weatherMain === "Haze" ||
      weatherMain === "Mist" ||
      weatherMain === "Smoke"
    ) {
      setBackgroundImage("url('./src/images/haze.gif')");
    } else {
      setBackgroundImage("url('./src/images/background.gif')");
    }
  };

  return (
    <div className="dashboard">
      <div className="search">
        <Input
          type="text"
          placeholder="Lütfen bir şehir ismi yazın."
          onChange={(e) => {
            const inputValue = e.target.value;
            setCharValue(inputValue);

            if (inputValue.length > 2) {
              searchCity(e);
            }
            setIsSelected(false);
          }}
          value={charValue}
        />
        <Button color="primary" onClick={() => postWeatherApi(selectedCity)}>
          Search
        </Button>
        <Button color="success">Add Favorite</Button>
      </div>
      <div className="dropdown-content">
        {charValue && isSelected === false
          ? citiesData.map((city) => (
              <div
                key={city.id}
                className="dropdown-item" // Yeni sınıf ekledik
                onClick={() => {
                  setSelectedCity(city);
                  setIsSelected(true);
                  setCharValue(city.name);
                }}
              >
                {city.name} <hr />
              </div>
            ))
          : null}
        {/* {console.log("selected city:", selectedCity)} */}
      </div>
    </div>
  );
}
Dashboard.propTypes = {
  setBackgroundImage: PropTypes.func.isRequired,
  setCardHidden: PropTypes.func.isRequired,
  setTemp: PropTypes.func.isRequired,
  setHumidity: PropTypes.func.isRequired,
  setIcon: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
};
export default Dashboard;
