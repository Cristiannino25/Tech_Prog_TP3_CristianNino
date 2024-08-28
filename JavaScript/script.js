document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  menuToggle.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });
});

// formulaire

function validateForm() {
  const nom = document.getElementById("nom");
  const prenom = document.getElementById("prenom");
  const telephone = document.getElementById("telephone");
  const email = document.getElementById("email");
  const ville = document.getElementById("ville");
  const pays = document.getElementById("pays");
  const genre = document.getElementById("gender");
  const message = document.getElementById("message");

  let erreur = false;

  if (nom.value === "") {
    document.querySelector(`#${nom.id} + .errorMessage`).textContent =
      "Veuillez saisir votre nom";
    erreur = true;
  } else if (nom.value.length > 20) {
    document.querySelector(`#${nom.id} + .errorMessage`).textContent =
      "Le nom ne doit pas dépasser 20 caractères";
    erreur = true;
  }

  if (prenom.value === "") {
    document.querySelector(`#${prenom.id} + .errorMessage`).textContent =
      "Veuillez saisir votre prénom";
    erreur = true;
  } else if (prenom.value.length > 20) {
    document.querySelector(`#${prenom.id} + .errorMessage`).textContent =
      "Le prénom ne doit pas dépasser 20 caractères";
    erreur = true;
  }

  if (telephone.value === "") {
    document.querySelector(`#${telephone.id} + .errorMessage`).textContent =
      "Veuillez saisir votre téléphone";
    erreur = true;
  } else if (telephone.value.length > 20) {
    document.querySelector(`#${telephone.id} + .errorMessage`).textContent =
      "Le téléphone ne doit pas dépasser 20 caractères";
    erreur = true;
  }

  if (email.value === "") {
    document.querySelector(`#${email.id} + .errorMessage`).textContent =
      "Veuillez saisir votre email";
    erreur = true;
  } else if (!isValidEmail(email.value)) {
    document.querySelector(`#${email.id} + .errorMessage`).textContent =
      "L'adresse email est invalide";
    erreur = true;
  }

  if (ville.value === "") {
    document.querySelector(`#${ville.id} + .errorMessage`).textContent =
      "Veuillez saisir votre ville";
    erreur = true;
  } else if (ville.value.length > 20) {
    document.querySelector(`#${ville.id} + .errorMessage`).textContent =
      "La ville ne doit pas dépasser 20 caractères";
    erreur = true;
  }

  if (pays.value === "") {
    document.querySelector(`#${pays.id} + .errorMessage`).textContent =
      "Veuillez saisir votre pays";
    erreur = true;
  } else if (pays.value.length > 20) {
    document.querySelector(`#${pays.id} + .errorMessage`).textContent =
      "Le pays ne doit pas dépasser 20 caractères";
    erreur = true;
  }

  if (genre.value === "") {
    document.querySelector(`#${genre.id} + .errorMessage`).textContent =
      "Veuillez sélectionner votre genre";
    erreur = true;
  }

  if (message.value === "") {
    document.querySelector(`#${message.id} + .errorMessage`).textContent =
      "Veuillez saisir votre message";
    erreur = true;
  } else if (message.value.length > 200) {
    document.querySelector(`#${message.id} + .errorMessage`).textContent =
      "Le message ne doit pas dépasser 200 caractères";
    erreur = true;
  }

  function isValidEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  if (!erreur) {
    // Envoyer le formulaire ici
    alert("Formulaire envoyé avec succès !");
  }

  return !erreur;
}
