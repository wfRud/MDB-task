import Book from "./_book";

export default class BookUI {
  constructor(arr) {
    const _root = document.createElement("tr"),
      _editIcon = document.createElement("img"),
      _deleteIcon = document.createElement("img");

    this.getBookElement = () => _root;
    this.getBookElementID = () => this.getBookElement().getAttribute("data-id");
    this.getEditIcon = () => _editIcon;
    this.getDeleteIcon = () => _deleteIcon;

    this.editBook();
    this.deleteBook(arr);
  }

  attachToCnt(cnt, book) {
    cnt.appendChild(book);
  }

  createBook(props) {
    //  Create Elements
    const title = document.createElement("td"),
      author = document.createElement("td"),
      category = document.createElement("td"),
      priority = document.createElement("td"),
      cover = document.createElement("td"),
      actions = document.createElement("td");

    const coverImg = document.createElement("img"),
      icons_cnt = document.createElement("div"),
      editIcon_cnt = document.createElement("span"),
      deleteIcon_cnt = document.createElement("span");

    // Set Book content
    title.textContent = props.title;
    author.textContent = props.author;
    category.textContent = props.category;
    priority.textContent = props.priority;
    //** coverImg.src = props.cover;

    // Set src & alt attr for icons
    this.getEditIcon().src = "./assets/edit-regular.svg";
    this.getDeleteIcon().src = "./assets/trash-alt-regular.svg";

    this.getEditIcon().alt = "edit icon";
    this.getDeleteIcon().alt = "delete icon";

    // Set class names for icons cnt
    editIcon_cnt.className = "icon_Cnt";
    deleteIcon_cnt.className = "icon_Cnt";
    icons_cnt.className = "iCons_cnt";

    // Set bookElement index
    this.getBookElement().setAttribute("data-id", props.id);

    // Append elements
    this.getBookElement().appendChild(title);
    this.getBookElement().appendChild(author);
    this.getBookElement().appendChild(category);
    this.getBookElement().appendChild(priority);
    this.getBookElement().appendChild(cover);
    this.getBookElement().appendChild(actions);

    editIcon_cnt.appendChild(this.getEditIcon());
    deleteIcon_cnt.appendChild(this.getDeleteIcon());

    icons_cnt.appendChild(editIcon_cnt);
    icons_cnt.appendChild(deleteIcon_cnt);
    actions.appendChild(icons_cnt);
    cover.appendChild(coverImg);
  }

  addBook(cnt, form, arr) {
    if (form.isValid()) {
      const book = new Book(
        arr.length,
        form.titleInput.value,
        form.authorInput.value,
        form.categoryInput.value,
        form.isChecked().value
      );
      arr.push(book);
      this.createBook(book);
      this.attachToCnt(cnt, this.getBookElement());
      form.clearForm();
    }
  }

  editBook() {
    this.getEditIcon().addEventListener("click", () => {
      console.log("edit");
      console.log(this);
    });
  }

  deleteBook(arr) {
    this.getDeleteIcon().addEventListener("click", () => {
      arr.splice(this.getBookElementID(), 1);
      this.getBookElement().remove();

      const elemsCollection = document.querySelectorAll("[data-id]");

      this.resetID(arr, "id", false);
      this.resetID(elemsCollection, "data-id", true);
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
      console.log(item);
    });
  }
}
