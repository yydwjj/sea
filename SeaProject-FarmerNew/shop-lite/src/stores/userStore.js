// stores/userStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useUserStore = defineStore('user', {
  state: () => ({
    isFamer: false,
    isCustomer: false, 
    isWholesalers:true,
    isWholesalers2:false, //Wholesalers 现在是 直营店/加盟商端 Wholesalers2现在才是批发商端
    cart:[]
  }),
  actions: {
    switchToCustomer() {
      this.isCustomer = true;
      this.isFamer = false;
      this.isWholesalers = false;
      this.isWholesalers2 = false;
    },
    switchToFamer() {
      this.isCustomer = false;
      this.isFamer = true;
      this.isWholesalers = false;
      this.isWholesalers2 = false;
    },
    switchToWholesaler() {
      this.isCustomer = false;
      this.isFamer = false;
      this.isWholesalers = true;
      this.isWholesalers2 = false;
    },
    switchToWholesalers2() {
      this.isCustomer = true;
      this.isFamer = false;
      this.isWholesalers = false;
      this.isWholesalers2 = true;
    },
    addToCart(product) {
      const existing = this.cart.find(item => item.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.cart.push({
          ...product,
          quantity: 1,
          addedAt: new Date().toISOString()
        });
      }
      this.saveCart();
    },
    removeFromCart(productId) {
      this.cart = this.cart.filter(item => item.id !== productId);
      this.saveCart();
    },
    updateQuantity(productId, newQuantity) {
      const item = this.cart.find(item => item.id === productId);
      if (item) {
        item.quantity = Math.max(1, newQuantity);
        this.saveCart();
      }
    },
    clearCart() {
      this.cart = [];
      this.saveCart();
    },
    // 持久化存储
    saveCart() {
      localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    },
    initialize() {
      const savedCart = localStorage.getItem('shoppingCart');
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    }

  },
  // getters: {
  //   totalItems: (state) => state.cart.reduce((sum, item) => sum + item.quantity, 0),
  //   totalPrice: (state) => state.cart.reduce((sum, item) => {
  //     const price = parseFloat(item.price.split('/')[0].replace('￥', ''));
  //     return sum + (price * item.quantity);
  //   }, 0)
  // }
});

// const userStore = useUserStore();
// userStore.initialize();