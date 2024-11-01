document.addEventListener("DOMContentLoaded", function() {
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function addToCart(product, price) {
        cart.push({ product, price });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }

    function updateCart() {
        const cartItems = document.getElementById('cart-items');
        const totalPrice = document.getElementById('total-price');
        if (!cartItems || !totalPrice) return;

        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.product} - R$ ${item.price.toFixed(2)}`;
            cartItems.appendChild(li);
            total += item.price;
        });
        totalPrice.textContent = `Total: R$ ${total.toFixed(2)}`;
    }

    function clearCart() {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const product = this.dataset.product;
            const price = parseFloat(this.dataset.price);
            addToCart(product, price);
        });
    });

    window.loadCart = updateCart;



    const stars = document.querySelectorAll('.star');

    

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            const siblings = this.parentNode.children;
            for (let i = 0; i < siblings.length; i++) {
                siblings[i].classList.remove('selected');
            }
            this.classList.add('selected');
            let nextSibling = this.nextElementSibling;
            while (nextSibling) {
                nextSibling.classList.add('selected');
                nextSibling = nextSibling.nextElementSibling;
            }
        });
    });
    

    

    window.addToCart = function(product, price) {
        cart.push({ product, price });
        saveCart();
        updateCart();
        showAddToCartFeedback(product);
    }

    window.clearCart = function() {
        cart = [];
        saveCart();
        updateCart();
    }

    window.completePurchase = function() {
        alert('Compra finalizada com sucesso!');
        clearCart();
    }
    /*
    function updateCart() {
        const cartItems = document.getElementById('cart-items');
        const totalPrice = document.getElementById('total-price');
        if (!cartItems || !totalPrice) {
            console.error("Elemento 'cart-items' ou 'total-price' não encontrado");
            return;
        }
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.product} - R$ ${item.price.toFixed(2)}`;
            cartItems.appendChild(li);
            total += item.price;
        });
        totalPrice.textContent = `Total: R$ ${total.toFixed(2)}`;
    }

    function clearCart() {
        cart = [];
        saveCart();
        updateCart();
    }

    function completePurchase() {
        alert('Compra finalizada com sucesso!');
        clearCart();
    }
    */
    // Função para filtro de categoria
    function filterByCategory(category) {
        const products = document.querySelectorAll('.produto');
        products.forEach(product => {
            if (category === 'all' || product.classList.contains(category)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Adicionar event listeners aos botões de categoria
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = button.dataset.category;
            filterByCategory(category);
        });
    });

    // Função para filtro de preço
    const products = document.querySelectorAll('.produto');

    function filterByPrice() {
        const minPrice = parseFloat(document.getElementById('min-price').value);
        const maxPrice = parseFloat(document.getElementById('max-price').value);
        
        products.forEach(product => {
            const price = parseFloat(product.querySelector('p').textContent.replace('R$', ''));
            if (price >= minPrice && price <= maxPrice) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    document.getElementById('min-price').addEventListener('input', filterByPrice);
    document.getElementById('max-price').addEventListener('input', filterByPrice);
    
    window.filterByPrice = filterByPrice;

    // Função para mostrar feedback ao adicionar ao carrinho
    function showAddToCartFeedback(product) {
        const feedbackElement = document.createElement('div');
        feedbackElement.className = 'add-to-cart-feedback';
        feedbackElement.textContent = `${product} adicionado ao carrinho!`;
        document.body.appendChild(feedbackElement);

        setTimeout(() => {
            feedbackElement.classList.add('fade-out');
            feedbackElement.addEventListener('transitionend', () => {
                feedbackElement.remove();
            });
        }, 2000);
    }

    

    // Função para salvar o carrinho no localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Função para carregar o carrinho do localStorage
    function loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCart();
        }
    }
    window.loadCart = loadCart;

    const searchBar = document.getElementById('search-bar');
    const searchBtn = document.getElementById('search-btn');
    
    searchBtn.addEventListener('click', function() {
        const query = searchBar.value.toLowerCase();
        const products = document.querySelectorAll('.produto');
        
        products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(query)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
    
    searchBar.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchBtn.click();
        }
    });

});

