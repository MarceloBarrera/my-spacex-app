import React from "react";
import cn from "classnames";
import "./Button.css";

const Button = ({ children, className, onClick }) => {
  return (
    <button onClick={onClick} className={cn(className, "button")}>
      {children}
    </button>
  );
};

export default Button;
