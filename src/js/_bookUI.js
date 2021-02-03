export default class BookUI {
  constructor(cnt, props) {
    const _root = document.createElement("tr"),
      _editIcon = document.createElement("img"),
      _deleteIcon = document.createElement("img");

    this.getBookElement = () => _root;
    this.getEditIcon = () => _editIcon;
    this.getDeleteIcon = () => _deleteIcon;

    this.createBook(props);

    this.attachToCnt(cnt, this.getBookElement());
  }

  attachToCnt(cnt, book) {
    console.log(cnt);
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
}
