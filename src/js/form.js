import Storage from "./_Storage";

export default class Form {
  constructor() {
    this.titleInput = document.getElementById("titleInput");
    this.authorInput = document.getElementById("authorInput");
    this.categoryInput = document.getElementById("categoryOptionSelect");
    this.priorityCheckBoxes = document.querySelectorAll(".form-check-input");

    this.formInputs = document.querySelectorAll("[data-role]");

    this.addButton = document.querySelector(".btn-add");
    this.clearButton = document.querySelector(".btn-clear");

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
  showErrorMsg(element, msg) {
    const errorElement = document.createElement("div");

    errorElement.className = "alert alert-danger";
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
      this.showErrorMsg(this.authorInput, "You should name the author");
      formErrors = true;
    } else {
      this.removeShowMsg(this.authorInput);
    }

    if (!this.isNotEmpty(this.titleInput)) {
      this.showErrorMsg(this.titleInput, "You should name the title");
      formErrors = true;
    } else {
      this.removeShowMsg(this.titleInput);
    }

    if (!this.isSelected()) {
      this.showErrorMsg(this.categoryInput, "Please choose category");
      formErrors = true;
    } else {
      this.removeShowMsg(this.categoryInput);
    }

    if (!this.isChecked()) {
      this.showErrorMsg(
        document.getElementById("priorityCheckBoxesCnt"),
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
    this.categoryInput.selectedIndex = null;

    for (const input of this.formInputs) {
      Storage.removeStorage(input.name);
    }

    for (let radio of this.priorityCheckBoxes) {
      radio.checked = false;
    }
  }

  setInputsStorage(inputs) {
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        Storage.setStorage(input.name, input.value);
      });
    });
  }

  getInputsStorage(inputs) {
    inputs.forEach((input) => {
      const isStorage = Storage.getStorage(input.name);
      if (isStorage && input.type === "radio") {
        const id = Storage.getStorage(input.name);
        document
          .getElementById(`inlineRadio${id}`)
          .setAttribute("checked", "checked");
      } else if (input.type !== "radio") {
        input.value = Storage.getStorage(input.name);
      } else return;
    });
  }
}
