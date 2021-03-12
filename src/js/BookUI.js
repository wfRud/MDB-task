import Storage from "./_Storage";
import { createActionBtns } from "./utils";

export class BookUI {
  constructor() {
    this.subscribers = [];
    this.getElement = (target) => target.parentNode.parentNode.parentNode;
    this.getElementID = (target) =>
      Number(target.parentNode.parentNode.parentNode.dataset.id);

    this.renderBooks(Storage.getStorage("Books"), "list");
  }

  createBook(cnt, view, props) {
    view === "list"
      ? this.createListBook(cnt, props)
      : this.createTileBook(cnt, props);
  }

  createListBook(cnt, props) {
    const root = document.createElement("tr");

    for (let key in props) {
      if (key === "id") {
        continue;
      }
      const td = this.createTableData(key, props[key]);
      root.appendChild(td);
    }

    root.dataset.id = props.id;
    root.appendChild(this.createIconsContainer());

    document.querySelector(cnt).appendChild(root);
  }

  createTileBook(cnt, prop) {
    const { id, author, title, category, priority } = prop;
    const card = document.createElement("div"),
      cardBody = document.createElement("div"),
      titleElement = document.createElement("h4"),
      authorElement = document.createElement("h5"),
      categoryElement = document.createElement("span"),
      priorityElement = document.createElement("span");

    card.className = "card";
    cardBody.className = "card-body";
    titleElement.className = "card-title title";
    authorElement.className = "card-subtitle mb-2 text-muted author";
    categoryElement.className = "badge badge-primary category";
    priorityElement.className = "badge badge-secondary priority";

    card.dataset.id = id;
    titleElement.textContent = title;
    authorElement.textContent = author;
    categoryElement.textContent = category;
    priorityElement.textContent = priority;

    // titleElement.appendChild(priorityElement);

    cardBody.appendChild(titleElement);
    cardBody.appendChild(authorElement);
    cardBody.appendChild(categoryElement);
    cardBody.appendChild(priorityElement);

    card.appendChild(cardBody);
    card.appendChild(this.createIconsContainer());

    document.querySelector(cnt).appendChild(card);
  }

  updateBookElement(target, props) {
    for (let key in props) {
      target.querySelector(`.${key}`).textContent = props[key];
    }
  }

  createTableData(key, props) {
    const td = document.createElement("td");

    td.className = key;
    td.textContent = props;

    return td;
  }

  createIconsContainer() {
    const iconCnt = document.createElement("div");
    iconCnt.className = "iCons_cnt";

    const editIcon = createActionBtns(
      "./assets/edit-regular.svg",
      "edit-icon",
      "icon edit_icon",
      "icon_Cnt",
      "edit",
      this.notify.bind(this)
    );
    const deleteIcon = createActionBtns(
      "./assets/trash-alt-regular.svg",
      "delete-icon",
      "icon delete_icon",
      "icon_Cnt",
      "delete",
      this.notify.bind(this)
    );

    iconCnt.appendChild(editIcon);
    iconCnt.appendChild(deleteIcon);

    return iconCnt;
  }

  renderBooks(arr, view) {
    const listBooks = arr.forEach((book) =>
      this.createBook(".bookList_Cnt", view, book)
    );
    arr ? listBooks : null;
  }

  notify(e) {
    this.subscribers.forEach((subject) => {
      subject({
        id: this.getElementID(e.target),
        action: e.target.dataset.action,
        element: this.getElement(e.target),
      });
    });
  }

  registerSubscribers(subscriber) {
    this.subscribers.push(subscriber);
  }
}
