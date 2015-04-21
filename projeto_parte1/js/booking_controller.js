$(document).ready(function() {
	$("#enviarbtn")	.click(function() {
		var new_booking = new Booking();
		new_booking.setDateCheckIn($("#tfdataentrada").val());
		new_booking.setDateCheckOut($("#tfdatasaida").val());
		new_booking.setNumberOfAdults(parseInt($("#numberOfAdults").val()));
		new_booking.setNumberOfBabies(parseInt($("#numberOfBabies").val()));
		new_booking.setNumberOfChildren(parseInt($("#numberOfChildren").val()));
		if(!new_booking.saveData())
			alert("Sua reserva foi efetuada com sucesso.\n");
		else
			alert("Reserva não efetuada. Tente novamente mais tarde");

		var debugging_msg = "";
		new_booking.retrieveData();
		debugging_msg += new_booking.getDateCheckIn() + "\n";
		debugging_msg += new_booking.getDateCheckOut() + "\n";
		debugging_msg += new_booking.getNumberOfAdults() + "\n";
		debugging_msg += new_booking.getNumberOfBabies() + "\n";
		debugging_msg += new_booking.getNumberOfChildren() + "\n";
		alert(debugging_msg);
	});
});
