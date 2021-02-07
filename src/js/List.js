import Storage from "./_Storage";
import Book from "./Book";

export default class List {
  constructor(categories, priority) {
    this.categories = new Set(categories);
    this.books = Storage.getStorage("Books") ? Storage.getStorage("Books") : [];
    this.priorityAmount = priority;
    this.filters = ["category", "author", "priority"];

    this.updateCategories(this.categories);
    this.countCategories();
  }

  getFilters(filters) {
    return filters.map((filter) => {
      const obj = {
        name: filter,
        filters: this.searchObjects(filter),
      };
      return obj;
    });
  }

  searchObjects(key) {
    return key
      ? this.books.map((book) => book[key])
      : new Error("Enter search Value");
  }

  countCategories() {
    this.books.reduce((prev, next) => {
      console.log(prev);
      console.log(next);
    });
  }

  updateCategories(categories) {
    const storageCategories = Storage.getStorage("categories");
    storageCategories
      ? storageCategories.forEach((category) => categories.add(category))
      : null;
  }
}
