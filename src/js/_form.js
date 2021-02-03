export default class Form {
  constructor() {
    this.titleInput = document.getElementById("titleInput");
    this.authorInput = document.getElementById("authorInput");
    this.categoryInput = document.getElementById("categoryOptionSelect");
    this.priorityCheckBoxes = document.querySelectorAll(".form-check-input");

    this.addButton = document.querySelector(".btn-add");
    this.clearButton = document.querySelector(".btn-clear");
  }

  isNotEmpty(field) {
    return field.value !== "";
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

    // !! Add Clear Storage

    for (let radio of this.priorityCheckBoxes) {
      radio.checked = false;
    }
  }
}
