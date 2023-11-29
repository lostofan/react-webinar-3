import React, { useCallback } from "react";
import PropTypes from "prop-types";
import "./style.css";
import List from "../list";
import BasketListItem from "../basket-list-item";

function BasketModal({ basket, onRemoveFromBasket }) {
  const callbacks = {
    renderItem: useCallback((basket) => {
      return (
        <BasketListItem item={basket} onRemoveFromBasket={onRemoveFromBasket} />
      );
    }, []),
  };
  return <List list={basket.products} renderItem={callbacks.renderItem} />;
}

BasketModal.propTypes = {
  basket: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number,
        code: PropTypes.number,
        price: PropTypes.number,
        title: PropTypes.string,
      }).isRequired
    ),
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
  onRemoveFromBasket: PropTypes.func.isRequired,
};
BasketModal.defaultProps = {
  onAddToBasket: () => {},
};
export default React.memo(BasketModal);
