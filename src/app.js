import React, { useCallback } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Item from "./components/item";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const basket = store.getState().basket;
  const callbacks = {
    renderItem: useCallback((item) => {
      return <Item item={item} onAddToBasket={callbacks.onAddToBasket} />;
    }, []),
    onAddToBasket: useCallback(
      (code) => {
        store.addToBasket(code);
      },
      [store]
    ),
    onRemoveFromBasket: useCallback(
      (code) => {
        store.removeFromBasket(code);
      },
      [store]
    ),
  };
  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        basket={basket}
        onRemoveFromBasket={callbacks.onRemoveFromBasket}
      />
      <List list={list} renderItem={callbacks.renderItem} />
    </PageLayout>
  );
}

export default App;
