// Création de la zone de récupération des données
const app = document.getElementById('productTeddy');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

//Paramétrage de la fonction de récupération des données du produit sélectionné

// Récupération de l'URL > Paramètre 1 pour créer notre fonction fetchTeddy
const apiURL= "http://localhost:3000/api/teddies/"

// Récupération de l'id produit dans l'URL > Paramètre 2 pour créer notre fonction fetchTeddy
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
let currentTeddy
let select
console.log(id)

// Création de la constante fetchTeddy pour récupérer les données du Teddy sélectionné grâce à URL + id spécifique au Teddy
const fetchTeddy = fetch (apiURL + id) 

    // Instructions d'ajout du Teddy au Panier 

   
    function addToCart(event) {
        event.preventDefault()

        // Variable - Stockage du teddy sélectionné + couleur choisit dans le localStorage
        let selectedTeddy = {
            teddyName: currentTeddy.name,
            teddyId: currentTeddy._id,
            teddyColor: select.value,
            teddyQuantity: 1,
            teddyPrice: currentTeddy.price / 100,
            teddyImage : currentTeddy.imageUrl,
        }

        // Variable - On créé un localStorage teddiesInCart ou un array vide si null  >>>>LE PROBLEME EST LA ???
       
        let cartTeddies = JSON.parse(localStorage.getItem('cartTeddies')) || [];

        let teddy = cartTeddies.find(item => {
            return item.teddyId === selectedTeddy.teddyId && item.teddyColor === selectedTeddy.teddyColor
        })

        // L'ours n'a pas été trouvé il faut l'ajouter a la liste
        if (teddy == undefined) {

            cartTeddies.push(selectedTeddy)
            

        }

        // L'ours a été trouvé on met a jour sa quantité
        else {
            teddy.teddyQuantity++
        }

      

        // On traduit/stringify le contenu de cartTeddies et on l'ajoute au localStorage  "teddiesInCart" 
        localStorage.setItem("cartTeddies", JSON.stringify(cartTeddies)); 

        countCartItems();
        
        window.confirm(selectedTeddy.teddyName + " " + selectedTeddy.teddyColor + ' a bien été ajouté à votre panier! Souhaitez-vous continuer vos achats? ')
    
    }

// Lancement de la fonction fetchTeddy
fetchTeddy.then(response => {
    return response.json();
}).then(teddy => {

    currentTeddy = teddy

    // Affichage des éléments de l'article unique Teddy
    var card = document.createElement('div');
    card.setAttribute('class', 'card');

    var img = document.createElement('img');
    img.alt = "Photo du nounours" + teddy.name;
    img.src = teddy.imageUrl;

    var h1 = document.createElement('h1');
    h1.textContent = teddy.name;

    var h2 = document.createElement('h2');
    h2.textContent = teddy.price / 100 + " $";

    var p = document.createElement('p');
    teddy.description = teddy.description.substring(0, 300);
    p.textContent = `${teddy.description}...`;

    // Création du Dropdown > Choix de la couleur du Teddy
    var label = document.createElement('label');
    label.textContent = 'Personnalisez la couleur de '+" "+ teddy.name+" ";
    label.for = 'Personnalisez la couleur de ' + teddy.teddyName ;

    select = document.createElement('select');
    select.name = 'choixCouleur';
    select.id = 'choixCouleur';
    label.appendChild(select);
  
    // Dropdown : Récupération des couleurs du Teddy
    const colors = teddy.colors    
                         
            // Dropdown : L'instruction for...of va créer une boucle Array qui parcourt un objet itérable (l'array des couleurs) et va éxecuter des instructions pour la valeur de chaque propriété.
    for (const color of colors) {                                    //  for (variable of iterable) 
        var option = document.createElement('option');               //      instructions
        option.value = color;
        option.textContent = color;
        select.appendChild(option);
        }

    // Bouton d'ajout du Teddy au Panier
    const btnPanier = document.createElement('button');
    btnPanier.id = "addCart"
    btnPanier.textContent = "Acheter";
    btnPanier.setAttribute('class', 'btn btn-light');


    //Ecoute de l'évènement sur le bouton
    btnPanier.addEventListener("click", addToCart)

    countCartItems();

    // Mise en page des éléments
    container.appendChild(card);
    card.appendChild(h1);
    card.appendChild(img);
    card.appendChild(h2);
    card.appendChild(p);
    card.appendChild(label);
    card.appendChild(btnPanier);
});






