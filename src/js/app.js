import Book from "./Book";
import Form from "./Form";
import FormUI from "./FormUI";
import BookUI from "./_BookUI";
import Storage from "./_Storage";

export default class App {
  constructor(categories, priorityAmount) {
    this.categories = new Set(categories);
    this.priorityAmount = priorityAmount;

    this.updateCategories(this.categories);

    this.formUI = new FormUI(".form_cnt", this.categories, this.priorityAmount);
    this.form = new Form();

    this.books = Storage.getStorage("Books") ? Storage.getStorage("Books") : [];

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

    this.form.categoryOptionLabel.addEventListener("click", (e) => {
      e.preventDefault();
      this.form.addCategoryInput.classList.toggle("active");
      this.form.categoryInput.classList.toggle("active");
      this.form.addCategoryButton.classList.toggle("active");
    });

    this.form.addCategoryButton.addEventListener("click", (e) => {
      e.preventDefault();

      if (this.form.addCategory(this.categories)) {
        this.formUI.clearCategories(this.form.categorySelectCnt);
        this.formUI.renderCategories(
          this.categories,
          this.form.categorySelectCnt
        );
      }
    });
  }

  renderCards(cnt, arr, form) {
    arr.forEach((item) => {
      new BookUI().renderBooks(cnt, item, arr, form);
    });
  }

  updateCategories(categories) {
    const storageCategories = Storage.getStorage("categories");
    storageCategories
      ? storageCategories.forEach((category) => categories.add(category))
      : null;
  }
}
