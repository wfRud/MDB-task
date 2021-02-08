import Storage from "./_Storage";

export default class Form {
  constructor() {
    this.titleInput = document.getElementById("titleInput");
    this.authorInput = document.getElementById("authorInput");

    this.categorySelectCnt = document.getElementById("categoryOptionSelect");
    this.categoryInput = document.getElementById("categoryOptionSelect");
    this.addCategoryInput = document.getElementById("addCategory");
    this.categoryOptionLabel = document.querySelector(
      "[for=categoryOptionSelect]"
    );

    this.priorityCheckBoxes = document.querySelectorAll(".form-check-input");

    this.formInputs = document.querySelectorAll("[data-role]");

    this.addButton = document.querySelector(".btn-add");
    this.clearButton = document.querySelector(".btn-clear");
    this.addCategoryButton = document.querySelector(".btn-add-category");

    this.setInputsStorage(this.formInputs);
    this.getInputsStorage(this.formInputs);
  }

  isNotEmpty(field) {
    const regex = /^[^\s].+[^\s]$/g;
    return field.value !== "" && regex.test(field.value);
  }

  isChecked() {
    const isChecked = document.querySelector("[name=priority]:checked");
    return isChecked;
  }

  isSelected() {
    return this.categoryInput.options[this.categoryInput.selectedIndex]
      .value !== "Choose..."
      ? true
      : false;
  }

  showMsg(element, type, msg) {
    const errorElement = document.createElement("div");

    errorElement.className = `alert alert-${type}`;
    errorElement.textContent = msg;

    this.removeShowMsg(element);
    element.parentNode.insertBefore(errorElement, element);
  }

  removeShowMsg(element) {
    if (element.previousElementSibling.classList.contains("alert")) {
      element.previousElementSibling.remove();
    } else return;
  }

  isValid() {
    let formErrors = false;

    if (!this.isNotEmpty(this.authorInput)) {
      this.showMsg(this.authorInput, "danger", "You should name the author");
      formErrors = true;
    } else {
      this.removeShowMsg(this.authorInput);
    }

    if (!this.isNotEmpty(this.titleInput)) {
      this.showMsg(this.titleInput, "danger", "You should name the title");
      formErrors = true;
    } else {
      this.removeShowMsg(this.titleInput);
    }

    if (!this.isSelected()) {
      this.showMsg(this.categoryInput, "danger", "Please choose category");
      formErrors = true;
    } else {
      this.removeShowMsg(this.categoryInput);
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

  clearForm() {
    this.titleInput.value = "";
    this.authorInput.value = "";
    this.addCategoryInput.value = "";
    this.categoryInput.selectedIndex = null;

    for (const input of this.formInputs) {
      Storage.removeStorage(input.name);
    }

    for (let radio of this.priorityCheckBoxes) {
      radio.checked = false;
    }
  }

  clearRadioButton() {
    this.priorityCheckBoxes.forEach((item) => {
      item.removeAttribute("checked");
    });
  }

  addCategory(categories) {
    const capitalLetter = (txt) => {
      return txt.charAt(0).toUpperCase() + txt.slice(1);
    };
    let added = false;
    const newCategory = capitalLetter(this.addCategoryInput.value);
    if (!categories.has(newCategory)) {
      categories.add(newCategory);
      this.showMsg(
        this.addCategoryInput,
        "success",
        "You've added new category"
      );
      this.addCategoryInput.classList.toggle("active");
      this.categoryInput.classList.toggle("active");
      this.addCategoryButton.classList.toggle("active");

      Storage.removeStorage("addCategory");
      Storage.setStorage("categories", [...categories]);

      this.addCategoryInput.value = "";
      setTimeout(() => this.removeShowMsg(this.addCategoryInput), 2000);
      added = true;
    } else {
      this.showMsg(
        this.addCategoryInput,
        "warning",
        "The category has already exist, enter another."
      );
      setTimeout(() => this.removeShowMsg(this.addCategoryInput), 2000);
    }
    return added;
  }

  setInputsStorage(inputs) {
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        Storage.setStorage(input.name, input.value);

        this.categoryInput.classList.contains("active")
          ? Storage.removeStorage("addCategory")
          : null;
        this.addCategoryInput.classList.contains("active")
          ? Storage.removeStorage("category")
          : null;
      });
    });
  }

  getInputsStorage(inputs) {
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
}
