import Form from "./_form";
import BookUI from "./_bookUI";

export default class App {
  constructor() {
    this.books = [];

    this.form = new Form();
    this.tBody = document.querySelector(".booksListCnt");

    this.form.addButton.addEventListener("click", (e) => {
      e.preventDefault();
      new BookUI(this.books).addBook(this.tBody, this.form, this.books);
    });

    this.form.clearButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.form.clearForm();
    });
  }
}
