const blocCanape = document.getElementById("items"); //variable

fetch("http://localhost:3000/api/products/") //récupération des donnés via requête API
	.then((response) => response.json()) //conversion des données en JSON pour JS
	.then((data) => {
		//data pour tableau
		for (let champ of data) {
			//boucle pour importer chaque champ du JSON et lui attribuer une variable
			const idCanape = champ._id;
			const imageCanape = champ.imageUrl;
			const altTexte = champ.altTxt;
			const nomCanape = champ.nom;
			const descriptionCanape = champ.description;
			blocCanape.innerHTML += `<a href="./product.html?id=${idCanape}">
        <article>
          <img src="${imageCanape}" alt="${altTexte}">
            <h3 class="productName">${nomCanape}</h3>
            <p class="productDescription">${descriptionCanape}</p>
        </article>
    								</a>`; //photo et info insérer comme indiqué dans html 
		}
	})