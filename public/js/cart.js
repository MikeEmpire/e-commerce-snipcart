

/* Cart Trigger 
$( '.responsive-trigger' ).on( 'click', function(e){
	e.preventDefault();
	$( 'body' ).addClass( 'responsive-block-on' );
});

$( 'a[href="#show-player"]' ).on( 'click', function(event) {

			event.preventDefault();
			event.stopPropagation();

			if ( $( '#scamp_player' ).hasClass( 'sp-show-player' ) ) {
				$( '#scamp_player' ).removeClass( 'sp-show-player' ).addClass( 'sp-hidden-player' );
				$( this ).removeClass( 'on' );
			} else {
				$( '#scamp_player' ).removeClass( 'sp-hidden-player' ).addClass( 'sp-show-player' );
				$( this ).addClass( 'on' );
			}

		});
*/

var app = angular.module('shoppingCart', []);

app.controller('shoppingCartController', function($http, $scope){
	
	$scope.loadProduct = function(){
		$http.get('fetch.php').success(function(data){
            $scope.products = data;
        })
	};
	
	$scope.carts = [];
	
	$scope.fetchCart = function(){
		$http.get('fetch_cart.php').success(function(data){
            $scope.carts = data;
        })
	};
	
	$scope.setTotals = function(){
		var total = 0;
		for(var count = 0; count<$scope.carts.length; count++)
		{
			var item = $scope.carts[count];
			total = total + (item.product_quantity * item.product_price);
		}
		return total;
	};
	
	$scope.addtoCart = function(product){
		$http({
            method:"POST",
            url:"add_item.php",
            data:product
        }).success(function(data){
			$scope.fetchCart();
        });
	};
	
	$scope.removeItem = function(id){
		$http({
            method:"POST",
            url:"remove_item.php",
            data:id
        }).success(function(data){
			$scope.fetchCart();
        });
	};
	
});
