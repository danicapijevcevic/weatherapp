import { useEffect, useState } from "react";
import Input from "../../atoms/Input";
import cities from "cities.json";
import { ExtraSmallText } from "../../atoms/Typography";
import "./search.style.scss";

const Search = (props) => {
  const [searchCities, setSearchCities] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    const value = e.currentTarget.value;
    setSearchValue(value);
    value.length >= 3 &&
      setSearchCities(
        cities.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      );
  };

  const handleClickCity = (city) => () => {
    props.getCity(city);
    setSearchCities(null);
    setSearchValue(city.name);
  };
  useEffect(() => {
    const click = () => {
      setSearchCities(null);
    };
    window.addEventListener("click", click);

    return () => {
      window.removeEventListener("click", click);
    };
  }, []);

  return (
    <div className="weatherapp-search">
      <Input onChange={handleSearch} value={searchValue} />
      {searchCities && searchCities[0] && (
        <div className="weatherapp-search-items">
          {searchCities?.map((item, index) => (
            <div
              key={item.name + item.country + index}
              className="weatherapp-search-item"
              onClick={handleClickCity(item)}
            >
              <ExtraSmallText>
                {item.name.slice(0, 20)} ({item.country})
              </ExtraSmallText>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
