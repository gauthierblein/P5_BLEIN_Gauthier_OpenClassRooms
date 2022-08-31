//Récupération des données sur l'API
fetch("http://localhost:3000/api/products")
    // aller chercher la réponse en format json
  .then((res) => res.json())
  .then((productsData) => {
    console.table(productsData);
    // appel de la fonction d'affichage des produits
    displayProducts(productsData);
    // en cas d'erreur remplace le contenu de titre par un h1 au contenu de erreur 404 et également sur la console
  })
  .catch((err) => {
    document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404" + err);
  });

//-----------------------------------------------------

//Description de la fonction displayProducts
function displayProducts(allArticles) {
  // déclaration de variable de la zone d'article
  let zoneArticle = document.querySelector("#items");
  // boucle pour chaque indice(nommé 'article') dans index
  for (const article of allArticles) {
    /* création et ajout des zones d'articles, insertion de l'adresse du produit via chemin product + paramètres(son id);
          la page index est http://127.0.0.1:5500/front/html/index.html donc la page du produit sera http://127.0.0.1:5500/front/html/product.html 
          (d'ou le ./product.html) pour rajouter son paramètre on met ? puis la clé (ici _id) associé (=) à sa valeur dynamique ${article._id} */
    zoneArticle.innerHTML += `<a href="./product.html?_id=${article._id}">
          <article>
            <img src="${article.imageUrl}" alt="${article.altTxt}">
            <h3 class="productName">${article.name}</h3>
            <p class="productDescription">${article.description}</p>
          </article>
        </a>`;
  }
}
