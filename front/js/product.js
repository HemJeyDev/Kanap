//Récupération de l'ID du produit dans l'URL
const productId = new URLSearchParams(window.location.search).get("id");

//Si on a bien récupéré un id, récupération des données de l'API correspondant à cet id 
if (productId !== null){
fetch(`http://localhost:3000/api/products/${productId}`)
  .then(response => response.json())
  .then(selectProduct => {

//Affichage sur la page product.html du canapé sélectionné sur la page d'accueil, à partir de l'id de l'URL

    // Ajout nom du produit dans la balise title
    document.title = selectProduct.name;
    // Création d'une balise img manquante
    const img = document.createElement("img");
    // Récupération des données de l'API et destination des éléments dans html
    img.src = selectProduct.imageUrl;
    img.alt = selectProduct.altTxt;
    document.getElementsByClassName("item__img")[0].appendChild(img);
    document.getElementById("title").innerText = selectProduct.name;
    document.getElementById("price").innerText = selectProduct.price + " ";
    document.getElementById("description").innerText = selectProduct.description;

    // Boucle forEach pour ajouter les couleurs en option du html select
    selectProduct.colors.forEach(function (color) {
        const option = document.createElement("option");
        const select = document.getElementById("colors");
    
        // Récupération des données de l'API
        option.value = color;
        option.innerText = color;
    
        // Ajout de option à select html
        select.appendChild(option);
    })

// Récupération des données sélectionnées par l'utilisateur pour l'envoi vers le panier

    //Sélection du bouton Ajouter au panier puis écoute pour envoyer choix de l'utilisateur
    const selectButtonCart = document.querySelector("#addToCart");
        selectButtonCart.addEventListener("click", (event)=>{
            event.preventDefault();
            // Sélection de l'id pour le choix de couleur et insertion de la couleur choisie par l'utilisateur dans une variable
            const colorId = document.querySelector("#colors");
            choiceColor = colorId.value;
            // Sélection de l'id pour le choix de quantité et insertion de la quantité choisie par l'utilisateur dans une variable
            const quantity = document.querySelector("#quantity");
            choiceQuantity = Number(quantity.value);

           // Récupération des données (id, couleur et quantité) après les choix faits par l'utilisateur,
           //Condition que la couleur soit bien sélectionnée,
           //que la quantité indiquée par l'utilisateur soit comprise entre 1 et 100
           //et que la quantité entrée par l'utilisateur soit un nombre entier
            if (choiceColor !== "" && choiceQuantity > 0 && choiceQuantity <= 100 && Number.isInteger(choiceQuantity)) {
                let optionsProduct = {
                    idProduct: selectProduct._id ,
                    colorProduct: choiceColor ,
                    quantityProduct: choiceQuantity
                }

                //------------------------------Local Storage------------------------------
                //Création de variable pour afficher un message lors de l'ajout d'un produit
                let messageLocalStorageUpdating = false;
                //Fonction ajouter un produit sélectionné par l'utilisatueur, avec id, couleur, quantité
                const addProductLocalStorage = () => {
                    
                    // Si produit et couleur existent déjà, alors uniquement quantité
                    let findProduct = productRegisterInLocalStorage.find((x) => {return x.idProduct === optionsProduct.idProduct && x.colorProduct === optionsProduct.colorProduct});
                    if(findProduct){
                        const total = Number(findProduct.quantityProduct) + Number(optionsProduct.quantityProduct);
                        if(total <= 100){
                            //Variable message sur false pour pouvoir afficher un message approprié
                            messageLocalStorageUpdating = false;
                            findProduct.quantityProduct = Number(findProduct.quantityProduct) + Number(optionsProduct.quantityProduct);
                            alert(`La quantité de ${selectProduct.name} de couleur ${choiceColor} a bien été mise à jour.`);
                        }
                        else{
                            //Variable message sur false pour pouvoir afficher un message approprié
                            messageLocalStorageUpdating = false;
                            alert("La quantité d'un article de même référence et de même couleur ne peut pas dépasser 100. Merci de rectifier la quantité choisie.");
                        }
                    }
                    //Si le produit et la couleur choisis n'existent pas alors on ajoute les options dans le local storage
                    else{
                        //Variable message sur true pour afficher celui-ci
                        messageLocalStorageUpdating = true;
                         //Options du produit choisi dans une variable "productRegisterInLocalStorage"
                         productRegisterInLocalStorage.push(optionsProduct);
                    }
                    
                    //Transformation format JSON et envoi des infos dans la clé "produit" du localStorage
                    localStorage.setItem("product", JSON.stringify(productRegisterInLocalStorage))
                    
                    document.location.href = 'cart.html'
                }

                //Variable "productRegisterInLocalStorage" récupération des keys et des values dans localStorage contrôle si localStorage est vide ou non
                let productRegisterInLocalStorage = JSON.parse(localStorage.getItem("product"));
                //JSON.parse pour convertir les données au format JSON qui sont dans le localStorage en objet javascript

                 //Si localStorage contient déjà une clé "product"
                if(productRegisterInLocalStorage){
                    addProductLocalStorage();
                }
                //Si localStorage est vide
                else{
                    productRegisterInLocalStorage = [];
                    addProductLocalStorage();
                    //Variable message sur false pour pouvoir afficher un message approprié
                    messageLocalStorageUpdating = false;
                    alert(`Vous venez d'ajouter votre premier produit dans le panier ! `);
                }
                //Si variable messageLocalStorageUpdating est vrai alors message :
                if(messageLocalStorageUpdating){
                    alert(`La quantité de ${selectProduct.name} de couleur ${choiceColor} a bien été ajouté au panier.`);
                }

            }
            //Si couleur non selectionné ou quantité non comprise entre 1 et 100 alors on affiche un message d'alerte
            else {
                alert(`Oups ! La couleur n'a pas été sélectionnée ou la quantité n'est pas un nombre entié compris entre 1 et 100. Veuillez vérifier vos choix !`);
            }
        });
    })
    .catch((err) => {
        alert(`Le produit que vous avez sélectionné n'a pas été trouvé !`);
        window.location.href = "index.html";
    })
}
else{
    alert(`Le produit que vous avez sélectionné n'a pas été trouvé !`);
    window.location.href = "index.html";
 }
 