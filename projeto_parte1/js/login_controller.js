$(document).ready(function() {
	$("#loginbtn").click(function() {
		var login_user = $("#tfemail").val();
		var login_password = $("#tfpassword").val();

		var login_try = new User();
		login_try.setEmail(login_user);
		login_try.setPassword(login_password);
		var login_info = login_try.retrieveData();
		if (!login_info) {
			alert("Usuário ou senha incorretos");
		} else {
			/*TODO: definir comportamento da pagina quando login estiver correto*/
			
		}
	});
});
