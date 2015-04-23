WebFontConfig = {
    google: { families: [ 'Poiret+One::latin,latin-ext' ] }
};

function import_font_style() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
}

$(document).ready(function  () {

	/* Import da fonte provida pelo Google fonts */
	import_font_style();

	/* Criando o Menu padrão:  */
	var menu_container = $(".nav_container");
	var ul = $("<ul class=\"menu\"></ul>");
	var home = $("<li> <a class=\"hotel_font\" href=\"home.html\"> Singapore Hotel </a> </li>");
	var pacotes = $("<li> <a href=\"#\"> Pacotes </a> </li>");
	var promo = $("<li> <a href=\"#\"> Promoções </a> </li>");
	var contato = $("<li> <a href=\"contact.html\"> Contato </a> </li>");
	var reservas = $("<li> <a href=\"bookings.html\"> Reservas </a> </li>");

	ul.append(home);
	ul.append(pacotes);
	ul.append(promo);
	ul.append(contato);
	ul.append(reservas);
	menu_container.append(ul);


	/* Criando o footer padrão:  */
	var body = $("body");
	var footer = $("<footer></footer>");
	var footer_content = $("<div class=\"copy_right\"> Copyright &copy; 2015 Singapore Hotel. All rights reserved. </div>");
	
	footer.append(footer_content);
	body.append(footer);
	
	/***********************************************/


});