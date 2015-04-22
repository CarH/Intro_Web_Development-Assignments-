/**
	Documento JavaScript : validation.js
	
	Este documento contém o código de validação de todos os formulários 
	das páginas do site.

	Decisão de projeto: devido ao fato de que páginas diferentes podem 
	utilizar o mesmo código de valição, para evitar repetição desnecessária
	de código utilizou-se um único arquivo de validação, que é importado
	por todas as páginas que contêm formulários.
*/


// Validation Document
function myInfo (element, text) {
	var x;

	$(element).text(text);
	x = $(element).css("color");
	if ( x === "rgb(0, 0, 255)" ){
		$(element).toggleClass("blueText");
	}
}

function myInfoAccepted (element, text) {
	var x;

	$(element).text(text);
	x = $(element).css("color");
	if ( x === "rgb(255, 0, 0)" ){
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
 *	Valida o nome completo, pág. registration.html
 */
function valida_nome_completo () {
	var nome, partes;
	
	nome = $("#tfnomecompleto").val().trim();

	partes = nome;

	console.log("partes(antes) = "+partes);
	partes = partes.replace(/(\s|\t)+/g, " ");
	console.log("partes(depois) = "+partes);

	if ( partes == "" ) {
		myInfo("#infonome", "O campo nome é de preenchimento obrigatório.");
		return;
	}

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
	var email, patt, counter=0;

	email  = $("#tfemail").val().trim();
	console.log("email: "+email);
	
	if ( email == "" ) {
		myInfo("#infoemail", "O campo email é de preenchimento obrigatório.");
		// $("#tfemail").focus();
		return;
	}

	/// Checagem 1: primeiro caracter deve ser uma letra
	patt = /^[^a-z]/i; // i: flag case sensitive ativada
	if ( patt.test(email) ) {
		myInfo("#infoemail", "A primeira letra do email deve ser uma letra do alfabeto.");
		$("#tfemail").focus();
		return;
	}

	/// Checagem 2: ausência de caracteres maiúsculos
	patt = /[A-Z]/g;
	if ( patt.test(email) ){
		// console.log("Email deve conter apenas caracteres minúsculos.");
		myInfo("#infoemail", "Email não pode conter caracteres maiúsculos.");
		$("#tfemail").focus();
		return;
	} 

	/// Checagem 3: deve haver apenas um caracter @
	patt = /@/g; 
	counter = 0;
	while ( patt.exec(email) !== null ) {
		counter++;	
	}
	if ( counter !== 1 ) {
		myInfo("#infoemail", "Email deve conter um, e apenas um, caractere \"@\".");
		$("#tfemail").focus();
		return;
	}

	/// Checagem 4: deve haver no mínimo um caracter "."
	patt = /\./g; 
	counter = 0;
	while ( patt.exec(email) !== null ) {
		counter++;	
	}
	if ( counter < 1 ) {
		myInfo("#infoemail", "Email deve conter, no mínimo, um caractere \".\"");
		$("#tfemail").focus();
		return;
	}

	/// Checagem 6: ".@" ou "@." não são permitidos
	patt = /((\.@)|(@\.))/g; 
	if ( patt.test(email) ) {
		myInfo("#infoemail", "Email pode não pode conter caractere \".\" adjacente ao caractere \"@\".");
		$("#tfemail").focus();
		return;
	}

	/// Checagem 5: checa se tem "." após o caracter @
	patt = /@([^\.]+)?(\.)+/g; 
	if ( !patt.test(email) ) {
		myInfo("#infoemail", "Email deve conter pelo menos um caractere \".\" após o \"@\".");
		$("#tfemail").focus();
		return;
	}

	/// Checagem 7: Email não pode ser finalizado com "." ou "@"
	patt = new RegExp("[\.@]");
	if ( patt.test(email[email.length-1]) ) {
		myInfo("#infoemail", "Email não pode ser finalizado com \""+email[email.length-1]+"\"");
		$("#tfemail").focus();
		return;
	}
	myInfoAccepted("#infoemail", "ok!");
}

/**
 *	Valida o cpf
 */
function valida_cpf () {
	var cpf, patt;

	cpf = $("#tfcpf").val().trim();
	cpf = cpf.replace(/(-|\.)/g, "");

	console.log("Validation CPF: "+cpf);

	if ( cpf == "" ) {
		myInfo("#infocpf", "O campo CPF é de preenchimento obrigatório.");
		return;
	}

	patt = /[^0-9\/-]/g;
	if ( patt.test (cpf) ) {
		myInfo("#infocpf", "CPF pode conter apenas números ou números e \".\" e/ou \"-\".");
		return;
	}

	if ( cpf.length > 11 ) {
		myInfo("#infocpf", "CPF deve conter apenas 11 dígitos.");
		return;
	}

	if ( cpf.length == 11 && mvalida_cpf( cpf ) ) {
		console.log("CPF válido");
		myInfoAccepted("#infocpf", "CPF válido.");
	} else {
		console.log("CPF inválido");
		myInfo("#infocpf", "CPF inválido.");
	}
}

/**
 *	Formata o cpf
 */
function formata_cpf () {
	var cpf, patt;
	cpf = $("#tfcpf").val().trim();
	cpf = cpf.replace(/(-|\.)/g, "");

	if ( cpf.length == 3 || cpf.length == 6 ) {
		$("#tfcpf").val( $("#tfcpf").val() + "\.");
		return;
	}
	if ( cpf.length == 9 ) {
		$("#tfcpf").val( $("#tfcpf").val() + "-");
		return;	
	}
	valida_cpf();
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
 *	Obs.: A validação foi realizada considerando a fonte:
 *	http://www.geradordecep.com.br/ , provida pelo PAE
 */
function valida_cep () {
	// TODO : de acordo com  o estado selecionado
	var estado, cep, patt;
	var mHash = {};

	mHash['sp'] = [0, 1];
	mHash['rj'] = [2];
	mHash['es'] = [2];
	mHash['mg'] = [3];
	mHash['ba'] = [4];
	mHash['se'] = [4];
	mHash['pe'] = [5];
	mHash['al'] = [5];
	mHash['pb'] = [5];
	mHash['rn'] = [5];
	mHash['ce'] = [6];
	mHash['pi'] = [6];
	mHash['ma'] = [6];
	mHash['pa'] = [6];
	mHash['am'] = [6];
	mHash['ac'] = [6];
	mHash['ap'] = [6];
	mHash['rr'] = [6];
	mHash['go'] = [7];
	mHash['to'] = [7];
	mHash['mt'] = [7];
	mHash['ms'] = [7];
	mHash['ro'] = [7];
	mHash['df'] = [7];
	mHash['pr'] = [8];
	mHash['sc'] = [8];
	mHash['rs'] = [9];

	cep = $("#user_zipcode").val().trim();
	cep = cep.replace(/-/g, "");
	estado = $("#user_state");
	console.log("estado: "+estado.val());
	if ( estado.val() == "unknown" ) {
		myInfo("#infocep", "Informe primeiramente o estado.");
		estado.focus();
		return;
	}

	if ( cep == "" ) {
		myInfo("#infocep", "O campo CEP é de preenchimento obrigatório.");
		return;
	}	

	patt = /[^0-9]/g;
	if ( patt.test(cep) ) {
		myInfo("#infocep", "O CEP é composto de números apenas.");
		return;
	}

	console.log("mHash[estado].length = "+mHash[estado.val()].length );
	for(var i = 0; i < mHash[estado.val()].length; i++) {
		if ( cep[0] == mHash[estado.val()][i]) {
			myInfoAccepted("#infocep", "ok");
			return;
		}
	}
	myInfo("#infocep", "CEP inválido.");
	
}

function formata_cep () {
	var cep, patt;

	cep = $("#user_zipcode").val().trim();
	cep = cep.replace(/-/g, "");
	console.log("cep : "+cep);

	/// Checagem 1: testa se tem algum caracter diferente de números
	patt = /[^0-9]/g;
	if ( patt.test(cep) ) {
		myInfo("#infocep", "O CEP é composto de números apenas.");
		return;
	}

	/// Checagem 2: insere "-"
	if ( cep.length == 5 ) {
		console.log("Inserindo -")
		$("#user_zipcode").val( $("#user_zipcode").val()+"-" );
	}
	
	/// Checagem 3: quantidade de números <= 8
	if ( cep.length == 8) {
		valida_cep();
		return;
	} else {
		myInfo("#infocep", "O CEP é composto de 8 dígitos.");
		return;
	}
}

function verifica_senha () {
	// TODO : checar se a senha corresponde com a confirmada
	var senha, conf_senha, info;

	senha = $("#user_password");
	conf_senha = $("#conf_pass");
	info = $("#infoconfsenha");

	if ( conf_senha.val().length < 6 || conf_senha.val().length > 12) {
		myInfo("#infoconfsenha", "A senha deve conter de 6 a 12 caracteres!");		
		return;
	}

	if ( senha.val() !== conf_senha.val() ) {
		myInfo("#infoconfsenha", "A senha confirmada não corresponde com a senha informada.");		
	} else {
		myInfoAccepted("#infoconfsenha", "Senha confirmada corretamente.");
	}
}


function valida_senha () {
	var MIN_SIZE_PASS = 6;
	var MAX_SIZE_PASS = 12;
	var senha, patt, progress_bar, arrayRes, special_char, info;
	var has2SpecialCar=false, has1SpecialCar=false, hasNumber=false, hasUpperCase=false, hasLowerCase=false;

	senha = $("#user_password").val();
	progress_bar = $("#progress_bar");
	info = $("#infoprogbar");

	// remove todas as classes de progress_bar:
	progress_bar.removeClass();		

	if ( senha.length < MIN_SIZE_PASS || senha.length > MAX_SIZE_PASS ) {
		myInfo("#infosenha", "A senha deve conter de 6 a 12 caracteres!");
		info.text("Força da senha");
	} else {
		myInfoAccepted("#infosenha", "");


		/// Checagem 1: Presença de caracteres especiais:
		patt = /[^a-zA-Z0-9]/g; // flag g ativada!
		if ( (arrayRes = patt.exec(senha)) !== null ) {
			special_char = arrayRes[0];
			has1SpecialCar = true;
			while ( (arrayRes = patt.exec(senha)) !== null ) {
				if ( special_char !== arrayRes[0] ) {
					// Há pelo menos 2 caract. especiais
					has2SpecialCar = true;
					console.log("TEM 2 caract especiais!!");
				}
				console.log("Capturou: "+arrayRes[0]);
			}
		}

		/// Checagem 2: Presença de numeros:
		patt = /[0-9]/;
		if ( arrayRes = patt.test(senha) ) {
			hasNumber = true;
			console.log("hasNumber!");
		}

		/// Checagem 3: Presença de letras maiúsculas:
		patt = /[A-Z]/;
		if ( patt.test(senha) ) {
			hasUpperCase = true;
			console.log("hasUpperCase!");		
		}

		/// Checagem 4: Presença de letras minúsculas:
		patt = /[a-z]/;
		if ( patt.test(senha) ) {
			hasLowerCase = true;
			console.log("hasLowerCase!");	
		}

		if ( hasNumber && hasLowerCase && hasUpperCase && has2SpecialCar ) {
			// Strong
			progress_bar.addClass("strong");
			info.text("Senha forte");
		} else if ( hasNumber && (hasLowerCase || hasUpperCase) && has1SpecialCar ) {
			// Medium
			progress_bar.addClass("medium");
			info.text("Senha média");
		} else {
			// Weak
			progress_bar.addClass("weak");
			info.text("Senha fraca");
		}
		console.log("senha.length = "+senha.length);	
	}
}

function clear_progress_bar () {
	var progress_bar, info;
	progress_bar = $("#progress_bar");
	info = $("#infoprogbar");

	// remove todas as classes de progress_bar:
	progress_bar.removeClass();
	info.text("Força da senha");
}

function valida_nome () {
	var nome, partes, patt;
	
	nome = $("#tfnome").val().trim();
	if ( nome == "" ) {
		myInfo("#infonome", "O campo nome é de preenchimento obrigatório.");
		return;
	}

	console.log("nome(antes) = "+nome);
	nome = nome.replace(/(\s|\t)+/g, " ");
	console.log("nome(depois) = "+nome);

	/// Checagem 1: inicia com letra
	patt = /^[^a-zA-Z]/g;
	if ( patt.test(nome) ) {
		myInfo("#infonome", "O nome deve iniciar com uma letra do alfabeto.");
		return;
	}

	/// Checagem 2: pelo menos 3 caracteres
	patt = /.{3,}/g;
	if ( !patt.test(nome) ) {
		myInfo("#infonome", "O nome deve conter ao menos três caracteres.");
		return;
	}
	myInfoAccepted("#infonome", "ok");

}



$(document).ready(function () {
	console.log("Validation.js loaded successfully.");

	/************************************************
	 * Pagina: home.html e registration.html
	 */
	$("#tfemail").keyup( function() {
		valida_email();
	});
	$("#tfemail").blur( function() {
		valida_email();
	});

	/************************************************
	 * Pagina: registration.html 
	 */
	// Validacao do campo nome
	$("#tfnomecompleto").keyup( function(){
		valida_nome_completo();
	});
	$("#tfnomecompleto").blur( function(){
		valida_nome_completo();
	});

	//  Validacao do campo CPF
	$("#tfcpf").keyup( function() {
		formata_cpf();
	});
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

	// Validacao do campo estado civil
	$("#marital_status").blur( function () {
		valida_estado_civil();
	});

	// Validacao do campo cidade
	$("#user_city").keyup( function() {
		valida_cidade();
	});

	// Validacao do campo CEP
	$("#user_zipcode").keyup( function() {
		formata_cep();
	});
	$("#user_zipcode").blur( function() {
		valida_cep();
	});

	// Validacao do campo senha
	$("#user_password").keyup( function() {
		valida_senha();
	});

	// Verificacao do campo senha
	$("#conf_pass").blur( function() {
		verifica_senha();
	});

	$("#cadastrarbtn").click( function (){
		valida_nome_completo();
		valida_email();
		valida_cpf();
		valida_data_nasc();
		valida_sexo();
		valida_estado_civil();

		valida_cidade();
		valida_estado();
		valida_cep();

		valida_email();
		valida_senha();
		verifica_senha();
	});

	$("#cancelarbtn").click( function (){
		// Apaga todos os infos
		myInfoAccepted("#infonome", "");
		myInfoAccepted("#infoemail", "");
		myInfoAccepted("#infocpf", "");
		myInfoAccepted("#infodatanasc", "");
		myInfoAccepted("#infosexo", "");
		myInfoAccepted("#infoestadocivil", "");
		myInfoAccepted("#infoestado", "");
		myInfoAccepted("#infocidade", "");
		myInfoAccepted("#infocep", "");
		clear_progress_bar();
		myInfoAccepted("#infosenha", "");
		myInfoAccepted("#infoconfsenha", "");
	});


	/************************************************
	 * Pagina: contact.html 
	 */

	// Validacao do campo nome
	$("#tfnome").keyup( function(){
		valida_nome();
	});
	$("#tfnome").blur( function(){
		valida_nome();
	});

	// Validacao do campo telefone
	// $("#user_phone").keyup( )


});
