import "./icon.style.scss";

const Icon = (props) => {
  return (
    <div className={`weatherapp-icon ${props.customClass}`}>
      {props.component}
    </div>
  );
};

export default Icon;
