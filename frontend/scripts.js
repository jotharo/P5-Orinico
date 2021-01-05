// Création de la zone de récupération des données
const app = document.getElementById('products');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

// Connexion à l'API
var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/api/teddies', true);
request.onload = function () {

  // Récupération des données JSON
  var data = JSON.parse(request.response);
  if (request.readyState == request.DONE && request.status == 200) {
    data.forEach(teddy => {

      // Affichage de la liste des articles teddies
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const imgWrapper = document.createElement('div');
      imgWrapper.setAttribute('class', 'imgWrapper');


      const img = document.createElement('img');
      img.alt = "Photo du nounours" + teddy.name;
      img.src = teddy.imageUrl;

      const h1 = document.createElement('h1');
      h1.textContent = teddy.name;

      const p = document.createElement('p');
      teddy.description = teddy.description.substring(0, 300);
      p.textContent = `${teddy.description}...`;

      const h2 = document.createElement('h2');
      h2.textContent = teddy.price / 100 + " $";

      const link = document.createElement('a');
      link.id = "link-product";
      link.href = 'produit.html?id=' + teddy._id;
      link.textContent = "Personnalisez" +" "+teddy.name+" "+"!";

      // Mise en page des éléments
      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(imgWrapper);
      imgWrapper.appendChild(img);
      card.appendChild(p);
      card.appendChild(h2);
      card.appendChild(link)
      
      
    });

    // Mise en place du message d'erreur
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Mais, où est passé cet ourson ?`;
    app.appendChild(errorMessage);
  }
  
  countCartItems();
}

request.send();





