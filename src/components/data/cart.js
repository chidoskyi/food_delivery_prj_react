export class Cart {
    cartItems;
    sessionId;
    products; // List of products (meals)

    constructor(cartItems = [], sessionId = '') {
        this.cartItems = cartItems;
        this.sessionId = sessionId;
        this.products = []; // Initialize as empty, to be populated later dynamically
        this.#loadFromSessionStorage();
    }

    #loadFromSessionStorage() {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
        const storedSessionId = localStorage.getItem('sessionId');

        if (storedCartItems) {
            this.cartItems = storedCartItems;
        }

        if (storedSessionId) {
            this.sessionId = storedSessionId;
        }

        // Fallback to default cart items if no items are stored
        if (!this.cartItems || !this.cartItems.length) {
            this.cartItems = [];
        }
    }

    #saveToSessionStorage() {
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        localStorage.setItem('sessionId', this.sessionId);
    }

    #getProductById(id) {
        // Dynamically search for the product by id from the current product list
        return this.products.find(product => product.id === id);
    }

    // Dynamically set the products list
    setProducts(products) {
        this.products = products;
    }

    addToCart(productId) {
        const productDetails = this.#getProductById(productId);
        if (!productDetails) {
            console.error("Product not found");
            return;
        }

        const existingItem = this.cartItems.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            const newItem = { 
                productId: productId, 
                quantity: 1, 
                title: productDetails.title,
                price: productDetails.price,
                image: productDetails.image_url || productDetails.image,
                deliveryOptionId: '1' // Default delivery option
            };
            this.cartItems.push(newItem);
        }

        this.#saveToSessionStorage();
    }

    

    removeFromCart(productId) {
        const itemIndex = this.cartItems.findIndex(item => item.productId === productId);
        if (itemIndex !== -1) {
            this.cartItems.splice(itemIndex, 1);
            this.#saveToSessionStorage();
        }
    }

    updateQuantity(productId, newQuantity) {
        const item = this.cartItems.find(item => item.productId === productId);
        if (item) {
            item.quantity = newQuantity;
            this.#saveToSessionStorage();
        }
    }
}


// Example usage:
const cart = new Cart();
console.log(cart.cartItems); // Log cart items with complete details
