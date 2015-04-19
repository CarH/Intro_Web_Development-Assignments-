function Booking()
{
	var dateCheckIn = "";
	var dateCheckOut = "";
	var nAdults = 0;
	var nBabies = 0;
	var nChildren = 0;
}

Booking.prototype.getDateCheckIn = function()
{
	return this.dateCheckIn;
}

Booking.prototype.setDateCheckIn = function(newDateCheckIn)
{
	this.dateCheckIn = newDateCheckIn;
}

Booking.prototype.getDateCheckOut = function()
{
	return this.dateCheckOut;
}

Booking.prototype.setDateCheckOut = function(newDateCheckOut)
{
	this.dateCheckOut = newDateCheckOut;
}

Booking.prototype.getNumberOfAdults = function()
{
	return this.nAdults;
}

Booking.prototype.setNumberOfAdults = function(newNumberOfAdults)
{
	this.nAdults = newNumberOfAdults;		
}

Booking.prototype.getNumberOfBabies = function()
{
	return this.nBabies;
}

Booking.prototype.setNumberOfBabies = function(newNumberOfBabies)
{
	this.nBabies = newNumberOfBabies;
}

Booking.prototype.getNumberOfChildren = function(newNumberOfChildren)
{
	this.nChildren = newNumberOfChildren;
}
