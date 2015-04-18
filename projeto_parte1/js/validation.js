// Validation Document
function myInfo (element, text) {
	$(element).text(text);
	$(element).css("color", "red");
}

function myInfo (element, text, color) {
	$(element).text(text);
	$(element).css("color", color);
}

$(document).ready(function () {
	console.log("Validation.js loaded successfully.")

	/***************************************/
	// DEFINES:
	var SUCCESS_COLOR = "blue";
	/***************************************/

	// Pagina: home.html
	$("#loginbtn").click( function(){
		var email, passwd, patt;

		console.log("entrou em validacao -> click");
		email  = $("#tfemail").val();
		passwd = $("#tfpassword").val();


		// email:
		patt = new RegExp("[a-z]");
		if (patt.test(email[email.length-1])) {
			patt = new RegExp("[a-z]([a-z0-9.]*[a-z0-9]+)?@[a-z0-9]+\\.([a-z0-9.]*)?[a-z0-9]+");
			if ( patt.test(email) ){
				console.log("Email ok!");
				// $("#infoEmail").text("ok!");
				myInfo("#infoEmail", "ok!", SUCCESS_COLOR);
			} else {
				myInfo("#infoEmail", "Email não está no formato permitido.");
			};
		} else {
			// $("#infoEmail").text("Email finalizado com caracter inválido: \""+email[email.length-1]+"\"");
			
			myInfo("#infoEmail", "Email finalizado com caracter inválido: \""+email[email.length-1]+"\"");
			console.log("email finalizado INCORRETAMENTE : \""+email[email.length-1]+"\"");
		};

		// TODO: validacao de senha = é a mesma de cadastro!!

	});

	// Pagina: registration.html
	$("#cadastrarbtn").click( function (){
		var nome, cpf, dataNasc, sexo, est_civil, cidade, estado, cep, email, senha, conf_senha;
		var patt;

		nome = $("#tfnomecompleto").val();
		dataNasc = $("#dataNasc").val();
		// alert(nome);
		//new Date(year, month, day, hours, minutes, seconds, milliseconds)
		// dataNasc = new Date(, month, day, hours, minutes, seconds, milliseconds)

		console.log ("entrou!");

		// Nome:
		var partes = nome.trim().split(" ");
		console.log("partes[0]: "+partes[0]+ " | tam: "+partes[0].length);
		if ( partes.length < 2 ) { 
			myInfo("#infonome", "O nome deve conter pelo menos duas palavras, todas com no mínimo 3 caracteres.");
		} else { // Temos 2 ou mais palavras
			console.log ("tem pelo menos 2 palavras.");

			var k = 0;
			while ( k < partes.length ) { 
				if ( partes[k].length < 3 ){
					break;
				}
				k++; 
			}
			console.log("k = "+k+"    |   partes.length = "+partes.length);

			if ( k != partes.length ) {
				myInfo("#infonome", "Todas as palavras devem ter, no mínimo, 3 caracteres");
			} else { // Temos pelo menos 2 palavras, todas com >= 3 caracteres
				var success;
				patt = RegExp ("^[a-zA-Z]");
				for (var i = 0; i < partes.length; i++) {
					if ( !patt.test(partes[i]) ) {
						myInfo("#infonome", "O primeiro caractere de cada palavra deve ser uma letra do alfabeto.");
						success = false;
						break;
					}
					partes[i] = partes[i].replace(/^[a-z]/, function myFunction(x){return x.toUpperCase();});
	
					success = true;
				}

				for (var i = 0; i < partes.length; i++) {
					console.log("partes["+i+"]: "+partes[i]);
				}

				if ( success ) {
					myInfo("#infonome", "Ok!", SUCCESS_COLOR);
				}
			}

		}

		// CPF:



		// Data de Nascimento:
		var dbase = new Date("1 1, 1990");
		var dlimit = new Date();	// current date

	});


	$("#cancelarbtn").click( function (){
		//TODO: apagar todos os info....
	});

});





