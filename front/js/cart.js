//Variable "productRegisterInLocalStorage" pour mettre keys et values du local storage
let productRegisterInLocalStorage = JSON.parse(localStorage.getItem("product"));

//Sélection balise de la page "product.html" pour insertion des produits et infos
const productPositionInHtml = document.getElementById("cart__items");

//----------------------------------------Variables----------------------------------------

let compositionProductCart = [];

//Variables pour quantité total et prix total
let totalPrice = 0;
let totalQuantity = 0;
let quantityOfProductCart = 0;
let priceProductCart = 0;
let totalPriceProductCart = 0;

//Variables pour la fonction supprimer
let idDelete = 0;
let colorDelete = 0;

//Variables pour la validation du panier
const buttonOrder = document.getElementById("order");
let errorFirstName = true;
let errorLastName = true;
let errorAdress = true;
let errorCity = true;
let errorEmail = true;

//----------------------------------------Fonctions----------------------------------------

//Fonction quantité total d'article dans le panier
function totalProductsQuantity(){
    totalQuantity += parseInt(quantityOfProductCart);
    document.getElementById("totalQuantity").innerText = totalQuantity;
    console.log("quantité total panié", totalQuantity);
}