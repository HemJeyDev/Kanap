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
let myProducts = [];
const findProducts = 0;

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

/**
 * Calcule la quantité total de produit
 * @param { number } totalQuantity
 * @param { string } quantityOfProductCart
 * @param { id } totalQuantity
 * @return { promise } 
 */
function totalProductsQuantity(){
    totalQuantity += parseInt(quantityOfProductCart);
    document.getElementById("totalQuantity").innerText = totalQuantity;
}

/**
 * Calcul du montant total du panier 
 * @param { number } totalPriceProductCart Quantité des produits dans le panier * le prix des produits
 * @param { number } totalPrice Addition de tout les prix du panier
 * @param { id } totalPrice
 * @return { promise }
 */
function totalProductsPrice (){
    //Prix total de chaque produit en multipliant la quantité par le prix à l'unité
    totalPriceProductCart = quantityOfProductCart * priceProductCart;
    //Prix total du panier
     totalPrice += totalPriceProductCart;
    document.getElementById("totalPrice").innerText = totalPrice; 
    
    }

/**
 * Fonction pour calculer la quantité totale de produits et le prix total du panier
 * @param { number } totalProductsQuantity
 * @param { number } totalProductsPrice
 */
function totaux (){
    totalProductsQuantity();
    totalProductsPrice();
}

/**
 * Fonction de recalcul de la quantité total d'articles dans le panier, lors de la modification de la quantité ou de la suppression d'un article 
 * @param { value } newTotalQuantity
 * @param { condition } item
 * @param { condition } productRegisterInLocalStorage
 * @param { string } quantityProduct
 * @return { promise }
 */
function recalculTotalQuantity() {
    let newTotalQuantity = 0;
    for (const item of productRegisterInLocalStorage) {
        //Calcul de la quantité total de produits dans le localStorage
        newTotalQuantity += parseInt(item.quantityProduct);
    }
    //Affichage de la nouvelle quantité de produits dans l'html
    document.getElementById("totalQuantity").innerText = newTotalQuantity;
}


/**
 * Fonction recalcul du montant total du panier, lors de la modification de la quantité ou de la suppression d'un article
 * @param { value } newTotalPrice
 * @param { condition } item 
 * @param { condition } productRegisterInLocalStorage
 * @param { id } idProductsLocalStorage
 * @param { Array } findProducts
 * @param { number } newtotalPriceProductCart prix des produits * la quantitée des produits dans le local storage
 * @param { number } newTotalPrice addition de tout les nouveaux prix du panier
 * @return { promise }
*/
function recalculTotalPrice() {
    let newTotalPrice = 0;
    //Boucle sur le productRegisterInLocalStorage 
    for (const item of productRegisterInLocalStorage) {
        const idProductsLocalStorage = item.idProduct;
        const quantityProductsLocalStorage = item.quantityProduct;
        //On vérifie si l'id correspond
        const findProducts = myProducts.find((element) => element._id === idProductsLocalStorage);
        //Si c'est le cas, on récupère le prix.
        if (findProducts) {
            const newtotalPriceProductCart = findProducts.price * quantityProductsLocalStorage;
            newTotalPrice += newtotalPriceProductCart;
        }
    //Affichage du nouveau prix total du panier dans l'html
    document.getElementById("totalPrice").innerText = newTotalPrice;
    } 
}


