const createActionBtns = function (
  src,
  alt,
  classIcon,
  classIconCnt,
  action,
  cb
) {
  const iConCnt = document.createElement("span"),
    iCon = document.createElement("img");

  iCon.src = src;
  iCon.alt = alt;
  iCon.dataset.action = action;
  iCon.className = classIcon;
  iConCnt.className = classIconCnt;

  if (action === "export") {
    iCon.dataset.toggle = "modal";
    iCon.dataset.target = "#exampleModalCenter";
  }

  iCon.addEventListener("click", cb);

  iConCnt.appendChild(iCon);
  return iConCnt;
};

const createModal = function () {
  const modal = document.createElement("div"),
    fragmentHTML = document.createDocumentFragment();

  const modalContent = `
  
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Export Table to :</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
     
      <div class="modal-footer d-flex justify-content-between">
        <button type="button" class="btn btn-success" id="pdf"> PDF</button> 
        <button type="button" class="btn btn-success" id="csv"> CSV</button> 
        <button type="button" class="btn btn-success" id="txt"> TXT</button> 
        <button type="button" class="btn btn-success" id="json"> JSON</button> 
        
      </div>
    </div>
  </div>

  `;

  modal.className = "modal fade";
  modal.id = "exampleModalCenter";
  modal.tabIndex = "-1";
  modal.dataset.role = "dialog";
  modal.setAttribute("aria-labelledby", "exampleModalCenterTitle");
  modal.setAttribute("aria-hidden", "true");

  modal.innerHTML = modalContent;
  fragmentHTML.appendChild(modal);

  document.querySelector(".container").appendChild(fragmentHTML);
};

const handleExportButtons = function () {
  const modal = document.getElementById("exampleModalCenter");
  const buttons = modal.querySelectorAll("button");

  for (let button of buttons) {
    button.addEventListener(
      "click",
      (e) => {
        const id = e.target.id;

        $("#bookList").tableHTMLExport({
          type: `${id}`,
          filename: `table.${id}`,
          ignoreColumns: ".thead-Actions",
        });
      },
      false
    );
  }
};

export { createActionBtns, createModal, handleExportButtons };
