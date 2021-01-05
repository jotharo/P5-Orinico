// RECUPERATION DES DONNEES RECAPITULATIVES > Order ID + total du prix

// Récupération de l'id de la commande

let orderId = sessionStorage.getItem('orderId')

// Récupération du prix total de la commande

let totalPrice = sessionStorage.getItem('totalPrice')

// Récupération des informations du contact

const contact = JSON.parse(sessionStorage.getItem("contact"));




// AFFICHAGE DU RECAPITULATIF > Order ID + total du prix

// Création de la zone de récupération des données

const app = document.getElementById('confirmation');

const container = document.createElement('div');
container.setAttribute('class', 'jumbotron');
container.setAttribute('id', 'recap', );

app.appendChild(container);

// Affichage des données
const merci = document.createElement('h1');
merci.textContent = 'Merci pour votre confiance '+ `${contact.firstName}` + " " +"!";

const h3 = document.createElement('h3');
h3.textContent = 'Récapitulatif de votre commande '+' '+':';

const order = document.createElement('p');
order.textContent = 'Numméro de commande : '+ orderId;

const total = document.createElement('p');
total.textContent = 'Total de votre commande : '+ totalPrice + '$';



// Mise en page des éléments

container.appendChild(merci);
container.appendChild(h3);
container.appendChild(order);
container.appendChild(total);

// FIN DU PARCOURS CLIENT > On efface le localStorage

//localStorage.clear()
