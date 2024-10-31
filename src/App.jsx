import { useState } from "react";
import "./App.css";
import Header from "./Header";
import Dashboard from "./Dashboard";
function App() {
  const [backgroundImage, setBackgroundImage] = useState(
    "url('./src/images/background.gif')"
  );
  const [weatherCardHidden, setCardHidden] = useState(true);
  const [weatherTemp, setTemp] = useState("");
  const [weatherHumidity, setHumidity] = useState("");
  const [weatherIcon, setIcon] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: "cover, contain", // İlk görsel tam ekran, ikincisi içerik boyutunda
        backgroundPosition: "center, center", // İki arka planın da ortalanması
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <Header />
      </div>
      <br />
      <div>
        <Dashboard
          setBackgroundImage={setBackgroundImage}
          setCardHidden={setCardHidden}
          setTemp={setTemp}
          setHumidity={setHumidity}
          setIcon={setIcon}
          setDescription={setDescription}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
          maxWidth: "600px",
          margin: "20px auto",
          padding: "20px",
          border: "1px solid #e0e0e0",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#136ee44f",
          gap: "10px",
        }}
        hidden={weatherCardHidden}
      >
        <div
          style={{
            flex: "1",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            alt="Weather Icon"
            style={{ width: "90px", height: "90px" }}
          />
          <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            {description.replace(/\b\w/g, (char) => char.toUpperCase())}
          </div>
        </div>
        <div style={{ flex: "1", textAlign: "center" }}>
          <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            Temperature <hr /> {weatherTemp}&deg;C
          </div>
        </div>
        <div style={{ flex: "1", textAlign: "center" }}>
          <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            Humidity <hr />
            {weatherHumidity}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
