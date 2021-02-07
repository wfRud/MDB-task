import BookUI from "./_BookUI";

export default class ListUI {
  constructor(cnt, getFiltersFnc, books, form) {
    this.getFilters = getFiltersFnc;
    this.books = books;
    this.form = form;

    this.getRootList = () => _rootList;
    this.getHeader = () => _header;
    this.getTbody = () => _tbody;
    this.getListItems = () => _listItems;
    this.getFilterSelectInput = () => _filterSelectInput;

    const _rootList = this.createRootList(),
      _header = this.createHeader(this.getFilters),
      _tbody = this.getRootList().querySelector(".bookList_Cnt");

    this.attachToCnt(cnt, this.getHeader());
    this.attachToCnt(cnt, this.getRootList());

    this.renderItems(this.getTbody(), this.books, this.form);

    const _listItems = this.getTbody().querySelectorAll("[data-id]");
    const _filterSelectInput = this.getHeader().querySelectorAll(
      "select[data-role]"
    );

    // console.log(this.getFilterSelectInput());
  }

  attachToCnt(cnt, root) {
    document.querySelector(cnt).appendChild(root);
  }

  createRootList() {
    const rootList = document.createElement("div");
    rootList.className = "bookList_content";

    rootList.appendChild(
      this.createTableLabel("bookListTable", this.books.length)
    );
    rootList.appendChild(this.createTable("bookListTable"));

    return rootList;
  }

  //   Header List
  createHeader(filters) {
    const header = document.createElement("header");
    header.className = "bookList_header";

    header.appendChild(this.createHeaderTitle("Book List"));
    header.appendChild(
      this.createFilterPanel("bookListFilters", "Filters", filters)
    );
    return header;
  }

  createHeaderTitle(title) {
    const h3 = document.createElement("h3");
    h3.className = "bookList_header-title";
    h3.textContent = title;

    return h3;
  }

  createFilterPanel(id, labelText, filters) {
    const filtersCnt = document.createElement("div"),
      filtersPanel = document.createElement("div"),
      label = document.createElement("label");

    label.htmlFor = id;
    label.textContent = labelText;

    filtersPanel.className =
      "bookList_header-filters_cnt form-group d-flex justify-content-between";
    filtersPanel.id = id;

    filters.forEach((filter) => {
      const optionElement = this.createOptionFilterInput(
        `${filter.name}categoryOptionFilter`,
        filter.filters,
        `${filter.name}`
      );

      filtersPanel.appendChild(optionElement);
    });

    filtersCnt.appendChild(label);
    filtersCnt.appendChild(filtersPanel);

    return filtersCnt;
  }

  createOptionFilterInput(id, filter, labelText) {
    const select = document.createElement("select"),
      option = document.createElement("option"),
      label = document.createElement("label"),
      formGroup = document.createElement("div");

    select.id = id;
    select.className = "form-control";
    select.dataset.role = "data-role";
    option.textContent = "Choose...";
    option.value = "";

    select.appendChild(option);

    this.renderOptionFilter(filter, select);

    label.htmlFor = id;
    label.textContent = labelText;

    formGroup.className = "form-group";
    formGroup.appendChild(label);
    formGroup.appendChild(select);

    return formGroup;
  }

  renderOptionFilter(filter, rootElem) {
    filter.forEach((filterItems) => {
      const option = document.createElement("option");
      option.value = filterItems;
      option.textContent = filterItems;
      rootElem.appendChild(option);
    });
  }

  //   List Content
  createTableLabel(id, booksAmount) {
    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = `Books Amount: ${booksAmount}`;

    return label;
  }

  createTable(id) {
    const table = document.createElement("table");
    table.className = "table";
    table.id = id;

    table.appendChild(
      this.craeteThead([
        "Title",
        "Author",
        "Category",
        "Priority",
        "Cover",
        "Actions",
      ])
    );

    table.appendChild(this.createTbody());

    return table;
  }

  craeteThead(elems) {
    const thead = document.createElement("thead"),
      tRow = document.createElement("tr");

    elems.forEach((elem) => {
      const th = document.createElement("th");
      th.scope = "col";
      th.textContent = elem;

      tRow.appendChild(th);
    });

    thead.appendChild(tRow);

    return thead;
  }

  createTbody() {
    const tBody = document.createElement("tbody");

    tBody.className = "bookList_Cnt";

    return tBody;
  }

  renderItems(cnt, arr, form) {
    arr.forEach((item) => {
      new BookUI().renderBooks(cnt, item, arr, form);
    });
  }

  clearItems(cnt) {
    cnt.forEach((item) => {
      item.remove();
    });
  }
}
