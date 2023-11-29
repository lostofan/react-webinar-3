import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Button from "../button";
import Head from "../head";
import { cn as bem } from "@bem-react/classname";

function ModalLayout({ title, hadleShowModal, children }) {
  const cn = bem("ModalLayout");
  return (
    <div className={cn()}>
      <div className={cn("container")}>
        <div className={cn("head")}>
          <Head title={title} />
        </div>
        <div className={cn("button")}>
          <Button click={hadleShowModal}>Закрыть</Button>
        </div>
        <div className={cn("content")}>{children}</div>
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  title: PropTypes.string,
  hadleShowModal: PropTypes.func,
  children: PropTypes.node,
};
ModalLayout.defaultProps = {
  hadleShowModal: () => {},
};
export default React.memo(ModalLayout);
