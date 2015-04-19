$(document).ready(function() {
	$("#enviarbtn")	.click(function() {
		var new_booking = new Booking();
		new_booking.setDateCheckIn($("#tfdataentrad").val());
		new_booking.setDateCheckOut($("#tfdatasaida").val());
		new_booking.setNumberOfAdults($("#numberOfAdults").val());
		new_booking.setNumberOfBabies($("#numberOfBabies").val());
		new_booking.setNumberOfChildren($("#numberOfChildren").val());
		new_booking.saveData();
	});
});
