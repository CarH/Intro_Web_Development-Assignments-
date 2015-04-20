// Validation Document
function myInfo (element, text) {
	$(element).text(text);
	var x = $(element).css("color");
	console.log("1");
	console.log ("current_color = "+x);
	console.log("element = "+element);
	if ( x === "rgb(0, 0, 255)" ){
		console.log("class changed!");
		$(element).toggleClass("blueText");
	}
}

function myInfoAccepted (element, text) {
	$(element).text(text);
	var x = $(element).css("color");
	console.log("2");
	
	console.log ("current_color = "+x);
	if ( x === "rgb(255, 0, 0)" ){
		console.log("class changed!");
		$(element).toggleClass("blueText");
	}
}

/*
 calc_digitos_posicoes
 
 Multiplica dígitos vezes posições
 
 @param string digitos Os digitos desejados
 @param string posicoes A posição que vai iniciar a regressão
 @param string soma_digitos A soma das multiplicações entre posições e dígitos
 @return string Os dígitos enviados concatenados com o último dígito
*/
function calc_digitos_posicoes( digitos, posicoes, soma_digitos) {
 
    // Garante que o valor é uma string
    digitos = digitos.toString();
 
    // Faz a soma dos dígitos com a posição
    // Ex. para 10 posições:
    //   0    2    5    4    6    2    8    8   4
    // x10   x9   x8   x7   x6   x5   x4   x3  x2
    //   0 + 18 + 40 + 28 + 36 + 10 + 32 + 24 + 8 = 196
    for ( var i = 0; i < digitos.length; i++  ) {
        // Preenche a soma com o dígito vezes a posição
        soma_digitos = soma_digitos + ( digitos[i] * posicoes );
 
        // Subtrai 1 da posição
        posicoes--;
 
        // Parte específica para CNPJ
        // Ex.: 5-4-3-2-9-8-7-6-5-4-3-2
        if ( posicoes < 2 ) {
            // Retorno a posição para 9
            posicoes = 9;
        }
    }
 
    // Captura o resto da divisão entre soma_digitos dividido por 11
    // Ex.: 196 % 11 = 9
    soma_digitos = soma_digitos % 11;
 
    // Verifica se soma_digitos é menor que 2
    if ( soma_digitos < 2 ) {
        // soma_digitos agora será zero
        soma_digitos = 0;
    } else {
        // Se for maior que 2, o resultado é 11 menos soma_digitos
        // Ex.: 11 - 9 = 2
        // Nosso dígito procurado é 2
        soma_digitos = 11 - soma_digitos;
    }
 
    // Concatena mais um dígito aos primeiro nove dígitos
    // Ex.: 025462884 + 2 = 0254628842
    var cpf = digitos + soma_digitos;
 
    // Retorna
    return cpf;
    
} // calc_digitos_posicoes
 
/*
 Valida CPF
 
 Valida se for CPF
 
 @param  string cpf O CPF com ou sem pontos e traço
 @return bool True para CPF correto - False para CPF incorreto
*/
function mvalida_cpf ( valor ) {
 
    // Garante que o valor é uma string
    valor = valor.toString();
    
    // Remove caracteres inválidos do valor
    valor = valor.replace(/[^0-9]/g, '');
 
 
    // Captura os 9 primeiros dígitos do CPF
    // Ex.: 02546288423 = 025462884
    var digitos = valor.substr(0, 9);
 
    // Faz o cálculo dos 9 primeiros dígitos do CPF para obter o primeiro dígito
    var novo_cpf = calc_digitos_posicoes( digitos, 10, 0 );
 
    // Faz o cálculo dos 10 dígitos do CPF para obter o último dígito
    var novo_cpf = calc_digitos_posicoes( novo_cpf, 11, 0 );
 
    // Verifica se o novo CPF gerado é idêntico ao CPF enviado
    if ( novo_cpf === valor ) {
        // CPF válido
        return true;
    } else {
        // CPF inválido
        return false;
    }
    
} // valida_cpf_ 
 
