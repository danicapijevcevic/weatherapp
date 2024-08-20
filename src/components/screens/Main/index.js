import { WiSunrise, WiSunset } from "weather-icons-react";
import CurrentWeatherInfo from "../../molecules/CurrentWeatherInfo";
import DailyInfo from "../../molecules/DailyInfo";
import CurrentTemperature from "../../organisms/CurrentTemperature";
import { useState, useEffect } from "react";
import { getIcon } from "../../../utils/iconstyle";
import { days } from "../../../utils";
import Search from "../../organisms/Search";
import Hour from "../../molecules/Hour";
import json from "../../../utils/weather_codes.json";
import { todayInfoValues } from "../../../utils/values";
import "./main.style.scss";

const Main = (props) => {
  const [todayinfo, setTodayinfo] = useState(todayInfoValues);
  const [currentDay] = useState(new Date().toString().slice(0, 10));
  const [currentInfo, setCurrentInfo] = useState(null);
  const [hours, setHours] = useState(null);

  useEffect(() => {
    props.today && setCurrentInfo((prev) => ({ ...prev, ...props.today }));
  }, [props.today]);

  useEffect(() => {
    props.week && setHours(props.week[0].hours);
  }, [props.week]);

  useEffect(() => {
    if (!props.current) return;
    setCurrentInfo((prev) => ({
      ...prev,
      ...props.current,
      description:
        json[props.current.current.weather_code][
          props.current.current.is_day ? "day" : "night"
        ].description,
    }));

    setTodayinfo((prev) =>
      prev.map((item) => ({
        ...item,
        value: {
          1: props.current.current.relative_humidity_2m + "%",
          2: props.current.current.surface_pressure + " mbar",
          3: props.current.current.precipitation * 100 + "%",
          4: props.current.current.wind_speed_10m + " km/h",
        }[item.id],
      }))
    );
  }, [props.current]);

  return (
    <div className="weatherapp-main">
      <Search getCity={props.getCity} />
      <div className={"weatherapp-main-top"}>
        <div>
          {props.sunriseSunset && (
            <div>
              <CurrentWeatherInfo
                img={<WiSunrise size={35} />}
                label={"sunrise"}
                value={props.sunriseSunset.results.sunrise}
              />
              <CurrentWeatherInfo
                img={<WiSunset size={35} />}
                label={"sunset"}
                value={props.sunriseSunset.results.sunset}
              />
            </div>
          )}
        </div>
        <div>
          {currentInfo && (
            <CurrentTemperature
              city={props.city}
              img={getIcon(
                currentInfo.current.weather_code,
                70,
                currentInfo.current.is_day
              )}
              label={currentInfo?.description}
              temperature={currentInfo.current.temperature_2m + "°C"}
              min={currentInfo?.temperature?.min}
              max={currentInfo?.temperature?.max}
              currentDay={currentDay}
            />
          )}
        </div>

        <div className="weatherapp-main-current">
          {todayinfo.map((item) => (
            <CurrentWeatherInfo
              img={item.img}
              label={item.label}
              value={item.value}
              key={item.id}
            />
          ))}
        </div>
      </div>
      <div className="weatherapp-main-hours">
        <div className="weatherapp-gradient-left" />
        <div className="weatherapp-main-hours-container">
          {hours?.map((item) => (
            <Hour
              key={item.time}
              time={item.time}
              temp={item.temp}
              img={getIcon(item.code, 25, 1)}
            />
          ))}
        </div>
      </div>
      <div className={"weatherapp-main-bottom"}>
        {props.week?.map((item) => (
          <DailyInfo
            key={item.day}
            label={days[item.day]}
            img={getIcon(item.weathercode, 35, 1)}
            value={item.max + "°C"}
            currentinfo={item.min + "°C"}
          />
        ))}
      </div>
    </div>
  );
};

export default Main;
