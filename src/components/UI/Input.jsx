import React from "react";

function Input(props) {
  const inputClasses = `form-control input-sm ${props.class}`;
  return (
    <React.Fragment>
      <input
        type={props.type}
        id={props.id}
        className={inputClasses}
        placeholder={props.placeholder}
        onKeyUp={props.onKeyUp}
      />
    </React.Fragment>
  );
}

export default Input;
