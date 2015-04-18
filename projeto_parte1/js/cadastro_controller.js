$(document).ready(function(){
	//se der problemas de jQuery, criar um handler para evento de campos validados
	$("#cadastrarbtn").click(function() {
		var new_user = new User();
		new_user.setName($("#tfnome").val());
		new_user.setCPF($("#tfcpf").val());
		new_user.setBirthDate($("#dataNasc").val());
		if ($("#masculino").is(':checked')) {
			new_user.setGender("m");
		} else if ($("#feminino").is(':checked')) {
			new_user.setGender("f");
		}
		new_user.setMaritalStatus($("#marital_status").val());
		new_user.setCity($("#cidade").val());
		new_user.setState($("#user_state").val());
		new_user.setZipCode($("#infocep").val());
		new_user.setEmail($("#infoemail").val());
		new_user.setPassword($("#infosenha").val());
		new_user.saveData();
	});
});
