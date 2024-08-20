import { ExtraSmallText, LargeText, SmallText } from "../../atoms/Typography";
import LabelIcon from "../../molecules/LabelIcon";

const CurrentTemperature = (props) => {
  return (
    <div className="weatherapp-center">
      <SmallText style={{ fontSize: 35 }}>{props.city}</SmallText>
      <ExtraSmallText>{props.currentDay} </ExtraSmallText>
      <LabelIcon component={props.img} label={props.label} />
      <SmallText>
        {props.min} / {props.max}
      </SmallText>
      <LargeText>{props.temperature}</LargeText>
    </div>
  );
};

export default CurrentTemperature;
