import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../button";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function BasketListItem({ item, onRemoveFromBasket }) {
  const cn = bem("Item");
  const callbacks = {
    onRemoveFromBasket: () => {
      onRemoveFromBasket(item);
    },
  };

  return (
    <div className={cn()} onClick={callbacks.onClick}>
      <div className={cn("code")}>{item.code}</div>
      <div className={cn("title")}>{item.title}</div>
      <div className={cn("price")}>{item.price + " руб"}</div>
      <div className={cn("amount")}>{item.amount + " шт"}</div>
      <div className={cn("actions")}>
        <Button click={() => callbacks.onRemoveFromBasket(item)}>
          Удалить
        </Button>
      </div>
    </div>
  );
}

BasketListItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemoveFromBasket: PropTypes.func,
};

BasketListItem.defaultProps = {
  onAddToBasket: () => {},
};

export default React.memo(BasketListItem);
