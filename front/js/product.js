//// Récupération de l'id du produit via l' URL
var url = new URL(document.location);
var search_params = new URLSearchParams(url.search);
const urlId = search_params.get("_id");
console.log(urlId);


//// Récupération des données sur l'API
fetch("http://localhost:3000/api/products/" + urlId)
  .then((res) => res.json())
  .then((productData) => {
    console.table(productData);

    // Fonction d'affichage du produit choisi
    document.querySelector("article div.item__img").innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}">`;
    document.getElementById("title").textContent = `${productData.name}`;
    document.getElementById("price").textContent = `${productData.price}`;
    document.getElementById("description").textContent = `${productData.description}`;

    let colors = document.getElementById("colors");
    for (key in productData.colors) {
      colors.options[colors.options.length] = new Option(
        productData.colors[key]
      );
    }
  })
  .catch((err) => {
    document.querySelector(".item").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404" + err);
  });



//// Validation du click et envoi vers le localStorage

const addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", () => {

  let productLocalStorage = JSON.parse(localStorage.getItem("cart"));

  if (!productLocalStorage) {
    addFirstProductToCart()
    }
    else {
    addNewProductToCart()
    }

    // Cas 1 - Le panier est vide
    function addFirstProductToCart() {

        let productCart = [];

        let imgUrlSelection = document.querySelector("article div.item__img img").src;
        let imgAltSelection = document.querySelector("article div.item__img img").alt;
        let nameSelection = document.querySelector("#title").textContent;
        let colorSelection = document.querySelector("#colors").value;
        let qtySelection = document.querySelector("#quantity").value;
        let priceSelection = document.querySelector("#price").textContent;
  
        let productCartObj = {
            id : urlId,
            img : imgUrlSelection,
            imgAlt : imgAltSelection,
            name : nameSelection,
            color : colorSelection,
            quantity  : qtySelection,
            price : priceSelection
        };

        if (
            colorSelection === undefined || colorSelection === "" ||
            qtySelection === undefined || qtySelection < 1 || qtySelection > 100
        ) {
            alert("Pour valider le choix de cet article, veuillez renseigner une couleur, et/ou une quantité valide entre 1 et 100");
        
        } else {
            productCart.push(productCartObj);
            let objCart = JSON.stringify(productCart);
            localStorage.setItem("cart", objCart);
            alert("Ajouté au panier !"); 
        }
    }

    // Cas 2 - Le panier n'est pas vide
    function addNewProductToCart() {

        let productCart = JSON.parse(localStorage.getItem("cart"));

        let colorSelection = document.querySelector("#colors").value;
        let qtySelection = document.querySelector("#quantity").value;
        let imgUrlSelection = document.querySelector("article div.item__img img").src;
        let imgAltSelection = document.querySelector("article div.item__img img").alt;
        let nameSelection = document.querySelector("#title").textContent;
        let priceSelection = document.querySelector("#price").textContent;

        let productCartObj = {
            id : urlId,
            img : imgUrlSelection,
            imgAlt : imgAltSelection,
            name : nameSelection,
            color : colorSelection,
            quantity  : qtySelection,
            price : priceSelection
        };

        //2a - Si le produit commandé est déjà dans le panier
        const resultFind = productCart.find((el) => el.id === urlId && el.color === colorSelection);
        
            if(resultFind && qtySelection > 0) {
                console.log("produit identique trouvé");
                let newQuantity = parseInt(qtySelection) + parseInt(resultFind.quantity)
                console.log(newQuantity);
                resultFind.quantity = newQuantity;
                localStorage.setItem("cart", JSON.stringify(productCart));
                alert("quantité modifiée")
            }
        //2b - Si le produit commandé n'est pas dans le panier
            else { 
                if (
                    colorSelection === undefined || colorSelection === "" ||
                    qtySelection === undefined || qtySelection < 1 || qtySelection > 100
                ) {
                    alert("Pour valider le choix de cet article, veuillez renseigner une couleur, et/ou une quantité valide entre 1 et 100");

                } else {
                    productCart.push(productCartObj);
                    let objCart = JSON.stringify(productCart);
                    localStorage.setItem("cart", objCart);
                    alert("Ajouté au panier !"); 
                }
            }
    }
});