let messageErrorQuantity = false;
/**
 * Fonction Modifier la quantité d'un article du panier
 * @param { querySelectorAll } changeQuantity
 * @param { element } item
 * @param { event } change
 * @param { value } choiceQuantity
 * @param { value } myArticle
 * @param { value } selectMyArticleInLocalStorage
 * @param { id } idProduct
 * @param { condition } choiceQuantity 
 * @param { string } parseChoiceQuantity
 * @param { keyName } product
 * @param { keyValue } productRegisterInLocalStorage
 * @param { number } recalculTotalQuantity
 * @param { number } recalculTotalPrice
 * @param { Value } messageErrorQuantity
 * @param { value } quantityProduct
 * @param { value } messageErrorQuantity
 * @param { condition } messageErrorQuantity
 * @param { message } alert
*/
function changeQuantity() {
    //Sélection de l'élément html (input) dans lequel la quantité est modifiée
    let changeQuantity = document.querySelectorAll(".itemQuantity");
    changeQuantity.forEach((item) => {
        //Ecoute du changement sur l'input "itemQuantity"
        item.addEventListener("change", (event) => {
            event.preventDefault();
            choiceQuantity = Number(item.value);
            //On pointe le parent <article> de l'input "itemQuantity"
            let myArticle = item.closest('article');
            //Récupèration dans le localStorage de l'élément (même id et même couleur) dont on veut modifier la quantité
            let selectMyArticleInLocalStorage = productRegisterInLocalStorage.find
            ( element => element.idProduct === myArticle.dataset.id && element.colorProduct === myArticle.dataset.color );
            
            //Si la quantité est comprise entre 1 et 100 et que c'est un nombre entier, on met à jour la quantité dans le localStorage et le DOM
            if(choiceQuantity > 0 && choiceQuantity <= 100 && Number.isInteger(choiceQuantity)){
                parseChoiceQuantity = parseInt(choiceQuantity);
                selectMyArticleInLocalStorage.quantityProduct = parseChoiceQuantity;
                localStorage.setItem("product", JSON.stringify(productRegisterInLocalStorage));
                //Recalcule de la quantité et du prix total du panier
                recalculTotalQuantity();
                recalculTotalPrice();
                messageErrorQuantity = false;
            }
            //Sinon, on remet dans le DOM la quantité indiquée dans le localStorage et on indique un message d'erreur
            else{
                item.value = selectMyArticleInLocalStorage.quantityProduct;
                messageErrorQuantity = true;
            }
            if(messageErrorQuantity){       
                alert("La quantité d'un article (même référence et même couleur) doit être comprise entre 1 et 100 et être un nombre entier. Merci de rectifier la quantité choisie.");
            } 
        });
    });
}

/**
 * Fonction Suppression d'un article du panier
 * @param { querySelectorAll } selectSupprimer
 * @param { element } selectSupprimer
 * @param { event } click
 * @param { value } myArticle
 * @param { id } idProduct
 * @param { keyName } product
 * @param { keyValue } productRegisterInLocalStorage
 * @param { message } alert
 * @param { condition } myArticle
 * @param { condition } productRegisterInLocalStorage
 * @param { message } messagePanierVide
 * @param { number } recalculTotalQuantity
 * @param { number } recalculTotalPrice
 * 
*/
function deleteProduct() {
    let selectSupprimer = document.querySelectorAll(".deleteItem");
    selectSupprimer.forEach((selectSupprimer) => {
            selectSupprimer.addEventListener("click" , (event) => {
                event.preventDefault();
                            
                //On pointe le parent <article> du lien "supprimer"
                let myArticle = selectSupprimer.closest('article');
                //On filtre les éléments du localStorage pour ne garder que ceux qui sont différents de l'élément qu'on supprime
                productRegisterInLocalStorage = productRegisterInLocalStorage.filter
                ( element => element.idProduct !== myArticle.dataset.id || element.colorProduct !== myArticle.dataset.color );
                
                //On met à jour le localStorage
                localStorage.setItem("product", JSON.stringify(productRegisterInLocalStorage));
                
                //Alerte produit supprimé
                alert("Ce produit va être supprimé du panier.");
                 
                
                //On supprime la balise <article> du produit que l'on à supprimé depuis son parent, si elle existe
                if (myArticle.parentNode) {
                    myArticle.parentNode.removeChild(myArticle);
                }
                //Si, le panier est vide (le localStorage est vide ou le tableau qu'il contient est vide)
                //On affiche "Le panier est vide"
                if(productRegisterInLocalStorage === null || productRegisterInLocalStorage.length === 0){
                    messagePanierVide();
                }
                else{
                //Puis on recalcule la quantité et le prix total du panier
                recalculTotalQuantity();
                recalculTotalPrice();
                }
            }); 
    })
}

/**
 * Fonction pour afficher la phrase "Le panier est vide !"
 * @param { value } compositionProductCart
 * @param { value } newH2
 * @param { value } compositionProductCart
 * @param { id } totalQuantity
 * @param { id } totalPrice
*/
function messagePanierVide() {
    compositionProductCart = 'Le panier est vide !';
    let newH2 = document.createElement('h2');
    productPositionInHtml.appendChild(newH2);
    newH2.innerText = compositionProductCart;
    //On insère 0 dans le html pour la quantité et le prix du panier
    document.getElementById("totalQuantity").innerText = 0;
    document.getElementById("totalPrice").innerText = 0;
}


