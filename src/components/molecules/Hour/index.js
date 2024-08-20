import Icon from "../../atoms/Icons";
import { ExtraSmallText, SmallText } from "../../atoms/Typography";
import "./hour.style.scss";

const Hour = (props) => {
  return (
    <div className="weatherapp-hour">
      <ExtraSmallText>{props.time} </ExtraSmallText>
      <Icon component={props.img} customClass={"weatherapp-daily-icon"} />
      <SmallText>{props.temp} </SmallText>
    </div>
  );
};

export default Hour;
