import List from "./List";
import { createActionBtns, createModal } from "./utils";

export class ListUI {
  constructor(cnt) {
    this.subscribers = [];
    this.list = new List(
      ["Crime", "Sci-Fi", "Fantasy", "Poetry", "Drama", "Science"],
      5
    );
    this.getFilters = this.list.searchObjects("author");
    this.tHeads = this.list.tHeadsNames;

    this.state = {
      listView: "list",
      booksAmount: this.list.books.length,
      filtered: [],
      mode: ["asc", "desc", "default"],
      variantMode: 0,
      currentThead: "",
    };

    this.getRootList = () => _rootList;
    this.getHeader = () => _header;
    this.getTBody = () => _tbody;
    this.getSelectOptionElement = (id) => document.getElementById(id);

    const _rootList = this.createRootList(),
      _header = this.createHeader(this.getFilters),
      _tbody = this.getRootList().querySelector(".bookList_Cnt");

    this.attachToCnt(cnt, this.getHeader());
    this.attachToCnt(cnt, this.getRootList());
  }

  attachToCnt(cnt, root) {
    document.querySelector(cnt).appendChild(root);
  }

  createRootList() {
    const rootList = document.createElement("div");
    rootList.className = "bookList_content";

    rootList.appendChild(this.bookListContentHeader());
    this.state.listView === "list"
      ? rootList.appendChild(this.createTable())
      : rootList.appendChild(this.createGrid());

    return rootList;
  }

  //* Header List *//
  createHeader() {
    const header = document.createElement("header");
    header.className = "bookList_header";

    header.appendChild(this.createHeaderTitle("Book List"));
    header.appendChild(this.createFilterPanel("bookListFilters", "Filters"));

    return header;
  }

  createHeaderTitle(title) {
    const h3 = document.createElement("h3");
    h3.className = "bookList_header-title";
    h3.textContent = title;

    return h3;
  }

  createFilterPanel(id, labelText) {
    const filtersCnt = document.createElement("div"),
      filtersPanel = document.createElement("div"),
      filtersBadgesPanel = document.createElement("div"),
      label = document.createElement("label");

    label.htmlFor = id;
    label.textContent = labelText;

    filtersCnt.className = "filtersPanel";
    filtersPanel.className =
      "bookList_header-filters_cnt form-group d-flex justify-content-between";
    filtersPanel.id = id;
    filtersBadgesPanel.className =
      "bookList_header-filtersBadgesPanel form-group d-flex flex-row";

    const priorityArray = Array.from(
      Array(this.list.priorityAmount),
      (x, index) => index + 1
    );

    const categoryOption = this.createOptionFilterInput(
      "categoryOptionFilter",
      "category",
      this.list.categories,
      "category"
    );
    const authorOption = this.createOptionFilterInput(
      "authorOptionFilter",
      "author",
      this.list.searchObjects("author"),
      "author"
    );
    const priorityOption = this.createOptionFilterInput(
      "priorityOptionFilter",
      "priority",
      priorityArray,
      "priority"
    );

    filtersPanel.appendChild(categoryOption);
    filtersPanel.appendChild(authorOption);
    filtersPanel.appendChild(priorityOption);

    filtersCnt.appendChild(label);
    filtersCnt.appendChild(filtersPanel);
    filtersCnt.appendChild(filtersBadgesPanel);

    return filtersCnt;
  }

  createOptionFilterInput(id, name, filter, labelText) {
    const select = document.createElement("select"),
      option = document.createElement("option"),
      label = document.createElement("label"),
      formGroup = document.createElement("div");

    select.id = id;
    select.className = "form-control";
    select.dataset.name = name;
    select.dataset.action = "filter";
    option.textContent = "Choose...";
    option.value = "";

    select.appendChild(option);

    this.handleOptionClickedEvent(select);
    this.renderOptionFilter(filter, select);

    label.htmlFor = id;
    label.textContent = labelText;

    formGroup.className = "form-group";
    formGroup.appendChild(label);
    formGroup.appendChild(select);

    return formGroup;
  }

  renderOptionFilter(filter, rootElem) {
    this.clearOptionFilter(rootElem);

    filter.forEach((filterItem) => {
      const option = document.createElement("option");
      option.value = filterItem;
      option.textContent = filterItem;

      rootElem.appendChild(option);
    });
  }

  handleOptionClickedEvent(optionElement) {
    optionElement.addEventListener("change", (e) => {
      e.target.value
        ? this.list.addFilter(e.target.dataset.name, e.target.value)
        : null;
      this.renderFilterBadges();
      this.state.filtered = this.list.filterList();

      this.notify(e);
      [...e.target.children][0].selected = true;
    });
  }

  renderFilterBadges() {
    const filtersPanel = document.querySelector(
      ".bookList_header-filtersBadgesPanel"
    );

    this.clearFilterBadgeCnt(filtersPanel);
    for (let item in this.list.filters) {
      [...this.list.filters[item]].forEach((filter) =>
        filtersPanel.appendChild(this.createFilterBadge(filter))
      );
    }
  }

  clearFilterBadgeCnt(filterBadgeCnt) {
    const filterBadges = filterBadgeCnt.querySelectorAll(".badge");
    filterBadges ? filterBadges.forEach((badge) => badge.remove()) : null;
  }

