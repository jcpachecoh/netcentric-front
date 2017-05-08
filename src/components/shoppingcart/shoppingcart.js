

var SHOPPINGCART = {};
SHOPPINGCART.model = {};

SHOPPINGCART.model.ShoppingCart = function(options) {
  // initializes the cart
  this.items = {};
  this.totalValues= {};
  
  // callbacks
  var defaults = {
    removeAll: function() {},
    updateTotal: function() {},
        updateItemQuantity: function() {},
        removeItem: function() {}
  };
  
  // merge options with defaults
  for (property in defaults) { 
    if (!options.hasOwnProperty(property)) { 
      options[property] = defaults[property]
    } 
  }
  
  this.options = options;
}

// removes all items from the cart
SHOPPINGCART.model.ShoppingCart.prototype.clear = function() {
  this.items = {};
  this.options.removeAll();
  this.options.updateTotal();
}

SHOPPINGCART.model.ShoppingCart.prototype.removeI=function(id){
   if (this.items.hasOwnProperty(id)) {
       var item = this.items[id];
       delete this.items[id];
   }
     this.options.updateTotal();

}

// returns the value of all items in the cart
SHOPPINGCART.model.ShoppingCart.prototype.total = function() {
  var beforeVAT = 0.0;
  var afterVAT=0.0
  var vat=0.2;
  for (var index in this.items) {
    var item = this.items[index];
    beforeVAT = beforeVAT + (item.price * item.quantity);
    afterVAT=beforeVAT+(beforeVAT*vat);
  }
  this.totalValues= { beforeVAT : beforeVAT, afterVAT : afterVAT,VAT: vat };
  return beforeVAT;
}

// returns the number of unique items in the cart
SHOPPINGCART.model.ShoppingCart.prototype.itemsCount = function() {
  var size = 0, key;
    for (key in this.items) {
        if (this.items.hasOwnProperty(key)) size++;
    }

  return size;
}

// returns whether the cart is empty or not
SHOPPINGCART.model.ShoppingCart.prototype.isEmpty = function() {
  return this.itemsCount() == 0;
}
  
// adds a new item to the cart or increases the quantity of an existing item
SHOPPINGCART.model.ShoppingCart.prototype.add = function(id, price, quantity) {
  var is_new;
  quantity = (typeof(quantity) != 'undefined') ? quantity : 1;
  if (this.items.hasOwnProperty(id)) {
    var item = this.items[id];
    item.quantity = item.quantity + quantity;
    this.options.updateItemQuantity(id);
    this.options.updateTotal();
    is_new = false;
  }
  else {
      this.items[id] = { quantity : quantity, price : price };
      this.options.updateTotal();
      is_new = true;
    }
  
    return is_new;
}
    
// increases the quantity of an item in the cart
SHOPPINGCART.model.ShoppingCart.prototype.increase = function(id, quantity) {
  quantity = (typeof(quantity) != 'undefined') ? quantity : 1;
  if (this.items.hasOwnProperty(id)) {
    var item = this.items[id];
    item.quantity = item.quantity + quantity;
    this.options.updateTotal();
  }
}
    
// decreases the quantity of an item in the cart
SHOPPINGCART.model.ShoppingCart.prototype.decrease = function(id, quantity) {
  quantity = (typeof(quantity) != 'undefined') ? quantity : 1;
  if (this.items.hasOwnProperty(id)) {
    var item = this.items[id];
    if (item.quantity >= quantity) {
        item.quantity = item.quantity - quantity;
      }
      else {
        item.quantity = 0;
      }
    if (item.quantity == 0) {
      delete this.items[id];
      this.options.removeItem(id);
    }
    this.options.updateTotal();
  }
}
    
// returns the quantity of an item in the cart
SHOPPINGCART.model.ShoppingCart.prototype.quantityFor = function(id) {
  return this.items.hasOwnProperty(id) ? this.items[id].quantity : 0;
} 
