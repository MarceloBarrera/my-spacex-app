import React, { ReactChild, ReactChildren } from "react";
import cn from "classnames";
import "./Button.css";

export interface LayoutProps {
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
  className?: string;
  onClick: () => void;
}

const Button = ({ children, className, onClick }: LayoutProps) => {
  return (
    <button onClick={onClick} className={cn(className, "button")}>
      {children}
    </button>
  );
};

export default Button;
