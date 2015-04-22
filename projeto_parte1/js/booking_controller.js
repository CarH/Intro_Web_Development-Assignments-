$(document).ready(function() {
	$("#enviarbtn")	.click(function() {
		var new_booking = new Booking();
		new_booking.setDateCheckIn($("#tfdataentrada").val());
		new_booking.setDateCheckOut($("#tfdatasaida").val());
		new_booking.setNumberOfAdults(parseInt($("#numberOfAdults").val()));
		new_booking.setNumberOfBabies(parseInt($("#numberOfBabies").val()));
		new_booking.setNumberOfChildren(parseInt($("#numberOfChildren").val()));
		new_booking.saveData();
		if(new_booking != null)
			alert("Sua reserva foi efetuada com sucesso.\n");
		else
			alert("Reserva não efetuada. Tente novamente mais tarde");
	});
});
