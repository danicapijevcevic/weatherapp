import Icon from "../../atoms/Icons";
import { ExtraSmallText, SmallText } from "../../atoms/Typography";
import "./currentinfo.style.scss";

const CurrentWeatherInfo = (props) => {
  return (
    <div className="weatherapp-currentinfo">
      <Icon component={props.img} />
      <div className={"weatherapp-currentinfo-label"}>
        <ExtraSmallText>{props.label}</ExtraSmallText>
        <SmallText>{props.value}</SmallText>
      </div>
    </div>
  );
};

export default CurrentWeatherInfo;