//___________________________________Contrôle des infos avec Regex et Récupération des données du formulaire____________________________________
    
        //Création des expressions régulières pour contrôler les infos entrées par l'utilisateur
        let textRegex = new RegExp("^[^.?!:;,/\\/_-]([. '-]?[a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$");
        let addressRegex = new RegExp("^[^.?!:;,/\\/_-]([, .:;'-]?[0-9a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$");
        let emailRegex = new RegExp("^[^. ?!:;,/\\/_-]([._-]?[a-z0-9])+[^.?!: ;,/\\/_-][@][a-z0-9]+[.][a-z][a-z]+$");

        //Récupération des coordonnées du formulaire client et mise en variable
        let inputFirstName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAddress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputEmail = document.getElementById('email');

        //Déclaration des variables pour vérifier la bonne valeur des champs du formulaire
        let checkValueFirstName;
        let checkValueLastName;
        let checkValueAddress;
        let checkValueCity;
        let checkValueEmail;
  
        /**
         * Ecoute du contenu du champ "prénom", Vérification du prénom et affichage d'un message si celui-ci n'est pas correct
         * @param { value } firstNameErrorMsg
         * @param { value } checkValueFirstName
         * @param { condition } checkValueFirstName
         * @param { value } errorFirstName
         * @param { message } firstNameErrorMsg
        */
        inputFirstName.addEventListener('change', function() {
            let firstNameErrorMsg = inputFirstName.nextElementSibling;
            checkValueFirstName = textRegex.test(inputFirstName.value);
            if (checkValueFirstName) {
                firstNameErrorMsg.innerText = '';
                errorFirstName = false;
            } 
            else {
                firstNameErrorMsg.innerText = 'Veuillez indiquer un prénom.';
                errorFirstName = true;
            }
        });

        /**
         * Ecoute du contenu du champ "nom", Vérification du nom et affichage d'un message si celui-ci n'est pas correct
         * @param { value } lastNameErrorMsg
         * @param { value } checkValueLastName
         * @param { condition } checkValueLastName
         * @param { value } errorLastName
         * @param { message } lastNameErrorMsg
        */
        inputLastName.addEventListener('change', function() {
            let lastNameErrorMsg = inputLastName.nextElementSibling;
            checkValueLastName = textRegex.test(inputLastName.value);
            if (checkValueLastName) {
                lastNameErrorMsg.innerText = '';
                errorLastName = false;
            }
            else {
                lastNameErrorMsg.innerText = 'Veuillez indiquer un nom de famille.';
                errorLastName = true;
            }
        });

        /**
         * Ecoute du contenu du champ "adresse", Vérification de l'adresse et affichage d'un message si celle-ci n'est pas correcte
         * @param { value } addressErrorMsg
         * @param { value } checkValueAddress
         * @param { condition } checkValueAddress
         * @param { value } errorAdress
         * @param { message } addressErrorMsg
        */
        inputAddress.addEventListener('change', function() {
            let addressErrorMsg = inputAddress.nextElementSibling;
            checkValueAddress = addressRegex.test(inputAddress.value);
            if (checkValueAddress) {
                addressErrorMsg.innerText = '';
                errorAdress = false;
            }
            else {
                addressErrorMsg.innerText = 'Veuillez indiquer une adresse.';
                errorAdress = true;
            }
        });

        /**
         * Ecoute du contenu du champ "ville", Vérification de la ville et affichage d'un message si celle-ci n'est pas correcte
         * @param { value } cityErrorMsg
         * @param { value } checkValueCity
         * @param { condition } checkValueCity
         * @param { value } errorCity
         * @param { message } cityErrorMsg
        */
        inputCity.addEventListener('change', function() {
            let cityErrorMsg = inputCity.nextElementSibling;
            checkValueCity = textRegex.test(inputCity.value);
            if (checkValueCity) {
                cityErrorMsg.innerText = '';
                errorCity = false;
            } else {
                cityErrorMsg.innerText = 'Veuillez indiquer le nom d\'une ville.';
                errorCity = true;
            }
        });

        /**
         * Ecoute du contenu du champ "email", Vérification de l'email et affichage d'un message si celui-ci n'est pas correct
         * @param { value } emailErrorMsg
         * @param { value } checkValueEmail
         * @param { condition } checkValueEmail
         * @param { value } errorEmail
         * @param { message } emailErrorMsg
        */
        inputEmail.addEventListener('change', function() {
            let emailErrorMsg = inputEmail.nextElementSibling;
            checkValueEmail = emailRegex.test(inputEmail.value);
            if (checkValueEmail) {
                emailErrorMsg.innerText = '';
                errorEmail = false;
            }
            else {
                emailErrorMsg.innerText = 'Veuillez renseigner un email correct.';
                errorEmail = true;
            }
        });

