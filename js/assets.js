// **MEDIA**//
import "../assets/Logo.svg";
import "../assets/cover.jpg";
import "../assets/edit-regular.svg";
import "../assets/trash-alt-regular.svg";

// **Style**//
import "../scss/style.scss";

//**Animation**//
import "../js/customAnimation.js";

// **Start App**//
import App from "./app";

new App(
  ["Crime", "Sci-Fi", "Fantasy", "Poetry", "Drama", "Science"],
  5
);
