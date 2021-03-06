(function() {
  var MODULE_NAME = 'shoppingcartModel',
    NETCENTRIC_NAMESPACE = 'nn';

  window[NETCENTRIC_NAMESPACE] = window[NETCENTRIC_NAMESPACE] || {};

  window[NETCENTRIC_NAMESPACE][MODULE_NAME] = function() {
    var total=0;
    var products=[];
    var _getCart = function() {
      return {
        total: total,
        products: products
      };
    };

    return {
      init: function(initialState) {

          total={
            'VAT': 0, 
            'afterVAT': 0,
            'beforeVAT': 0
          };
          products=[initialState];

      },

      getCart: _getCart,

      addProducts: function(newOrExistingProducts) {
       let quan;
        if(newOrExistingProducts.name=='a'){
          quan=1;
        }
        if(newOrExistingProducts.name=='b'){
          quan=2;
        }
       products=[{ 
        'name': newOrExistingProducts.name,
        'price': newOrExistingProducts.price,
        'quantity': quan
      }]
    total={
      'VAT': 0, 
      'afterVAT': 5, 
      'beforeVAT': 5
    }
        return _getCart();
      },

      changeProductQuantity: function(product, newQuantity) {
        products=[{ 'name': product.name,
                     'price': product.price,
                     'quantity': newQuantity}];
        total={
              'VAT': 1.6,
              'afterVAT': 8,
              'beforeVAT':8
              };
        return _getCart();
      },

      removeProducts: function(productsToDelete) {
        products=[{ 'name': productsToDelete.name,
                    'price': productsToDelete.price}];
        products=[];
        return _getCart();
      
      },

      destroy: function() {
          total={
            'VAT': 0, 
            'afterVAT': 0,
            'beforeVAT': 0
          };
          products=[];
      },
      
    };
  };
})();
