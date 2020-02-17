/* variable */ 
var template = $('#template').html();
var mainRow = $('#mainRow');
var title = new RegExp('{{title}}', 'g');
var collections = $('[data-collection]');

/*ovo isto sada premestamo dole posto kada 
dobijemo podatke sa servera tj kada je window.onload
ona moze da se pozove i da radi */ 

// collections.on('click', displayCollections);

/*e sada sto je problem sto ovaj nas url
dole u ajaxu
kada god mi kliknemo a on moze bit  i 
obicno je neka adresa na internetu uvek ide do tog servera
pa uzima podatke to bi trebali da jednom kada se relouduje stranica da se ucita*/



window.onload = function() {
	/*da nemamo nikakvo aktivno stanje*/
	collections.parent().removeClass('active'); 
	
	$.ajax({
		url: 'shop.json',
		method : 'get',
		dataType: 'json',
	})
	.done(function(res) {
		displayCollections(res);
		/*ovde je premestamo*/ 
		// collections.on('click', displayCollections);
		collections.on('click', function() {
			/*da bi nam se podaci ovde koristli moramo 
			da dodamo call da bi this bilo ono na sta smo 
			kliknuli*/ 
			// displayCollections(res);
			displayCollections.call(this, res);
		});
	});
};



$(".back-to-top").click(function() {
	$("html, body").animate({scrollTop: 0}, 1000);
});




/*nasa f-ja za filtiranje*/ 

/*ovaj e nam vise ne treba sada je to res*/ 
function displayCollections(res) {

	mainRow.html("");

	/*i umesto ovog e stavljamo event*/ 
	event.preventDefault();

	var col = $(this).data('collection');
	/*kada sada ovo konzulujemo vidimo da this nije 
	vise dugme koje klikcemo nego je this window*/
	// console.log(col);
	console.log(this);


/*ovo premestamo gore*/

	// $.ajax({
	// 	url: 'shop.json',
	// 	method : 'get',
	// 	dataType: 'json',
	// })

	

		if (col === 'male' || col === 'female') {
			var colFilter = res.filter(function(el) {
				return el.colection === col;
			});

			disiplayProduct(colFilter);

		}else if (col === 'newCol' || col === 'popular' || col === 'action') {

			/*sredjujemo i nase activ stanje*/

			collections.parent().removeClass('active');
			$(this).parent().addClass('active');

			var colFilter = res.filter(function(el) {

				return el[col];

			});

			disiplayProduct(colFilter);
		}else {

			

			disiplayProduct(res);
		}
	
}

	function disiplayProduct(filter) {
		
		var text = "";

		filter.forEach(function(e) {

			text = template.replace("{{imgSrc}}", e.imgSrc)
						   .replace(title, e.productTitle)
						   .replace("{{model}}",e.model)
						   .replace("{{price}}",e.price);

			mainRow.append(text)			   
		}); 
	}
