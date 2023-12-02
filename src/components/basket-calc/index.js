import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { formatPrice } from "../../utils";
import "./style.css";
function BasketCalc({ totalPrice, amount }) {
  const cn = bem("BasketCalc");
  return (
    <>
      {amount ? (
        <div className={cn()}>
          <strong className={cn("text")}>Итого </strong>
          <strong className={cn("text")}>{formatPrice(totalPrice)}</strong>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

BasketCalc.propTypes = {
  totalPrice: PropTypes.number,
  amount: PropTypes.number,
};

export default React.memo(BasketCalc);
