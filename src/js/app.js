import Book from "./Book";
import Form from "./form";
import BookUI from "./_BookUI";
import Storage from "./_Storage";

export default class App {
  constructor() {
    this.books = Storage.getStorage("Books") ? Storage.getStorage("Books") : [];
    this.form = new Form();
    this.tBody = document.querySelector(".booksListCnt");

    this.renderCards(this.tBody, this.books, this.form);

    this.form.addButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (!this.form.editFlag) {
        new BookUI().addBook(this.tBody, this.form, this.books);
      } else {
        new BookUI().updateBook(this.form, this.books);
      }
    });

    this.form.clearButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.form.clearForm();
      new BookUI().clearEditFlag(
        document.querySelectorAll("[data-edit]"),
        true
      );
      new BookUI().clearEditFlag(this.books, false);

      this.form.addButton.textContent = "Add";
      this.form.addButton.className = "btn btn-success btn-add";
      delete this.form.editFlag;
    });
  }

  renderCards(cnt, arr, form) {
    arr.forEach((item) => {
      new BookUI().renderBooks(cnt, item, arr, form);
    });
  }
}
