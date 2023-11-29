import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

function Button({ click, children }) {
  const cn = bem("Button");
  return (
    <div className={cn()}>
      <button onClick={() => click()}>{children}</button>
    </div>
  );
}

Button.propTypes = {
  click: PropTypes.func,
  children: PropTypes.node,
};
Button.defaultProps = {
  click: () => {},
};
export default React.memo(Button);