/**
 *	Valida o nome 
 */
function valida_nome () {
	var nome;
	nome = $("#tfnomecompleto").val();

	// alert(nome);
	var partes = nome.trim();
	
	console.log("partes(antes) = "+partes);
	partes = partes.replace(/(\s|\t)+/g, " ");
	console.log("partes(depois) = "+partes);

	partes = partes.split(" ");
	console.log("partes.length = "+partes.length);
	if ( partes.length < 2 ) { 
		myInfo("#infonome", "Nome inválido. O nome deve conter pelo menos duas palavras, todas com no mínimo 3 caracteres.");
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
					myInfo("#infonome", "Nome inválido. O primeiro caractere de cada palavra deve ser uma letra do alfabeto.");
					success = false;
					break;
				}
				partes[i] = partes[i].replace(/^[a-z]/, function myFunction(x){return x.toUpperCase();});

				success = true;
			}

			/// Debuging:
			for (var i = 0; i < partes.length; i++) {
				console.log("partes["+i+"]: "+partes[i]);
			}

			if ( success ) {
				myInfoAccepted("#infonome", "ok!");
			}
		}

	}
}

/**
 *	Valida o email 
 */
function valida_email () {
	var email, passwd, patt;

	email  = $("#tfemail").val();
	passwd = $("#tfpassword").val();

	// email:
	patt = new RegExp("[a-z]");
	if (patt.test(email[email.length-1])) {
		patt = new RegExp("[a-z]([a-z0-9.]*[a-z0-9]+)?@[a-z0-9]+\\.([a-z0-9.]*)?[a-z0-9]+");
		if ( patt.test(email) ){
			console.log("Email ok!");
			myInfoAccepted("#infoemail", "ok!");
		} else {
			myInfo("#infoemail", "Email não está no formato permitido.");
			$("#tfemail").focus();
		}
	} else {
		myInfo("#infoemail", "Email finalizado com caracter inválido: \""+email[email.length-1]+"\"");
		$("#tfemail").focus();
		console.log("email finalizado INCORRETAMENTE : \""+email[email.length-1]+"\"");
	}
}

/**
 *	Valida o cpf
 */
function valida_cpf () {
	console.log("Validation CPF: "+$("#tfcpf").val());

	if ( mvalida_cpf( $("#tfcpf").val() ) ) {
		console.log("CPF válido");
		myInfoAccepted("#infocpf", "CPF válido.");
	} else {
		console.log("CPF inválido");
		myInfo("#infocpf", "CPF inválido.");
	}
}

/**
 *	Valida data de nascimento
 */
function valida_data_nasc () {
	var dataNasc, base, limit, vDataNasc;
	var patt;

	console.log("dataNasc.val() = "+$("#dataNasc").val());
	// Data de Nascimento:
	if ( $("#dataNasc").val() == "" ){
		myInfo("#infodatanasc", "Data inválida. A data mínima aceita é 01/01/1990.");
	} else {
		vDataNasc = $("#dataNasc").val().split("-");

		dataNasc = new Date(vDataNasc[1]+" "+vDataNasc[2]+", "+vDataNasc[0]);

		console.log("Year: "+dataNasc.getFullYear());
		console.log("Month: "+dataNasc.getMonth());
		console.log("Day: "+dataNasc.getDate());
		// console.log("dataNasc: "+vDataNasc[0]+", "+vDataNasc[1]+", " +vDataNasc[2] );

		base = new Date("1 1, 1990");	// "M D, YYYY"
		limit = new Date();				// get current date
		console.log("base.getFullYear() = "+base.getFullYear());
		if ( dataNasc.getFullYear() < base.getFullYear() ) { // > 1990
			myInfo("#infodatanasc", "Data inválida. A data mínima aceita é 01/01/1990.");
		} else {
			if ( dataNasc.getTime() > limit.getTime() ){ // > current date
				myInfo("#infodatanasc", "Data inválida. A data máxima aceita é "+limit.getUTCDate()+"/"+(limit.getUTCMonth()+1)+"/"+limit.getFullYear());
			} else {
				myInfoAccepted("#infodatanasc", "ok");	
			}
		}
	}
}

