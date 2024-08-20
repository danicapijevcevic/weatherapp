import Icon from "../../atoms/Icons";
import { ExtraSmallText, MediumText } from "../../atoms/Typography";
import "./dailyinfo.style.scss";

const DailyInfo = (props) => {
  return (
    <div className="weatherapp-daily">
      <ExtraSmallText>{props.label} </ExtraSmallText>
      <Icon component={props.img} customClass={"weatherapp-daily-icon"} />
      <MediumText>{props.value} </MediumText>
      {props.currentinfo && (
        <ExtraSmallText>{props.currentinfo} </ExtraSmallText>
      )}
    </div>
  );
};

export default DailyInfo;
