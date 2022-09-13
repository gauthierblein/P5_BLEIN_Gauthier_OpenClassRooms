//// Fonction d'affichage des produits dans le panier
let productLocalStorage = JSON.parse(localStorage.getItem("cart"));
console.table(productLocalStorage);

if (!productLocalStorage) {

    const titleCart = document.querySelector("h1");
    const sectionCart = document.querySelector(".cart");

    titleCart.innerHTML = "Votre panier est vide !";
    sectionCart.style.display = "none";

} else {

    for (let i=0; i < productLocalStorage.length; i++) {

        // Affichage des éléments
        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute("data-id", productLocalStorage[i].id);
        productArticle.setAttribute("data-color", productLocalStorage[i].color);

        let productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.className = "cart__item__img";

        let productImg = document.createElement("img");
        productDivImg.appendChild(productImg);
        productImg.src = productLocalStorage[i].img;
        productImg.alt = productLocalStorage.altImgProduit;
        
        let productItemContent = document.createElement("div");
        productArticle.appendChild(productItemContent);
        productItemContent.className = "cart__item__content";

        let productItemContentTitlePrice = document.createElement("div");
        productItemContent.appendChild(productItemContentTitlePrice);
        productItemContentTitlePrice.className = "cart__item__content__titlePrice";
        
        let productTitle = document.createElement("h2");
        productItemContentTitlePrice.appendChild(productTitle);
        productTitle.innerHTML = productLocalStorage[i].name;
        productTitle.className = "itemName";

        let productColor = document.createElement("p");
        productTitle.appendChild(productColor);
        productColor.innerHTML = productLocalStorage[i].color;
        productTitle.className = "itemColor";
        productColor.style.fontSize = "20px";

        let productPrice = document.createElement("p");
        productItemContentTitlePrice.appendChild(productPrice);
        productPrice.innerHTML = productLocalStorage[i].price + " €";

        let productItemContentSettings = document.createElement("div");
        productItemContent.appendChild(productItemContentSettings);
        productItemContentSettings.className = "cart__item__content__settings";

        let productItemContentSettingsQuantity = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsQuantity);
        productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
         
        let productQty = document.createElement("p");
        productItemContentSettingsQuantity.appendChild(productQty);
        productQty.innerHTML = "Qté : ";

        let productQuantity = document.createElement("input");
        productItemContentSettingsQuantity.appendChild(productQuantity);
        productQuantity.value = productLocalStorage[i].quantity;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");

        let productItemContentSettingsDelete = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsDelete);
        productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

        let productDeleter = document.createElement("p");
        productItemContentSettingsDelete.appendChild(productDeleter);
        productDeleter.className = "deleteItem";
        productDeleter.innerHTML = "Supprimer";

        // Fonction de suppression de l'item
            productDeleter.addEventListener("click", (e) => {e.preventDefault;      
            let deleteId = productLocalStorage[i].id;
            let deleteColor = productLocalStorage[i].color;

            productLocalStorage = productLocalStorage.filter(elt => elt.id !== deleteId || elt.color !== deleteColor);

            localStorage.setItem('cart', JSON.stringify(productLocalStorage));               

            alert('Votre article a bien été supprimé.');
            
            if (productLocalStorage.length === 0) {
                localStorage.clear();
            }

            location.reload();
            });
    }
}

//Affichage des totaux
function getTotals(){

    // Récupération du total des quantités
    const itemQty = document.getElementsByClassName('itemQuantity');
    let totalQty = 0;
    let totalPrice = 0;

    for (let i = 0; i < itemQty.length; ++i) {
        totalQty += itemQty[i].valueAsNumber;
        totalPrice += (itemQty[i].valueAsNumber * productLocalStorage[i].price);
    }

    document.getElementById('totalQuantity').innerHTML = totalQty;
    document.getElementById('totalPrice').innerHTML = totalPrice;

}
getTotals();

//Modification dynamique de la quantité
function modifyQty() {
    const cartItem = document.querySelectorAll(".cart__item");
    console.log(productLocalStorage)

    cartItem.forEach((cartItem) => {
      cartItem.addEventListener("change", (event) => {
      
        for (article of productLocalStorage)
          if (
            article.id == cartItem.dataset.id && cartItem.dataset.color === article.color
          ) {
            article.quantity = event.target.value;
            localStorage.setItem("cart", JSON.stringify(productLocalStorage));

            location.reload();
          }
      });
    });

}
modifyQty();



////Formulaire avec regex et récupération des données renseignées
function getForm() {

    let form = document.querySelector(".cart__order__form");

    //Création des expressions autorisées
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Ecoute des modifications
    form.firstName.addEventListener('change', function() {
        validFirstName(this)         
    });

    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    form.city.addEventListener('change', function() {
        validCity(this);
    });

    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    //validation des données renseignées
    const validFirstName = (inputFirstName) => {
        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
            if (charRegExp.test(inputFirstName.value)) {
                firstNameErrorMsg.innerHTML = '';
            } else {
                firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation du nom
    const validLastName = (inputLastName) => {
        let lastNameErrorMsg = document.getElementById("lastNameErrorMsg")

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'adresse
    const validAddress = (inputAddress) => {
        let addressErrorMsg = document.getElementById("addressErrorMsg")

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de la ville
    const validCity = (inputCity) => {
        let cityErrorMsg = document.getElementById("cityErrorMsg")

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'email
    const validEmail = (inputEmail) => {
        let emailErrorMsg = document.getElementById("emailErrorMsg")

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
    }
getForm();


////Création et envoi de l'order

const orderButton = document.getElementById('order');
    
orderButton.addEventListener('click', (event) => {
    event.preventDefault();
    let products = [];

    if (!productLocalStorage) {
        alert("votre panier est vide")
    } else {
        postForm();
    }

    function postForm() {
        let finalCart = JSON.parse(localStorage.getItem("cart"));
        for (let i = 0; i < finalCart.length; i++) {
        products.push(finalCart[i].id);
        }
            
            const contact = {
                firstName : document.getElementById('firstName').value,
                lastName : document.getElementById('lastName').value,
                address : document.getElementById('address').value,
                city : document.getElementById('city').value,
                email : document.getElementById('email').value
            }
    
            const finalOrder = {
                contact,
                products,
            }
            console.log(finalOrder)

            const options = {
                method: 'POST',
                body: JSON.stringify(finalOrder),
                headers: { 'Content-Type': 'application/json',}
              };
            
            fetch("http://localhost:3000/api/products/order", options)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    localStorage.setItem('orderId', data.orderId)
                    document.location.href = 'confirmation.html?id='+ data.orderId
                });
    }
        
})