/**
 *	Valida sexo
 */
function valida_sexo () {
	// sexo
	console.log(" masculino = "+$("#masculino").is(':checked')+", feminino = "+$("#feminino").is(':checked'));
	if ( !$("#masculino").is(':checked') && !$("#feminino").is(':checked') ) {
		myInfo("#infosexo", "Selecione o sexo.");
	} else {
		myInfoAccepted("#infosexo", "ok.");
	}
}

/**
 *	Valida estado civil
 */
function valida_estado_civil () {
	// estado civil
	if ( $("#marital_status").val() == "unknown" ) {
		myInfo("#infoestadocivil", "Selecione o estado civil.");
	} else {
		myInfoAccepted("#infoestadocivil", "ok");
	}
}

/**
 *	Valida estado
 */
function valida_estado () {
	// estado
	if ( $("#user_state").val() == "unknown" ) {
		myInfo("#infoestado", "Selecione o estado.");
	} else {
		myInfoAccepted("#infoestado", "ok");
	}
}

/**
 *	Valida cidade
 */
function valida_cidade () {	
	// cidade
	var cidade = $("#user_city").val();
	cidade = cidade.replace(/(\s|\t)+/g, "");
	if ( cidade.length == 0 ) {
		myInfo("#infocidade", "Digite o nome da cidade onde você reside.");
	} else {
		myInfoAccepted("#infocidade", "ok");
	}
}

/**
 *	Valida cep
 */
function valida_cep () {
	// TODO : de acordo com  o estado selecionado
	var estado;

	estado = $("#user_state");
	console.log("estado: "+estado.val());
	if ( estado.val() == "unknown" ) {
		myInfo("#infocep", "Informe primeiramente o estado.");
		estado.focus();
		return;
	} else {
		myInfoAccepted("#infocep", "");
	}

}

function valida_senha () {
	// TODO : checar se a senha corresponde com a confirmada
}


$(document).ready(function () {
	console.log("Validation.js loaded successfully.");

	/************************************************
	 * Pagina: home.html e registration.html
	 */
	$("#tfemail").keyup( function() {
		valida_email();
	});
	
	/************************************************
	 * Pagina: registration.html 
	 */
	// Validacao do campo nome
	$("#tfnomecompleto").keyup( function(){
		valida_nome();
	});

	//  Validacao do campo CPF
	$("#tfcpf").blur( function() {
		valida_cpf();
	});
	
	// Validacao do campo data de nascimento
	$("#dataNasc").blur( function() {
		valida_data_nasc();
	});
	
	// Validacao do campo sexo
	$("#masculino").click( function() {
		valida_sexo();
	});
	$("#feminino").click( function() {
		valida_sexo();
	});

	// Validacao do campo cidade
	$("#user_city").keyup( function() {
		valida_cidade();
	});

	// Validacao do campo CEP
	$("#user_zipcode").keyup( function() {
		valida_cep();
	});

	$("#cadastrarbtn").click( function (){
		valida_nome();
		valida_cpf();
		valida_data_nasc();
		valida_sexo();
		valida_estado_civil();

		valida_cidade();
		valida_estado();
		valida_cep();

		valida_email();
		valida_senha();
	});

	$("#cancelarbtn").click( function (){
		//TODO: apagar todos os info....
		myInfoAccepted("#infonome", "");
		myInfoAccepted("#infoemail", "");
		myInfoAccepted("#infocpf", "");
		myInfoAccepted("#infodatanasc", "");
		myInfoAccepted("#infosexo", "");
		myInfoAccepted("#infoestadocivil", "");
		myInfoAccepted("#infoestado", "");
		myInfoAccepted("#infocidade", "");
		myInfoAccepted("#infocep", "");
	});

});





