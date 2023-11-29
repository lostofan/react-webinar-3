import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

function List({ list, renderItem }) {
  const cn = bem("List");
  return (
    <ul className={cn()}>
      {list.map((item) => (
        <li key={item.code} className={cn("item")}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.any.isRequired,
  renderItem: PropTypes.func.isRequired,
};
List.defaultProps = {
  renderItem: () => {},
};

export default React.memo(List);
