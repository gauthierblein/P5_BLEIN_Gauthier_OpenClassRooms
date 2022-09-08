//// Récupération de l'id de la commande via l' URL
const id = new URL(window.location.href).searchParams.get("id");
console.log(id);


//// Insertion du numéro de commande sur la page
const orderId = document.getElementById('orderId')
orderId.innerHTML = id;

localStorage.clear();
