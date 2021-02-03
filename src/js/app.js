import Form from "./_form";

const form = new Form();

form.addButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (form.isValid()) {
    form.clearForm();
  }
});

form.clearButton.addEventListener("click", (e) => {
  e.preventDefault();
  form.clearForm();
});
