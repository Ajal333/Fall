import React, { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { Input, Button, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import Searching from "./Assets/search.svg";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [weatherIcon, setWeatherIcon] = useState();
  const [weatherDataMain, setWeatherDataMain] = useState();
  const [weather, setWeather] = useState([]);
  const [wind, setWind] = useState([]);
  const [data, setData] = useState(false);

  const dataCss = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  };

  const search = () => {
    console.log(searchValue);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=a1595a21bdd184196d3b23e71546a6be&units=metric`;
    axios
      .get(url)
      .then((doc) => {
        console.log(doc.data);
        const iconcode = doc.data.weather[0].icon;
        setWeatherIcon(`https://openweathermap.org/img/wn/${iconcode}@2x.png`);
        setWeatherDataMain(doc.data.main);
        setWeatherData(doc.data);
        setWeather(doc.data.weather[0]);
        setWind(doc.data.wind);
        setData(true);
      })
      .catch((err) => console.log(err));
    setSearchValue("");
  };

  return (
    <div className="base">
      <div className="search">
        <Input
          className="searchBarStyle"
          suffix={
            <Link to="/filter">
              <Button shape="circle" size="small" />
            </Link>
          }
          prefix={<SearchOutlined style={{ color: "black", fontSize: 20 }} />}
          size="default"
          placeholder="Search...."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onPressEnter={search}
        />
      </div>
      {!data ? (
        <div className="imageHolder">
          <img className="searchingImage" src={Searching} alt="searching" />
        </div>
      ) : (
        <div className="cardHolder">
          <Card className="weatherCard">
            <div className="placeName">{weatherData.name}</div>
            <div className="tempDisplay">
              {!weatherDataMain ? null : (
                <div className="tempDigit">
                  {weatherDataMain.temp}
                  <span>&#176;</span>
                  <div style={{ fontSize: 15 }}>
                    Feels Like: {weatherDataMain.feels_like}
                    <span>&#176;</span>
                  </div>
                </div>
              )}
              {!weatherIcon ? null : (
                <div>
                  <img
                    className="weatherImage"
                    src={weatherIcon}
                    alt="weatherIcon"
                  />
                  <p style={{ textTransform: "capitalize" }}>
                    {weather.description}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
      {!weatherDataMain ? null : (
        <div className="statsHolder">
          <div className="statsBox">
            <div style={dataCss}>
              <div>Max temp</div>{" "}
              <div>
                {weatherDataMain.temp_max}
                <span>&#176;</span>
              </div>
            </div>
            <div style={dataCss}>
              <div>Min temp</div>{" "}
              <div>
                {weatherDataMain.temp_min}
                <span>&#176;</span>
              </div>
            </div>
            <div style={dataCss}>
              <div>Humidity</div> <div>{weatherDataMain.humidity}</div>
            </div>
            <div style={dataCss}>
              <div>Wind speed</div> <div>{wind.speed}</div>
            </div>
            <div style={dataCss}>
              <div>Wind direction</div>{" "}
              <div>
                {wind.deg}
                <span>&#176;</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
