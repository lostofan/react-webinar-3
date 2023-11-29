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
  addToBasket(listItem) {
    //Получаем объект товара, если он уже есть в корзине
    const existingItem = this.state.basket.products.find(
      (item) => item.code === listItem.code
    );
    //Обновление стора, если добавляемый товар уже есть в корзине
    if (existingItem) {
      this.setState({
        ...this.state,
        basket: {
          ...this.state.basket,
          products: [
            ...this.state.basket.products.filter(
              (item) => item.code !== listItem.code
            ),
            { ...existingItem, amount: existingItem.amount + 1 },
          ],

          totalPrice: this.state.basket.totalPrice + listItem.price,
        },
      });
    } else {
      //Обновление стора, если добавляемого товара нет в корзине
      this.setState({
        ...this.state,
        basket: {
          ...this.state.basket,
          products: [...this.state.basket.products, { ...listItem, amount: 1 }],
          amount: this.state.basket.amount + 1,
          totalPrice: this.state.basket.totalPrice + listItem.price,
        },
      });
    }
  }
  /**
   * Удаление группы товаров из корзины
   * @param code
   */
  removeFromBasket(listItem) {
    //Получаем сумму цен всех товаров
    const fullPrice = listItem.amount * listItem.price;
    const rest = this.state.basket.products.filter(
      (item) => item.code !== listItem.code
    );
    this.setState({
      ...this.state,
      basket: {
        ...this.state.basket,
        products: [...rest],
        amount: this.state.basket.products.length - 1,
        totalPrice: this.state.basket.totalPrice - fullPrice,
      },
    });
  }
}

export default Store;
