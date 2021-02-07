import Book from "./Book";
import Storage from "./_Storage";

export default class BookUI {
  constructor() {
    const _root = document.createElement("tr"),
      _deleteIcon = document.createElement("img"),
      _editIcon = document.createElement("img");

    this.getBookElement = () => _root;
    this.getBookElementID = () =>
      Number(this.getBookElement().getAttribute("data-id"));

    this.getEditIcon = () => _editIcon;
    this.getDeleteIcon = () => _deleteIcon;
  }

  createBook(cnt, props) {
    //  Create Elements
    const title = document.createElement("td"),
      author = document.createElement("td"),
      category = document.createElement("td"),
      priority = document.createElement("td"),
      actions = document.createElement("td");

    const icons_cnt = document.createElement("div"),
      editIcon_cnt = document.createElement("span"),
      deleteIcon_cnt = document.createElement("span"),
      categoryAmount = document.createElement("span");

    // Set Book content
    title.textContent = props.title;
    author.textContent = props.author;
    category.textContent = props.category;
    priority.textContent = props.priority;

    // Added Class
    title.className = "title-td";
    author.className = "author-td";
    category.className = "category-td";
    priority.className = "priority-td";

    // Set src & alt attr for icons
    this.getEditIcon().src = "./assets/edit-regular.svg";
    this.getDeleteIcon().src = "./assets/trash-alt-regular.svg";

    this.getEditIcon().alt = "edit icon";
    this.getDeleteIcon().alt = "delete icon";

    // Set class names for icons cnt
    editIcon_cnt.className = "icon_Cnt";
    deleteIcon_cnt.className = "icon_Cnt";
    icons_cnt.className = "iCons_cnt";
    categoryAmount.className = "categoryAmount";

    // Set bookElement index
    this.getBookElement().setAttribute("data-id", props.id);

    // Append elements
    this.getBookElement().appendChild(title);
    this.getBookElement().appendChild(author);
    this.getBookElement().appendChild(category);
    this.getBookElement().appendChild(priority);
    this.getBookElement().appendChild(actions);

    category.appendChild(categoryAmount);

    editIcon_cnt.appendChild(this.getEditIcon());
    deleteIcon_cnt.appendChild(this.getDeleteIcon());

    icons_cnt.appendChild(editIcon_cnt);
    icons_cnt.appendChild(deleteIcon_cnt);
    actions.appendChild(icons_cnt);

    cnt.appendChild(this.getBookElement());
  }

  renderBooks(cnt, item, arr, form) {
    this.createBook(cnt, item);
    this.deleteBook(arr);
    this.editBook(arr, form);
  }

  addBook(cnt, form, arr, countCategories) {
    if (form.isValid()) {
      const book = new Book(
        arr.length,
        form.titleInput.value,
        form.authorInput.value,
        form.categoryInput.value,
        form.isChecked().value
      );
      arr.push(book);

      this.createBook(cnt, book);
      this.deleteBook(arr, countCategories);
      this.editBook(arr, form);

      // update categoryAmount for each book
      const categoryElements = document.querySelectorAll(".categoryAmount");
      categoryElements.forEach((item) => {
        const amount = countCategories(arr, item.parentElement.textContent);
        item.textContent = `    (${amount})`;
      });

      // update books amount
      document.querySelector(".booksAmount").textContent = arr.length;

      Storage.setStorage("Books", arr);

      form.clearForm();
    }
  }

  editBook(arr, form) {
    this.getEditIcon().addEventListener("click", () => {
      const editCard = arr.find((item) => item.id === this.getBookElementID());
      const booksElems = document.querySelectorAll("[data-id]");

      this.clearEditFlag(arr, false);
      this.clearEditFlag(booksElems, true);
      editCard.isEdit = true;
      form.editFlag = true;
      this.getBookElement().setAttribute("data-edit", "edit");
      this.setEditFormDetails(arr, form);
    });
  }

  setEditFormDetails(arr, form) {
    const { titleInput, authorInput, categoryInput } = form;
    const currentBook = arr.find((item) => item.id === this.getBookElementID());

    titleInput.value = currentBook.title;
    authorInput.value = currentBook.author;
    categoryInput.value = currentBook.category;

    document.getElementById(
      `inlineRadio${currentBook.priority}`
    ).checked = true;

    form.addButton.textContent = "Edit";
    form.addButton.className = "btn btn-warning btn-add";
  }

  setEditBookContent(form, books) {
    const editCardElement = document.querySelector("[data-edit]"),
      titleElem = editCardElement.querySelector(".title"),
      authorElem = editCardElement.querySelector(".author"),
      categoryElem = editCardElement.querySelector(".category"),
      priorityElem = editCardElement.querySelector(".priority");

    const editCard = books.find((book) => book.isEdit);

    editCard.title = form.titleInput.value;
    editCard.author = form.authorInput.value;
    editCard.category = form.categoryInput.value;
    editCard.priority = form.isChecked().value;

    titleElem.textContent = form.titleInput.value;
    authorElem.textContent = form.authorInput.value;
    categoryElem.textContent = form.categoryInput.value;
    priorityElem.textContent = form.isChecked().value;

    delete editCard.isEdit;
    editCardElement.removeAttribute("data-edit");
    Storage.setStorage("Books", books);
  }

  updateBook(form, books) {
    if (form.isValid()) {
      this.setEditBookContent(form, books);
      form.clearForm();

      form.addButton.textContent = "Add";
      form.addButton.className = "btn btn-success btn-add";
      delete form.editFlag;
    }
  }

  deleteBook(arr, countCategories) {
    this.getDeleteIcon().addEventListener("click", () => {
      // update categoryAmount for each book
      arr.splice(this.getBookElementID(), 1);
      const categoryElements = document.querySelectorAll(".categoryAmount");

      document.querySelector(".booksAmount").textContent = arr.length;

      this.getBookElement().remove();
      const elemsCollection = document.querySelectorAll("[data-id]");

      this.resetID(arr, "id", false);
      this.resetID(elemsCollection, "data-id", true);

      Storage.setStorage("Books", arr);
      return arr.length;
    });
  }

  // That function reset ID of collection,
  // get 3 parameters: [collection, nameId, isNodeElement]
  resetID(collection, id, NodeElement) {
    collection.forEach((item, index) => {
      if (NodeElement) {
        item.setAttribute(id, index);
      } else {
        item[id] = index;
      }
    });
  }

  clearEditFlag(arr, NodeElement) {
    arr.forEach((item) => {
      if (!NodeElement) {
        delete item.isEdit;
      } else {
        item.removeAttribute("data-edit");
      }
    });
  }
}
