import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../button";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { formatPrice } from "../../utils";

function BasketListItem({ item, onRemoveFromBasket }) {
  const cn = bem("BasketItem");
  const callbacks = {
    handleRemoveFromBasket: () => {
      onRemoveFromBasket(item.code);
    },
  };

  return (
    <div className={cn()} onClick={callbacks.onClick}>
      <div className={cn("code")}>{item.code}</div>
      <div className={cn("title")}>{item.title}</div>
      <div className={cn("price")}>{formatPrice(item.price)}</div>
      <div className={cn("amount")}>{item.amount + " шт"}</div>
      <div className={cn("actions")}>
        <Button click={callbacks.handleRemoveFromBasket}>Удалить</Button>
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
