import Storage from "./_Storage";

export default class Form {
  static getInputsForm() {
    return document.querySelectorAll("[data-role=form-input]");
  }

  static getTitleInput() {
    return document.getElementById("titleInput");
  }

  static getAuthorInput() {
    return document.getElementById("authorInput");
  }

  static getCategoryOptionLabel() {
    return document.querySelector('[for="categoryOptionSelect"]');
  }

  static getCategoryInput() {
    return document.getElementById("categoryOptionSelect");
  }

  static getAddCategoryInput() {
    return document.getElementById("addCategory");
  }

  static getAddCategoryBtn() {
    return document.getElementById("addCategory-btn");
  }

  static getPriorityRadio(priority) {
    return document.getElementById(`inlineRadio${priority}`);
  }

  static getAddBtn() {
    return document.getElementById("add-btn");
  }

  static isNotEmpty(field) {
    const regex = /^[^\s].+[^\s]$/g;
    return field.value !== "" && regex.test(field.value);
  }

  static isChecked() {
    const isChecked = document.querySelector("[name=priority]:checked");
    return isChecked;
  }

  static isSelected() {
    return this.getCategoryInput().options[
      this.getCategoryInput().selectedIndex
    ].value !== ""
      ? true
      : false;
  }

  static showMsg(element, type, msg) {
    const errorElement = document.createElement("div");

    errorElement.className = `alert alert-${type}`;
    errorElement.textContent = msg;

    this.removeShowMsg(element);
    element.parentNode.insertBefore(errorElement, element);
  }

  static removeShowMsg(element) {
    if (element.previousElementSibling.classList.contains("alert")) {
      element.previousElementSibling.remove();
    } else return;
  }

  static isValid() {
    let formErrors = false;

    if (!this.isNotEmpty(this.getAuthorInput())) {
      this.showMsg(
        this.getAuthorInput(),
        "danger",
        "You should name the author"
      );
      formErrors = true;
    } else {
      this.removeShowMsg(this.getAuthorInput());
    }

    if (!this.isNotEmpty(this.getTitleInput())) {
      this.showMsg(this.getTitleInput(), "danger", "You should name the title");
      formErrors = true;
    } else {
      this.removeShowMsg(this.getTitleInput());
    }

    if (!this.isSelected()) {
      this.showMsg(this.getCategoryInput(), "danger", "Please choose category");
      formErrors = true;
    } else {
      this.removeShowMsg(this.getCategoryInput());
    }

    if (!this.isChecked()) {
      this.showMsg(
        document.getElementById("priorityCheckBoxesCnt"),
        "danger",
        "Please set the priority"
      );
      formErrors = true;
    } else {
      this.removeShowMsg(document.getElementById("priorityCheckBoxesCnt"));
    }

    return !formErrors ? true : false;
  }

  static setEditForm(props) {
    const { author, title, category, priority } = props;

    Form.getAuthorInput().value = author;
    Form.getTitleInput().value = title;
    Form.getCategoryInput().value = category;
    Form.getPriorityRadio(priority).checked = true;

    Form.getAddBtn().textContent = "Edit";
    Form.getAddBtn().dataset.action = "edit";
    Form.getAddBtn().className = "btn btn-warning btn-edit";
  }

  static setDefaultForm() {
    Form.getAddBtn().textContent = "Add";
    Form.getAddBtn().dataset.action = "add";
    Form.getAddBtn().className = "btn btn-success btn-add";
  }

  static getData() {
    if (this.isValid()) {
      return {
        title: this.getTitleInput().value,
        author: this.getAuthorInput().value,
        category: this.getCategoryInput().value,
        priority: this.isChecked().value,
      };
    } else return null;
  }

  static clearForm() {
    this.getTitleInput().value = "";
    this.getAuthorInput().value = "";
    this.getCategoryInput().value = "";
    this.getAddCategoryInput().value = "";
    this.isChecked() ? (this.isChecked().checked = false) : null;
  }

  static addCategory(categories) {
    let added = false;
    const capitalLetter = (txt) => {
      return txt.charAt(0).toUpperCase() + txt.slice(1);
    };
    const newCategory = capitalLetter(this.getAddCategoryInput().value);
    if (!categories.has(newCategory)) {
      categories.add(newCategory);
      this.showMsg(
        this.getAddCategoryInput(),
        "success",
        "You've added new category"
      );
      this.getAddCategoryInput().classList.toggle("active");
      this.getCategoryInput().classList.toggle("active");
      this.getAddCategoryBtn().classList.toggle("active");

      Storage.removeStorage("addCategory");
      Storage.setStorage("categories", [...categories]);

      this.getAddCategoryInput().value = "";
      setTimeout(() => this.removeShowMsg(this.getAddCategoryInput()), 2000);
      added = true;
    } else {
      Form.showMsg(
        this.getAddCategoryInput(),
        "warning",
        "The category has already exist, enter another."
      );
      setTimeout(() => this.removeShowMsg(this.getAddCategoryInput()), 2000);
    }
    return added;
  }

  static setInputsStorage(inputs) {
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        Storage.setStorage(input.name, input.value);

        this.getCategoryInput().classList.contains("active")
          ? Storage.removeStorage("addCategory")
          : null;
        this.getAddCategoryInput().classList.contains("active")
          ? Storage.removeStorage("category")
          : null;
      });
    });
  }

  static getInputsStorage(inputs) {
    inputs.forEach((input) => {
      const isStorage = Storage.getStorage(input.name);
      if (isStorage && input.type === "radio") {
        const priority = Storage.getStorage(input.name);
        document.getElementById(`inlineRadio${priority}`).checked = true;
      } else if (input.type !== "radio") {
        input.value = Storage.getStorage(input.name);
      } else return;
    });
  }

  static clearStorage(inputs) {
    inputs.forEach((input) => Storage.removeStorage(input.name));
  }
}
