import "./typography.style.scss";

export const LargeText = (props) => {
  return <h1 className={"weatherapp-h1"}>{props.children} </h1>;
};

export const MediumText = (props) => {
  return <p className={"weatherapp-p"}>{props.children} </p>;
};

export const SmallText = (props) => {
  return (
    <p style={props.style} className={"weatherapp-small"}>
      {props.children}{" "}
    </p>
  );
};

export const ExtraSmallText = (props) => {
  return <p className={"weatherapp-extra-small"}>{props.children} </p>;
};
