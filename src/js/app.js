import Form from "./form";
import BookUI from "./_BookUI";
import Storage from "./_Storage";

export default class App {
  constructor() {
    this.books = Storage.getStorage("Books") ? Storage.getStorage("Books") : [];
    this.form = new Form();
    this.tBody = document.querySelector(".booksListCnt");

    this.renderStorage(this.tBody, this.books);

    this.form.addButton.addEventListener("click", (e) => {
      e.preventDefault();
      new BookUI(this.books).addBook(this.tBody, this.form, this.books);
    });

    this.form.clearButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.form.clearForm();
    });
  }

  renderStorage(cnt, arr) {
    arr.forEach((item) => new BookUI(this.books).renderBooks(cnt, item));
  }
}
