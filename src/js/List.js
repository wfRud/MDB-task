import Storage from "./_Storage";
import Book from "./Book";

export default class List {
  constructor(categories, priority) {
    this.categories = new Set(categories);
    this.books = Storage.getStorage("Books") ? Storage.getStorage("Books") : [];
    this.priorityAmount = priority;
    this.filters = ["category", "author", "priority"];

    this.updateCategories(this.categories);
    // console.log(this.countCategories(this.books, "Fantasy"));
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

  countCategories(arr, search) {
    const categories = arr.map((book) => book.category);
    return categories.reduce((prev, next) => prev + (next === search), 0);
  }

  updateCategories(categories) {
    const storageCategories = Storage.getStorage("categories");
    storageCategories
      ? storageCategories.forEach((category) => categories.add(category))
      : null;
  }
}