//__________________________________________________Affichage des produits du LocalStorage__________________________________________________________

//Si le panier est vide (le localStorage est vide ou le tableau qu'il contient est vide), on affiche "Le panier est vide"
if(productRegisterInLocalStorage === null || productRegisterInLocalStorage.length === 0){
    messagePanierVide(); 
    //Si il y a quand même un click, rappelle que le panier est vide
    boutonCommander.addEventListener("click", (event)=>{
        alert("Votre panier est vide !");
        event.preventDefault();
    });
}

//Si le panier n'est pas vide alors, on affiche le contenu du localStorage
else {
    fetch("http://localhost:3000/api/products")
        .then(response => response.json())
        .then(data => {
            myProducts = data;
            //On récupère la couleur, la quantité et l'id de tous les produits contenus dans le localstorage et on les met dans des variables
            for(let i = 0; i < productRegisterInLocalStorage.length; i++){
                let colorProductCart = productRegisterInLocalStorage[i].colorProduct;
                let idProductCart = productRegisterInLocalStorage[i].idProduct;
                quantityOfProductCart = productRegisterInLocalStorage[i].quantityProduct;
          
                //On ne récupère que les données des canapés dont _id (de l'api) correspondent à l'id dans le localStorage
                const compositionProductCart = data.find((element) => element._id === idProductCart);
                //Récupération du prix de chaque produit que l'on met dans une variable priceProductCart
                priceProductCart = compositionProductCart.price;


                //_________________________________________Début Ajout Balises html_______________________________________________________________

                //Création de la balise article avec comme classe cart__item
                let newArticle = document.createElement('article');
                newArticle.setAttribute("class","cart__item");
                newArticle.setAttribute("data-id",`${idProductCart}`);
                newArticle.setAttribute("data-color",`${colorProductCart}`);
                productPositionInHtml.appendChild(newArticle);

                    //Création de la div avec pour classe cart__item__img
                    let newDivImg = document.createElement('div');
                    newDivImg.setAttribute("class", "cart__item__img");
                    newArticle.appendChild(newDivImg);

                        //Création de la balise image qui contiendra la photo de chaque canapé
                        let newImg = document.createElement('img');
                        newImg.setAttribute("src", compositionProductCart.imageUrl);
                        newImg.setAttribute("alt", compositionProductCart.altTxt);
                        newDivImg.appendChild(newImg);

                    //Création de la div avec pour classe cart__item__content
                    let newDivContent = document.createElement('div');
                    newDivContent.setAttribute("class", "cart__item__content");
                    newArticle.appendChild(newDivContent);   

                        //Création de la div avec pour classe cart__item__content__description
                        let newDivContentDescription = document.createElement('div');
                        newDivContentDescription.setAttribute("class", "cart__item__content__description");
                        newDivContent.appendChild(newDivContentDescription);

                            //Création d'une balise titre h2 qui indique le nom du produit choisi par l'utilisateur
                            let newH2 = document.createElement('h2');
                            newH2.innerText = compositionProductCart.name;
                            newDivContentDescription.appendChild(newH2);

                            //Création d'une balise p qui indique la couleur choisie par l'utilisateur
                            let newPColor = document.createElement('p');
                            newPColor.innerText = colorProductCart;
                            newDivContentDescription.appendChild(newPColor);

                            //Création d'une balise p qui indique le prix du canapé
                            let newPPrice = document.createElement('p');
                            newPPrice.innerText = compositionProductCart.price + " €";
                            newDivContentDescription.appendChild(newPPrice);

                        //Création de la div avec pour classe cart__item__content__settings
                        let newDivContentSettings = document.createElement('div');
                        newDivContentSettings.setAttribute("class", "cart__item__content__settings");
                        newDivContent.appendChild(newDivContentSettings);

                            //Création de la div avec pour classe cart__item__content__settings__quantity
                            let newDivContentSettingsQuantity = document.createElement('div');
                            newDivContentSettingsQuantity.setAttribute("class", "cart__item__content__settings__quantity");
                            newDivContentSettings.appendChild(newDivContentSettingsQuantity);

                                //Création d'une balise p qui indique le texte "Qté :"
                                let newPQuantite = document.createElement('p');
                                newPQuantite.innerText = "Qté :";
                                newDivContentSettingsQuantity.appendChild(newPQuantite);

                                //Création d'une balise input avec la classe "itemQuantity" qui permet de modifier la quantité
                                let newPInput = document.createElement('input');
                                newPInput.setAttribute("type", "number");
                                newPInput.setAttribute("class", "itemQuantity");
                                newPInput.setAttribute("name", "itemQuantity");
                                newPInput.setAttribute("min", "1");
                                newPInput.setAttribute("max", "100");
                                newPInput.setAttribute("value", `${quantityOfProductCart}`);
                                newDivContentSettingsQuantity.appendChild(newPInput);

                            //Création de la div avec pour classe cart__item__content__settings__delete
                            let newDivContentSettingsDelete = document.createElement('div');
                            newDivContentSettingsDelete.setAttribute("class", "cart__item__content__settings__delete");
                            newDivContentSettings.appendChild(newDivContentSettingsDelete);

                                //Création d'une balise p qui indique le prix du canapé
                                let newPDelete = document.createElement('p');
                                newPDelete.setAttribute("class", "deleteItem");
                                newPDelete.innerText = "Supprimer";
                                newDivContentSettingsDelete.appendChild(newPDelete);
  
                //Appel de la fonction pour calculer la quantité totale de produits et le prix total du panier
                totaux();
            }
            //Appel de la fonction Supprimer un produit
            deleteProduct();
            //Appel de le fonction Modifier la quantité d'un produit
            changeQuantity(); 

        });   

    //Ecoute du bouton Commander 
    buttonOrder.addEventListener("click", (event)=>{
      event.preventDefault(); //Empêche le rechargement de la page
      if(productRegisterInLocalStorage === null || productRegisterInLocalStorage.length === 0){ 
            alert("Votre panier est vide !");
      }
      else{
        

        //__________________________________________Gestion du formulaire de contact et validation de la commande________________________________________
        
        //Vérification que tous les champs sont bien renseignés, sinon on indique un message à l'utilisateur
        //Vérification qu'aucun champ ne soit vide
        if(!inputFirstName.value || !inputLastName.value || !inputAddress.value || !inputCity.value || !inputEmail.value){
            alert("Vous devez renseigner tous les champs !");
            event.preventDefault();
        }
        //Vérification que les champs sont correctement remplis suivant les regex mises en place
        else if(errorFirstName === true || errorLastName === true || errorAdress === true
             ||errorCity === true || errorEmail === true){
            alert("Veuillez vérifier les champs du formulaire et les remplir correctement !");
            event.preventDefault();
        }
        else{
            //Récupération des id des produits du panier, dans le localStorage
            let idProducts = [];
            for (let l = 0; l<productRegisterInLocalStorage.length;l++) {
                idProducts.push(productRegisterInLocalStorage[l].idProduct);
            }
            //Création d'un objet dans lequel on met les infos "Contact" et les infos "Produits du panier" (l'id)
            const order = {
                contact: {
                    firstName: inputFirstName.value,
                    lastName: inputLastName.value,
                    address: inputAddress.value,
                    city: inputCity.value,
                    email: inputEmail.value,
                },
                products: idProducts,
            } 
            //On indique la méthode d'envoi des données
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(order)
            }
            //Envoie des données Contact et l'id des produits à l'API
            fetch("http://localhost:3000/api/products/order", options)
            .then((response) => response.json())
            .then((data) => {
                //On redirige vers la page de confirmation de commande en passant l'orderId dans l'URL
                document.location.href = `confirmation.html?orderId=${data.orderId}`;
            })
            .catch((err) => {
                alert ("Un problème a été rencontré lors de l'envoi du formulaire.");
            })
            //----------------------------------------------On vide le localStorage---------------------------------------------------------------
            localStorage.clear();
        }; //fin else
      }
    }); //fin écoute bouton Commander
}; //fin else