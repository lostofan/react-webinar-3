import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../button";
import { createPortal } from "react-dom";
import ModalLayout from "../modalLayout";
import BasketModal from "../basketModal";
import BasketCalc from "../basket-calc";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Controls({ basket, onRemoveFromBasket }) {
  const cn = bem("Controls");
  const basketStatus = basket.amount
    ? basket.amount + " товара" + " / " + basket.totalPrice + " руб"
    : " Пусто";
  const [showModal, setShowModal] = useState(false);

  const callbacks = {
    hadleShowModal: () => {
      setShowModal(!showModal);
    },
  };
  return (
    <div className={cn()}>
      <strong className={cn("basketStatus")}>В корзине: {basketStatus}</strong>
      <div className={cn("button")}>
        <Button click={callbacks.hadleShowModal}>Перейти</Button>
      </div>
      {showModal ? (
        //создаю модалку сразу в BODY приложения
        createPortal(
          <ModalLayout
            hadleShowModal={callbacks.hadleShowModal}
            title={"Корзина"}
            totalPrice={basket.totalPrice}
          >
            <BasketModal
              basket={basket}
              onRemoveFromBasket={onRemoveFromBasket}
            ></BasketModal>
            <BasketCalc totalPrice={basket.totalPrice} amount={basket.amount} />
          </ModalLayout>,
          document.body
        )
      ) : (
        <></>
      )}
    </div>
  );
}

Controls.propTypes = {
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

Controls.defaultProps = {
  onRemoveFromBasket: () => {},
};

export default React.memo(Controls);
