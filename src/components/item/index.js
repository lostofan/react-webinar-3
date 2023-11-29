import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import Button from "../button";
import { cn as bem } from "@bem-react/classname";
function Item({ item, onAddToBasket }) {
  const cn = bem("Item");
  const callbacks = {
    onAddToBasket: () => {
      onAddToBasket(item);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn("code")}>{item.code}</div>
      <div className={cn("title")}>{item.title}</div>
      <div className={cn("price")}>{item.price + " руб"}</div>
      <div className={cn("actions")}>
        <Button click={callbacks.onAddToBasket}>Добавить</Button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAddToBasket: PropTypes.func.isRequired,
};

Item.defaultProps = {
  onAddToBasket: () => {},
};

export default React.memo(Item);
