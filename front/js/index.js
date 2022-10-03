//// Récupération des données sur l'API
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((productsData) => {
    displayProducts(productsData);

    // en cas d'erreur remplace le contenu de titre par un h1 au contenu de erreur 404 et également sur la console
  })
  .catch((err) => {
    document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
  });

//-----------------------------------------------------

//// Fonction displayProducts pour l'affichage dynamique des items
function displayProducts(productsData) {
  const zoneItem = document.querySelector("#items");
  // création de la boucle pour afficher tous les items récupérés
  for (let item of productsData) {
    // remplissage de la section #items avec les différentes balises pour chaque item (grâce à la boucle), insertion de l'adresse du produit via chemin product + _id
    zoneItem.innerHTML += `<a href="./product.html?_id=${item._id}">
          <article>
            <img src="${item.imageUrl}" alt="${item.altTxt}">
            <h3 class="productName">${item.name}</h3>
            <p class="productDescription">${item.description}</p>
          </article>
        </a>`;
  }
}