  createFilterBadge(filterItem) {
    const filterBadge = document.createElement("span");
    filterBadge.className = "badge badge-primary";
    filterBadge.textContent = filterItem;
    filterBadge.dataset.action = "filter";

    filterBadge.addEventListener("click", (e) => {
      this.list.deleteFilter(e.target.textContent);
      e.target.remove();
      this.state.filtered = this.list.filterList();

      this.notify(e);
    });

    return filterBadge;
  }

  clearOptionFilter(rootElem) {
    const optionsFilter = rootElem.querySelectorAll("option");

    optionsFilter.forEach((elem) => (elem.value ? elem.remove() : null));
  }

  //* List Content *//
  bookListContentHeader() {
    const bookListContentHeader = document.createElement("div");
    bookListContentHeader.classList =
      "bookListContentHeader form-group d-flex justify-content-between";

    bookListContentHeader.appendChild(
      this.createTableLabel("bookListTable", this.state.booksAmount)
    );
    bookListContentHeader.appendChild(this.createActionBtnsPanel());

    return bookListContentHeader;
  }

  createTableLabel(id, booksAmount) {
    const label = document.createElement("label"),
      span = document.createElement("span");

    span.className = "booksAmount";
    span.textContent = booksAmount;

    label.htmlFor = id;
    label.textContent = `Books Amount: `;
    label.appendChild(span);

    return label;
  }

  createActionBtnsPanel() {
    const actionBtnsPanel = document.createElement("div");
    actionBtnsPanel.className = "actionBtnsPanel";

    const gridIcon = createActionBtns(
      "./assets/grid.svg",
      "grid-icon",
      "icon grid_icon",
      "icon_Cnt",
      "grid",
      this.notify.bind(this)
    );
    const listIcon = createActionBtns(
      "./assets/list.svg",
      "list-icon",
      "icon list_icon",
      "icon_Cnt",
      "list",
      this.notify.bind(this)
    );
    const exportIcon = createActionBtns(
      "./assets/export.svg",
      "export-icon",
      "icon export_icon",
      "icon_Cnt",
      "export",
      this.notify.bind(this)
    );

    actionBtnsPanel.appendChild(gridIcon);
    actionBtnsPanel.appendChild(listIcon);
    actionBtnsPanel.appendChild(exportIcon);

    return actionBtnsPanel;
  }

  createTable() {
    const table = document.createElement("table");
    table.className = "table";
    table.id = "bookList";

    table.appendChild(this.craeteThead());

    table.appendChild(this.createTbody());

    return table;
  }

  createGrid() {
    const grid = document.createElement("div"),
      bookList_cnt = document.createElement("div");

    bookList_cnt.className = "bookList_Cnt d-flex justify-content-between";

    grid.className = "grid";
    grid.id = "bookList";

    grid.appendChild(bookList_cnt);

    return grid;
  }

  resetView() {
    document.getElementById("bookList").remove();
  }

  craeteThead() {
    const thead = document.createElement("thead"),
      tRow = document.createElement("tr");

    this.tHeads.forEach((elem) => {
      const th = document.createElement("th");
      th.scope = "col";
      th.className = `thead thead-${elem}`;
      th.textContent = elem;
      th.dataset.action = "sort";

      th.addEventListener("click", (e) => {
        switch (th.className) {
          case "thead thead-Author":
          case "thead thead-Category":
          case "thead thead-Priority":
            if (
              e.target.textContent === this.state.currentThead ||
              !this.state.currentThead
            ) {
              this.state.currentThead = elem;

              this.notify(e);

              this.state.variantMode < 2
                ? this.state.variantMode++
                : (this.state.variantMode = 0);
            } else {
              this.state.currentThead = elem;
              this.state.variantMode = 0;

              this.notify(e);

              this.state.variantMode < 2
                ? this.state.variantMode++
                : (this.state.variantMode = 0);
            }
            break;
          default:
            return;
        }
      });

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

  resetId() {
    this.getTBody()
      .querySelectorAll("tr")
      .forEach((item, index) => item.setAttribute("data-id", index));
  }

  setBooksAmount() {
    const counter = document.querySelector(".booksAmount");
    counter.textContent = this.list.hasFilters()
      ? this.state.filtered.length
      : this.state.booksAmount;
  }

  clearItems() {
    const tBody = document.querySelector(".bookList_Cnt").children;

    [...tBody].forEach((item) => {
      item.remove();
    });
  }

  // * Register Subscribers *//
  notify(e) {
    const action = e.target.dataset.action;

    this.subscribers.forEach((subject) => {
      switch (action) {
        case "filter":
          subject({
            action: action,
          });
          break;

        case "sort":
          const { mode, variantMode } = this.state;
          subject({
            action: action,
            sortMode: mode[variantMode],
            tHead: e.target.textContent,
          });
          break;

        case "list":
          this.state.listView = "list";
          subject({
            action: action,
            listView: this.state.listView,
          });

          break;

        case "grid":
          this.state.listView = "grid";
          subject({
            action: action,
            listView: this.state.listView,
          });
          break;

        case "export":
          this.state.listView = "list";
          subject({
            action: action,
            listView: this.state.listView,
          });
          break;
        default:
          return;
      }
    });
  }

  registerSubscribers(subscriber) {
    this.subscribers.push(subscriber);
  }
}
