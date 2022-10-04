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

  const zoneItems = document.querySelector("#items")
    for (let i=0; i < productsData.length; i++) {

      let itemLink = document.createElement("a");
      let id = productsData[i]._id
      zoneItems.appendChild(itemLink);
      itemLink.href = "./product.html?_id=" + id

      let itemArticle = document.createElement("article");
      itemLink.appendChild(itemArticle);

      let itemImg = document.createElement("img");
      itemArticle.appendChild(itemImg);
      itemImg.src = productsData[i].imageUrl;
      itemImg.alt = productsData[i].altTxt;
        
      let itemTitle = document.createElement("h3");
      itemArticle.appendChild(itemTitle);
      itemTitle.className = "productName";
      itemTitle.innerHTML = productsData[i].name;

      let itemDescription = document.createElement("p");
      itemArticle.appendChild(itemDescription);
      itemDescription.className = "productDescription";
      itemDescription.innerHTML = productsData[i].description;
    }
} 