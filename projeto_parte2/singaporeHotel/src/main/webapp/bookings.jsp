<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="pt-BR">
	<head>
		<title>.: Reserva</title>
		<link rel="stylesheet" type="text/css" href="/singaporeHotel/css/main.css">
		<script src="/singaporeHotel/js/jquery-2.1.3.js"></script>
		<script src="/singaporeHotel/js/validation.js"></script>
		<script src="/singaporeHotel/js/layout_adjusts.js"></script>
		<script src="/singaporeHotel/js/booking_class.js"></script>
		<script src="/singaporeHotel/js/booking_controller.js"></script>

		<script>
			/* Utilizei script interno pois cada página terá um background diferente. Se fosse inserir tudo num CSS externo o mesmo ficaria excessivamente grande, além de dificultar a manutenibilidade. */

			$(document).ready( function(){
				document.getElementById("bookings_body").style.backgroundImage = "url(/singaporeHotel/img/campainha.jpg)";
			});

		</script>

	</head>


	<body id="bookings_body">
		<nav class="nav_container barfont" id="teste"> </nav>
		

		<div class="formclass color_font_pattern">
			<h3> Fazer uma reserva </h3> 

			<form id="bookingform" method="" >
				<fieldset>
					<legend> Período </legend>
					<div id="dataentrada">
						<label> Data de entrada </label> 
						<input type="date" name="dataentrada" id="tfdataentrada">
						<div id="infodataentrada" class="error_msg"></div>
					</div>
					<div id="datasaida">
						<label> Data de saída </label> 
						<input type="date" name="datasaida" id="tfdatasaida">
						<div id="infodatasaida" class="error_msg"></div>
					</div>
				</fieldset>

				<fieldset>
					<legend> Informações sobre os hóspedes </legend>
					<div>
						<label> Quantidade de adultos </label>
						<select name="qtdeadultos" id="numberOfAdults">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
						</select>
					</div>

					<div>
						<label> Quantidade de crianças até 3 anos </label>
						<select name="qtdebebes" id="numberOfBabies">
							<option value="0">0</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
						</select>
					</div>

					<div>
						<label> Quantidade de crianças entre 4 e 12 anos </label>
						<select name="qtdecriancas" id="numberOfChildren">
							<option value="0">0</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
						</select>
					</div>

				</fieldset>
				
				<input type="hidden" id="acao" name="acao" value="reserva">
				
				<input type="submit" class="btnpattern" id="enviarbtn" value="Enviar">
				<input type="reset" class="btnpattern" id="cancelarbtn" value="Cancelar">
			</form>
		</div>

<!-- 		<footer></footer>
 -->
	</body>
</html>
