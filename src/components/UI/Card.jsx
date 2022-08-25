import React from "react";

import classes from "./Card.module.css";

function Card(props) {
  const cardClass = `card ${classes.cardShadow}`;
  const titleClass = `card-title ${classes.cardGFTitle}`;
  return (
    <div
      className={cardClass}
      style={{
        width: "100%",
        backgroundColor: props.background,
        color: props.textColor,
        height: props.cardHeight,
      }}
    >
      <div className="card-body">
        <div className={classes.cardHeader}>
          <h5
            id={classes.cardTitleAnimate}
            className={
              props.useTitleClass ? titleClass : "card-title text-center"
            }
            style={{ textTransform: "uppercase" }}
          >
            {props.useTitleClass ? (
              props.title
            ) : (
              <small>
                <b> {props.title}</b>
              </small>
            )}
          </h5>
          <hr />
        </div>
        <div className={classes.cardContent}>{props.children}</div>
      </div>
    </div>
  );
}

export default Card;
