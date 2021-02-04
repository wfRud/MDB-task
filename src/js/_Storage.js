export default class Storage {
    static setStorage(itemName, value) {
      const parseValue = JSON.stringify(value);
      localStorage.setItem(itemName, parseValue);
    }
    static getStorage(itemName) {
      if (localStorage.getItem(itemName) !== null) {
        return JSON.parse(localStorage.getItem(itemName));
      } else return "";
    }
    static removeStorage(itemName) {
      localStorage.removeItem(itemName);
    }
  
    static clearAllStorage() {
      localStorage.clear();
    }
  }
  