const Input = (props) => {
  return (
    <input
      value={props.value}
      placeholder="Search location"
      onChange={props.onChange}
    />
  );
};

export default Input;
