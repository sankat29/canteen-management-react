import React from "react";

function Button(props) {
  const buttonClass = `btn btn-${props.color} ${props.btnClass}`;

  return (
    <React.Fragment>
      <button
        className={buttonClass}
        style={{ width: props.width }}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.label}
      </button>
    </React.Fragment>
  );
}

export default Button;
