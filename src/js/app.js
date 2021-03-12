import { ListUI } from "./ListUI";
import { FormUI } from "./FormUI";
import { Book } from "./Book";
import { BookUI } from "./BookUI";
import { createModal, handleExportButtons } from "./utils";

import Form from "./Form";
import Storage from "./_Storage";

const listUI = new ListUI(".bookList_section");
const formUI = new FormUI(
  ".form_cnt",
  listUI.list.categories,
  listUI.list.priorityAmount
);
const bookUI = new BookUI();

formUI.registerSubcribers((publisher) => {
  const { action } = publisher;

  switch (action) {
    case "add":
      const listLength = listUI.list.books.length;
      const { title, author, category, priority } = publisher.data;
      const book = new Book(listLength, title, author, category, priority);

      listUI.list.addBook(book);
      bookUI.createBook(".bookList_Cnt", listUI.state.listView, book);
      Storage.setStorage("Books", listUI.list.books);
      Form.clearForm();
      Form.clearStorage(Form.getInputsForm());
      listUI.state.booksAmount = listUI.list.books.length;
      listUI.setBooksAmount();
      break;

    case "edit":
      const { data, id, editedElement } = publisher;
      listUI.list.updateBook(id, data);
      bookUI.updateBookElement(editedElement, data);
      Storage.setStorage("Books", listUI.list.books);
      Form.setDefaultForm();
      Form.clearForm();
      Form.clearStorage(Form.getInputsForm());
      break;

    case "addCategory":
      Form.addCategory(listUI.list.categories);
      formUI.renderCategories(listUI.list.categories, Form.getCategoryInput());
      listUI.renderOptionFilter(
        listUI.list.categories,
        listUI.getSelectOptionElement("categoryOptionFilter")
      );
      break;

    default:
      throw Error("Action not recognized");
  }
});

bookUI.registerSubscribers((publisher) => {
  const { id, action, element } = publisher;
  const currentBook = listUI.list.getBook(id);

  if (action === "edit") {
    formUI.state = {
      editedBookID: id,
      editedElement: element,
    };

    Form.setEditForm(currentBook);
  } else {
    listUI.list.deleteBook(currentBook);
    listUI.list.resetId();
    element.remove();
    listUI.resetId();
    listUI.state = {
      booksAmount: listUI.list.books.length,
    };
    listUI.setBooksAmount();
    Storage.setStorage("Books", listUI.list.books);
  }
});

listUI.registerSubscribers((publisher) => {
  const { action } = publisher;
  const { filtered, listView } = listUI.state;
  const booksList = listUI.list.hasFilters() ? filtered : listUI.list.books;

  switch (action) {
    case "filter":
      listUI.clearItems();
      bookUI.renderBooks(filtered, listView);
      listUI.setBooksAmount();

      break;
    case "sort":
      const { sortMode, tHead } = publisher;
      const sorted = listUI.list.hasFilters()
        ? listUI.list.sortBooks(filtered, tHead, sortMode)
        : listUI.list.sortBooks(listUI.list.books, tHead, sortMode);

      listUI.clearItems();

      bookUI.renderBooks(sorted, listView);
      break;
    case "list":
      listUI.resetView();
      listUI.getRootList().appendChild(listUI.createTable());

      bookUI.renderBooks(booksList, listView);
      break;
    case "grid":
      listUI.resetView();
      listUI.getRootList().appendChild(listUI.createGrid());

      bookUI.renderBooks(booksList, listView);
      break;

    case "export":
      listUI.resetView();
      listUI.getRootList().appendChild(listUI.createTable());

      bookUI.renderBooks(listUI.list.books, listView);

      createModal();
      handleExportButtons();

    default:
      return;
  }
});
