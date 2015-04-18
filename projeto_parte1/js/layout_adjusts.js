$(document).ready(function  () {

/* Criando o Menu padrão:  */
	var menu_container = $(".nav_container");
	console.log("menu_container: "+menu_container);
	var ul = $("<ul class=\"menu\"></ul>");
	var home = $("<li> <a href=\"home.html\"> Singapore Hotel </a> </li>");
	var pacotes = $("<li> <a href=\"#\"> Pacotes </a> </li>");
	var promo = $("<li> <a href=\"#\"> Promoções </a> </li>");
	var contato = $("<li> <a href=\"contact.html\"> Contato </a> </li>");
	var reservas = $("<li> <a href=\"bookings.html\"> Reservas </a> </li>");

	ul.append(home);
	ul.append(pacotes);
	ul.append(promo);
	ul.append(contato);
	ul.append(reservas);
	console.log("ul: "+ul);		
	menu_container.append(ul);
	/***********************************************/

});