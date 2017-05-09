
/* eslint-disable */
// create a shopping cart instance, set all callbacks
var myShoppingCart = new SHOPPINGCART.model.ShoppingCart({ removeItem : removeItem,
	                                                         updateTotal : updateCartTotal,
	                                                         updateItemQuantity : updateItemQuantity });	
// shopping cart UI callbacks
function updateItemQuantity(id) {
	$('#qty_'+id).val( function(i, oldval) {
    	return parseInt( oldval, 10) + 1;
	});		
}
function updateCartTotal() {
	var basicTotal=myShoppingCart.total().toFixed(2);
	var vat=getVAT(basicTotal);
	var total=myShoppingCart.total()+vat;
	vat=vat.toFixed(2);
	total=parseFloat(total).toFixed(2);

	$('#basicTotal').text(basicTotal);
	$('#VAT').text(vat);
	$('#total').text(total);
}
function getVAT(val){
	var vat=val*0.2;
	return vat;
}

function removeItem(id) {
	//$('#shoppingcart_' + id).effect("puff", {}, "slow", function(){  });x
	$('#shoppingcart_' + id).remove();
	myShoppingCart.removeI(id);
}




function increase(id){
	myShoppingCart.increase(id);
	var $input = $('#qty_'+id);
	$input.val( +$input.val() + 1 );
}
function decrease(id){
	myShoppingCart.decrease(id);
	var $input = $('#qty_'+id);
	$input.val( +$input.val() - 1 );
	

}
function updateFooter(){
	$('#footer').css("margin-top","500px");
}

var row = '<tr id="shoppingcart_{{id}}">'+
			    '<td><h3>{{name}}</h3>'+
			    '<p>{{description}}</p>'+
			    ' <div><button onClick="removeItem({{id}})">Remove</button></div></td>'+
			    '<td> <output>&euro;{{price}}</output></td>'+
			    '<td> <input type="number" id="qty_{{id}}" min="1" value="1" readOnly="true">'+
	                '<span>'+
	               '<button type="button"  onclick="decrease({{id}})" aria-label="decrease">-</button>'+
	                '<button type="button"  onclick="increase({{id}})" aria-label="step up">+</button></span></td>'+
			'</tr>';




String.prototype.compose = (function (){
    var re = /\{{(.+?)\}}/g;
    return function (o){
        return this.replace(re, function (_, k){
            return typeof o[k] != 'undefined' ? o[k] : '';
        });
    }
}());



$(document).ready(function(){
	//loading the base html
	 	//$("#page").load("components/page/page.html");
	 	//$(".btn").click(function() {
	 	
  		$("header").load("components/header/header.html");
        $("#breadcrumb").load("components/breadcrumbs/breadcrumbs.html");
        $("footer").load("components/footer/footer.html");
        $(".leftColumn").load("components/shop/shop.html");
        $(".rightColumn").load("components/shoppingcart/shoppingcart.html");
        
        $(document).on("click",".btn",function () {  

		$( "#section-shoppingcart" ).removeClass("is-hidden");
	      var data = $(this).attr("data-shop-listing");  
	      data = JSON.parse(data);
	      var id=data.id;  
	      var name=data.name; 
	      var description=data.description;   
	      var price=data.price;
	      //create new row in data cart
	      var dataString = [id, name,description,price];
		  var tbody=$('#shoppingcart-table').children('tbody');
		  var table = tbody.length ? tbody : $('#shoppingcart-table');
			

	        if (myShoppingCart.add(id, price)) {
							       //decorateForCart(item, id,name,description,price);
							       table.append(row.compose({
								        'id': id,
								        'name': name,
								        'description': description,
								        'price':price
								    }));
							       updateCartTotal();
							       updateFooter();
							      
			}
		});
        
});