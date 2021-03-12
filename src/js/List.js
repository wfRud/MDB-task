import Storage from "./_Storage";

export default class List {
  constructor(categories, priority) {
    const storageCategories = Storage.getStorage("categories");

    this.categories = storageCategories
      ? new Set(storageCategories)
      : new Set(categories);
    this.filters = {
      category: new Set(),
      author: new Set(),
      priority: new Set(),
    };
    this.tHeadsNames = ["Author", "Title", "Category", "Priority", "Actions"];
    this.priorityAmount = priority;

    const storageBooks = Storage.getStorage("Books");
    this.books = storageBooks ? storageBooks : [];
  }

  // *Book Method*//
  addBook(item) {
    this.books.push(item);
  }

  deleteBook(item) {
    this.books.splice(item.id, 1);
  }

  getBook(findID) {
    return this.books.find((item) => item.id === findID);
  }

  updateBook(id, data) {
    this.books.map((book) =>
      book.id === id ? Object.assign(book, data) : book
    );
  }

  resetId() {
    this.books.forEach((book, index) => (book.id = index));
  }

  // *Filter Method*//
  addFilter(filter, value) {
    this.filters[filter].add(value);
  }

  deleteFilter(filter) {
    for (let filters in this.filters) {
      this.filters[filters].delete(filter);
    }
  }

  hasFilters() {
    let flag = false;
    for (let filter in this.filters) {
      if (this.filters[filter].size) {
        flag = true;
        break;
      }
    }
    return flag;
  }

  //*Filter Books*//
  filterList() {
    const filterKeys = Object.keys(this.filters);
    return this.books.filter((eachObj) => {
      return filterKeys.every((eachKey) => {
        if (!this.filters[eachKey].size) {
          return true; // passing an empty filter means that filter is ignored.
        }
        return this.filters[eachKey].has(eachObj[eachKey]);
      });
    });
  }

  //* Sort Books *//
  sortBooks(arr, sortBy, mode) {
    const lowerCaseLetter = (txt) => {
      return txt.charAt(0).toLowerCase() + txt.slice(1);
    };

    return arr.sort((a, b) => {
      let x = a[lowerCaseLetter(sortBy)].toLowerCase(),
        y = b[lowerCaseLetter(sortBy)].toLowerCase();

      switch (mode) {
        case "asc":
          return x.localeCompare(y);

        case "desc":
          return y.localeCompare(x);

        default:
          return a.id - b.id;
      }
    });
  }

  searchObjects(key) {
    return key
      ? this.books.map((book) => book[key])
      : new Error("Enter search Value");
  }

  // countCategories(arr, search) {
  //   const categories = arr.map((book) => book.category);
  //   return categories.reduce((prev, next) => prev + (next === search), 0);
  // }

  // updateCategories(categories) {
  //   const storageCategories = Storage.getStorage("categories");
  //   storageCategories
  //     ? storageCategories.forEach((category) => categories.add(category))
  //     : null;
  // }
}
