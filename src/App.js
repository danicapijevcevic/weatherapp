import React, { Component } from "react";
import Main from "./components/screens/Main";
import "./App.css";
import fall from "./assets/fall.jpg";
import winter from "./assets/winter.jpg";
import { convertHoursToDays, filterItems, getSeason, setMinMax } from "./utils";
import { fetchDaily, fetchSunriesSunset, fetchWeekValues } from "./api";
import { SEVEN_DAYS_HOURS } from "./utils/constants";

class App extends Component {
  constructor() {
    super();
    this.state = {
      days: null,
      today: null,
      current: null,
      week: null,
      sunriseSunset: null,
      city: "Belgrade",
      season: getSeason(),
    };
  }

  onGetCity(city) {
    this.setState({ city: city.name });
    this.fetchValues(city);
  }

  fetchValues(city) {
    // fetch Sunrise and Sunset
    fetchSunriesSunset({ lat: city.lat, lon: city.lng }, (res) =>
      this.setState({ sunriseSunset: res })
    );
    // fetch Daily Info
    fetchDaily({ lat: city.lat, lon: city.lng }, (res) =>
      this.setState({ current: res })
    );
    // fetch Week Values
    fetchWeekValues({ lat: city.lat, lon: city.lng }, (res) => {
      const hourly = res.hourly;
      const todayString = new Date().toISOString().slice(0, 10);
      const todayTime = {
        from: new Date(todayString).getTime(),
        to: new Date(todayString).getTime() + 24 * 60 * 60 * 1000,
      };

      const nextSevenDaysHours = hourly.time.slice(-SEVEN_DAYS_HOURS);
      const nextSevenDaysTemp = hourly.temperature_2m.slice(-SEVEN_DAYS_HOURS);
      const nextSevenDaysCode = hourly.weather_code.slice(-SEVEN_DAYS_HOURS);
      const sevenDaysValues = convertHoursToDays(
        nextSevenDaysHours,
        nextSevenDaysTemp,
        nextSevenDaysCode
      );

      const daily = hourly.time.map((item, index) =>
        new Date(item).getTime() >= todayTime.from &&
        new Date(item).getTime() <= todayTime.to
          ? { id: index, value: item }
          : null
      );

      const today = {
        temperature: setMinMax(filterItems(hourly.temperature_2m, daily)),
      };
      this.setState({ today: today, week: sevenDaysValues });
    });
  }
  componentDidMount() {
    this.fetchValues({ lat: 44.49, lng: 20.27, name: "Belgrade" });
  }
  render() {
    return (
      <div
        className="weatherapp-app"
        style={{
          backgroundImage: `url(${
            { winter: winter, autumn: fall, summer: fall, spring: fall }[
              this.state.season
            ]
          })`,
        }}
      >
        <div className="weatherapp-app-dark"></div>
        <Main
          days={this.state.days}
          today={this.state.today}
          current={this.state.current}
          week={this.state.week}
          sunriseSunset={this.state.sunriseSunset}
          city={this.state.city}
          getCity={this.onGetCity.bind(this)}
        />
      </div>
    );
  }
}

export default App;
