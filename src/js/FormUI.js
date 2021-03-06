import Storage from "./_Storage";
import Form from "./Form";

export class FormUI {
  constructor(cnt, categories, priorityAmount) {
    const root = this.createRoot(),
      _categories = categories,
      _priorityAmount = priorityAmount;

    this.subscribers = [];

    this.createForm(root, _categories, _priorityAmount);
    this.attachToCnt(cnt, root);

    Form.getInputsStorage(Form.getInputsForm());
    Form.setInputsStorage(Form.getInputsForm());

    this.swtichCategoryInput();
  }

  attachToCnt(cnt, root) {
    document.querySelector(cnt).appendChild(root);
  }

  createRoot() {
    const root = document.createElement("form");
    return root;
  }

  createForm(root, categories, priorityAmount) {
    // Title Input
    root.appendChild(
      this.createInput(
        "text",
        "titleInput",
        "title",
        "Book Title",
        "Title",
        true
      )
    );

    //   Author Input
    root.appendChild(
      this.createInput(
        "text",
        "authorInput",
        "author",
        "Book Author",
        "Author",
        true
      )
    );

    //   Categories Input
    root.appendChild(
      this.createOptionInput(
        "categoryOptionSelect",
        "category",
        categories,
        "Category"
      )
    );

    // Priority Radio Inputs
    root.appendChild(
      this.createRadioInput(
        "priorityCheckBoxesCnt",
        "priority",
        "Priority",
        priorityAmount
      )
    );

    root.appendChild(
      this.createBtn(
        "button",
        "clear-btn",
        "btn btn-danger btn-clear",
        "Clear",
        "clear"
      )
    );
    root.appendChild(
      this.createBtn(
        "button",
        "add-btn",
        "btn btn-success btn-add",
        "Add",
        "add"
      )
    );
  }

  createInput(type, id, name, labelText, placeholder, required) {
    const input = document.createElement("input"),
      label = document.createElement("label"),
      formGroup = document.createElement("div");

    label.htmlFor = id;
    label.textContent = labelText;

    input.type = type;
    input.id = id;
    input.name = name;
    input.className = "form-control";
    input.dataset.role = "form-input";
    input.required = required;
    input.placeholder = placeholder;
    input.required = required;

    formGroup.className = "form-group";

    formGroup.appendChild(label);
    formGroup.appendChild(input);

    return formGroup;
  }

  createOptionInput(id, name, categories, labelText) {
    const select = document.createElement("select"),
      option = document.createElement("option"),
      label = document.createElement("label"),
      addCategoryInput = document.createElement("input"),
      formGroup = document.createElement("div");

    select.id = id;
    select.className = "form-control active";
    select.name = name;
    select.dataset.role = "form-input";
    option.textContent = "Choose...";
    option.value = "";

    addCategoryInput.type = "text";
    addCategoryInput.id = "addCategory";
    addCategoryInput.className = "form-control";
    addCategoryInput.name = "addCategory";
    addCategoryInput.placeholder = "Add category";
    addCategoryInput.required = true;
    addCategoryInput.dataset.role = "form-input";

    select.appendChild(option);

    this.renderCategories(categories, select);

    label.htmlFor = id;
    label.textContent = labelText;

    formGroup.className = "form-group";
    formGroup.appendChild(label);
    formGroup.appendChild(
      this.createBtn(
        "button",
        "addCategory-btn",
        "btn btn-success btn-add-category",
        "add category",
        "addCategory"
      )
    );
    formGroup.appendChild(addCategoryInput);
    formGroup.appendChild(select);

    return formGroup;
  }

  createRadioInput(id, name, labelText, amount) {
    const formGroup = document.createElement("div"),
      label = document.createElement("label"),
      checkBoxesCnt = document.createElement("div");

    for (let i = 1; i <= amount; i++) {
      const formCheck = document.createElement("div"),
        inputRadio = document.createElement("input"),
        label = document.createElement("label");

      formCheck.className = "form-check form-check-inline";

      inputRadio.id = `inlineRadio${i}`;
      inputRadio.className = "form-check-input";
      inputRadio.type = "radio";
      inputRadio.value = i;
      inputRadio.name = name;
      inputRadio.dataset.role = "form-input";

      label.className = "form-check-label";
      label.textContent = `${i}`;
      label.htmlFor = `inlineRadio${i}`;

      formCheck.appendChild(inputRadio);
      formCheck.appendChild(label);

      checkBoxesCnt.appendChild(formCheck);
    }

    formGroup.className = "form-group";
    label.htmlFor = id;
    label.textContent = labelText;
    checkBoxesCnt.id = id;

    formGroup.appendChild(label);
    formGroup.appendChild(checkBoxesCnt);

    return formGroup;
  }

  createBtn(type, id, className, txtContent, action) {
    const btn = document.createElement("button");
    btn.type = type;
    btn.id = id;
    btn.className = className;
    btn.textContent = txtContent;
    btn.dataset.action = action;

    btn.addEventListener("click", (e) => {
      const action = e.target.dataset.action;
      if (action === "clear") {
        Form.clearForm();
        Form.setDefaultForm();
        Form.clearStorage(Form.getInputsForm());
      } else {
        this.subscribers.forEach((subject) => {
          switch (action) {
            case "edit":
              Form.getData()
                ? subject({
                    action: e.target.dataset.action,
                    id: this.state.editedBookID,
                    data: Form.getData(),
                    editedElement: this.state.editedElement,
                  })
                : null;
              break;
            case "add":
              Form.getData()
                ? subject({
                    action: e.target.dataset.action,
                    data: Form.getData(),
                  })
                : null;
              break;
            case "addCategory":
              subject({
                action: e.target.dataset.action,
                value: Form.getAddCategoryInput().value,
              });
            default:
              return;
          }
        });
      }
    });

    return btn;
  }

  renderCategories(categories, rootElem) {
    this.clearCategories(rootElem);
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      rootElem.appendChild(option);
    });
  }

  clearCategories(categoriesCnt) {
    const categoriesElems = categoriesCnt.querySelectorAll("option");

    categoriesElems.forEach((categoryElem) => {
      categoryElem.value ? categoryElem.remove() : null;
    });
  }

  swtichCategoryInput() {
    Form.getCategoryOptionLabel().addEventListener("click", (e) => {
      e.preventDefault();

      Form.getAddCategoryInput().classList.toggle("active");
      Form.getCategoryInput().classList.toggle("active");
      Form.getAddCategoryBtn().classList.toggle("active");
    });
  }

  registerSubcribers(subscriber) {
    this.subscribers.push(subscriber);
  }
}
