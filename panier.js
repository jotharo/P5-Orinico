
// Création de la zone d'affichage des données récupérées

const app = document.getElementById('cartDisplay');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

// 1 - AFFICHAGE DU CONTENU DU PANIER

//Paramétrage de la fonction de récupération des données des produits sélectionnés enregistrés dans le localStorage

function getCartTeddies() {
    let cartTeddies = JSON.parse(localStorage.getItem('cartTeddies'));
    return cartTeddies;
}

let cartTeddies = getCartTeddies()

countCartItems()
showMyForm()

//Etape IF -Si le panier est vide > On affiche " Votre panier est vide "
if (cartTeddies == undefined || cartTeddies.length === 0) {
    var div = document.createElement('div');
    div.setAttribute('id','panierVide')

    var panierVide = document.createElement('h2');
    panierVide.textContent = " Votre panier est vide !";

    container.appendChild(div); 
    div.appendChild(panierVide) 

    
//Etape ELSE -Si le panier contient au moins un produit > On récupère les produits > Affichage des détails
} else {

    //BOUTON DELETE ALL > POUR SUPPRIMER TOUT LE PANIER

    // Création du bouton supprimer la totalité du panier d'un click
    const btnDeleteAll = document.createElement('button');
    btnDeleteAll.setAttribute('class', 'btn btn-danger');
    btnDeleteAll.id = "deleteAll"
    btnDeleteAll.textContent = "Supprimer le panier ?";


    // Création de la fonction pour supprimer la totalité du panier d'un click

    function deleteCart(event) {
        event.preventDefault();
        var result = confirm("Êtes-vous sûre de vouloir supprimer la totalité du panier ?");
            if (result) {
                localStorage.clear()    
                alert('Votre panier est vide !')
                location.reload();
            }
    }// Fin de la fonction deleteCart

    btnDeleteAll.addEventListener("click", deleteCart)

    // Création HTML du bouton deleteAll
    app.appendChild(btnDeleteAll);

    //AFFICHAGE DU TOTAL DU PANIER 

    // Variable où l'on va stocker le prix total 
    var sum = null;   
  
    // The JavaScript Array.prototype specifies a built-in method called
    cartTeddies.forEach(function(value){
    sum += value.teddyQuantity*value.teddyPrice;
    });

    console.log(sum);

    const totalPrice = document.createElement('p');
    totalPrice.setAttribute('id', 'totalPrice');
    totalPrice.textContent = "Total avant frais de port : " + sum + " " + "$";

    // Création HTML de la div totalPrice
    //app.appendChild(totalPrice);


    //AFFICHAGE DU CONTENU DU PANIER

    Object.values(cartTeddies).map( (cartTeddy) => {
            // Affichage d'une ligne avec détails par produit différents (même nom + même couleur = une ligne produit)

            const totalTeddy = cartTeddy.teddyPrice * cartTeddy.teddyQuantity;

            var ligneProduit = document.createElement('div');
            ligneProduit.setAttribute('class', 'row');
        
            var img = document.createElement('img');
            img.style.height ="100px"
            img.style.width ="150px"
            img.alt = "Photo du nounours" + cartTeddy.teddyName;
            img.src = cartTeddy.teddyImage;
        
            var nomTeddy = document.createElement('h3');
            nomTeddy.textContent = cartTeddy.teddyName +" "+ cartTeddy.teddyColor;
        
            var p = document.createElement('p');
            p.textContent = `${totalTeddy}`+' '+'$';

            var cartQuantity = document.createElement('p');
            cartQuantity.setAttribute('id', 'quantity');
            cartQuantity.textContent = 'x' + `${cartTeddy.teddyQuantity}`;

            //BOUTON DELETE > Supprimer un/1 objet

            // Création du bouton Supprimer rattaché à sa ligne produit
            const btnDelete = document.createElement('button');
            btnDelete.id = "deleteCart";
            
            const trashCan = document.createElement('span');
            trashCan.setAttribute('class', 'material-icons', );
            trashCan.innerHTML = "delete_outline";
            



            // Création de la fonction de suppression d'item > Active à l'écoute du click du bouton btnDelete
            function deleteItem(event) {
                event.preventDefault()
                if (cartTeddy.teddyQuantity >= 1) {
                    cartTeddy.teddyQuantity--
                    if (cartTeddy.teddyQuantity === 0) {
                        const index = cartTeddies.indexOf(cartTeddy)
                        cartTeddies.splice(index, 1)
                    }
                } 

                //Enregistrement du nouveau localStorage
                localStorage.setItem('cartTeddies', JSON.stringify(cartTeddies))
                JSON.parse(localStorage.getItem('cartTeddies'))

                alert('Cet article a bien été supprimé !')
                window.location.href = "panier.html"
            }// Fin de la fonction deleteItem

            btnDelete.addEventListener('click', deleteItem)

            
            // Affichage html du contenu du panier créé précedemment

            container.appendChild(ligneProduit);
            container.appendChild(totalPrice);  
            ligneProduit.appendChild(img);                   
            ligneProduit.appendChild(nomTeddy);         
            ligneProduit.appendChild(p);
            ligneProduit.appendChild(cartQuantity);
            ligneProduit.appendChild(btnDelete);
            btnDelete.appendChild(trashCan)
            
    })// Fin de l'affichage du contenu du panier
} // Fin de la boucle else et de la partie 1 Affichage du panier


// 2 - FORMULAIRE DE COMMANDE

// AFFICHAGE DU FORMULAIRE

//Fonction showMyForm > Va rendre apparent le form seulement si il y a quelque chose dans le panier 

function showMyForm() {  
    var myForm = document.getElementById('formInfos');
    if (cartTeddies == undefined || cartTeddies.length === 0) {
    myForm.style.display = 'none';
    } else {
        myForm.style.display = 'block';
    }
}

// RECUPERATION DES DONNEES DU FORMULAIRE + PANIER > ENVOI A L'API

function sendData() {

    // Récupération des informations client rentrées dans le formulaire
    // Variable - Stockage des informations client dans une variable "contact"

    let contact = {
        firstName : document.getElementById('firstName').value,
        lastName : document.getElementById('lastName').value,
        address : document.getElementById('address').value,
        city : document.getElementById('city').value,
        email : document.getElementById('email').value
    };

    // Variable - Stockage des informations panier dans une variable "products" qui contient un tableau de string

    let products = [ ]

    // Récupération des ID des produits dans le panier > PUSH des ID dans l'array "products"

    cartTeddies.forEach(cartTeddy =>{
        products.push(cartTeddy.teddyId)
    })

    // Création d'un objet regroupant les informations de contact + contenu du panier >  à envoyer à l'API

    const objet = {
    contact,
    products,
    };

    // Envoi de l'objet à l'API

      fetch('http://localhost:3000/api/teddies/order', {
        method: "POST",
        body: JSON.stringify(objet),
        headers: {"Content-type": "application/json"}
    })
    .then(res => res.json())
    .then( r => {
        sessionStorage.setItem('contact', JSON.stringify(r.contact));
        sessionStorage.setItem('orderId', JSON.stringify(r.orderId));
        sessionStorage.setItem('totalPrice', JSON.stringify(sum));
        //Redirection vers Accueil
        window.location.href = "confirmation.html";
        // Efface localStorage
        localStorage.clear()
      
    })
    .catch(err => console.log(err))

}// Fin de la fonction sendData


// Validation de la commande > Envoi du formulaire au click du bouton submit du formulaire

document.getElementById('formInfos').addEventListener('submit', function(e){
    e.preventDefault();
    sendData();
})




  


  




