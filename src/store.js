import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    //Добавляем в стейт объект с корзиной
    this.state.basket = { products: [], amount: 0, totalPrice: 0 };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   * @param code
   */
  addToBasket(code) {
    //Получаем код товара, если он уже есть в корзине
    const currentProduct = this.state.list.find((item) => item.code === code);
    const basketAmount = this.state.basket.products.find(
      (item) => item.code === code
    )?.amount;
    //Обновление стора, если добавляемый товар уже есть в корзине
    if (basketAmount) {
      this.setState({
        ...this.state,
        basket: {
          ...this.state.basket,
          products: [
            ...this.state.basket.products.filter((item) => item.code !== code),
            { ...currentProduct, amount: basketAmount + 1 },
          ],
          totalPrice: this.state.basket.totalPrice + currentProduct.price,
        },
      });
    } else {
      //Обновление стора, если добавляемого товара нет в корзине
      this.setState({
        ...this.state,
        basket: {
          ...this.state.basket,
          products: [
            ...this.state.basket.products,
            { ...currentProduct, amount: 1 },
          ],
          amount: this.state.basket.amount + 1,
          totalPrice: this.state.basket.totalPrice + currentProduct.price,
        },
      });
    }
  }
  /**
   * Удаление группы товаров из корзины
   * @param code
   */
  removeFromBasket(code) {
    //Получаем объект продукта в корзине
    const currentProduct = this.state.basket.products.find(
      (item) => item.code === code
    );
    //Получаем сумму цен всех товаров
    const fullPrice = currentProduct.amount * currentProduct.price;
    const rest = this.state.basket.products.filter(
      (item) => item.code !== code
    );
    this.setState({
      ...this.state,
      basket: {
        ...this.state.basket,
        products: [...rest],
        amount: rest.length,
        totalPrice: this.state.basket.totalPrice - fullPrice,
      },
    });
  }
}

export default Store;
