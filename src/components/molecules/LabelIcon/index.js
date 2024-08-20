import Icon from "../../atoms/Icons";
import "./labelicon.style.scss";

const LabelIcon = (props) => {
  return (
    <div className={`weatherapp-labelicon ${props.customClass || ""}`}>
      <Icon component={props.component} />
      <div className="weatherapp-labelicon-label">{props.label} </div>
    </div>
  );
};

export default LabelIcon;
