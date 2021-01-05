// Function pour afficher le nombre d'item dans le panier sur l'icone panier

function countCartItems(){

    let cartTeddies = JSON.parse(localStorage.getItem('cartTeddies'));

    if (cartTeddies) {
    const count = cartTeddies.reduce((sum, item) => sum += item.teddyQuantity, 0)
    document.getElementById('totalQuantity').textContent = count;
    }
};


