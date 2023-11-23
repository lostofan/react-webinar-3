/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    // Задача №2: Добавляю в стейт поле с счетчиком ид
    this.state = { ...initState, idCounter: initState.list.length || 0 };
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
   * Добавление новой записи
   */
  addItem() {
    // Задача №2: Инкрементирую ид для уникальности
    this.state.idCounter += 1;
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        // Задача №2: Теперь в поле code отображается уникальный id
        // Задача №3: Добавил в стейт каунтер
        { code: this.state.idCounter, title: 'Новая запись', selectCounter: 0 },
      ],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          // Задача №3: Каунтер  увеличивается только при выделении, при снятии не работает
          !item.selected ? (item.selectCounter += 1) : false;
          item.selected = !item.selected;
        } else {
          // Задача №1: Селект только одной записи
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
