import List from "./List";
import ListUI from "./ListUI";
import Form from "./Form";
import FormUI from "./FormUI";
import BookUI from "./_BookUI";

export default class App {
  constructor(categories, priorityAmount) {
    this.list = new List(categories, priorityAmount);
    this.formUI = new FormUI(
      ".form_cnt",
      this.list.categories,
      this.list.priorityAmount,
      this.list.books
    );
    this.form = new Form();
    this.listUI = new ListUI(
      ".bookList_section",
      this.list.getFilters(this.list.filters),
      this.list.books,
      this.list.countCategories,
      this.form,
      this.list.filters
    );

    this.addBook();
    this.clearFormBtn();
    this.swtichCategoryInput();
    this.addCategoryBtn();
  }

  addBook() {
    this.form.addButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (!this.form.editFlag) {
        new BookUI().addBook(
          this.listUI.getTbody(),
          this.form,
          this.list.books,
          this.list.countCategories
        );
      } else {
        new BookUI().updateBook(this.form, this.list.books);
      }
    });
  }

  clearFormBtn() {
    this.form.clearButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.form.clearForm();
      new BookUI().clearEditFlag(
        document.querySelectorAll("[data-edit]"),
        true
      );
      new BookUI().clearEditFlag(this.list.books, false);

      this.form.addButton.textContent = "Add";
      this.form.addButton.className = "btn btn-success btn-add";
      delete this.form.editFlag;
    });
  }

  swtichCategoryInput() {
    this.form.categoryOptionLabel.addEventListener("click", (e) => {
      e.preventDefault();
      this.form.addCategoryInput.classList.toggle("active");
      this.form.categoryInput.classList.toggle("active");
      this.form.addCategoryButton.classList.toggle("active");
    });
  }

  addCategoryBtn() {
    this.form.addCategoryButton.addEventListener("click", (e) => {
      e.preventDefault();

      if (this.form.addCategory(this.list.categories)) {
        this.formUI.clearCategories(this.form.categorySelectCnt);
        this.formUI.renderCategories(
          this.list.categories,
          this.form.categorySelectCnt
        );
      }
    });
  }
}
