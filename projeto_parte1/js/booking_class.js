/*
 * Definition of class Booking. ("Model" - MVC)
 * Represents the information about the booking.
 */

function Booking()
{
	var dateCheckIn = "";
	var dateCheckOut = "";
	var nAdults = 0;
	var nBabies = 0;
	var nChildren = 0;
}


/*object oriented programming: setters and getters to each property*/
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
	if (!isNaN(newNumberOfAdults))
		this.nAdults = newNumberOfAdults;		
}

Booking.prototype.getNumberOfBabies = function()
{
	return this.nBabies;
}

Booking.prototype.setNumberOfBabies = function(newNumberOfBabies)
{
	if (!isNaN(newNumberOfBabies))
		this.nBabies = newNumberOfBabies;
}

Booking.prototype.getNumberOfChildren = function()
{
	return this.nChildren;
}

Booking.prototype.setNumberOfChildren = function(newNumberOfChildren)
{
	if (!isNaN(newNumberOfChildren))
		this.nChildren = newNumberOfChildren;	
}

/*
 * saveData: saves all the informations abou the last booking.
 *
 * description: using the Web Storage API, all the data inserted by user
 * 		at view of booking page, are saved locally and permanently.
 * 		This function is a method of Booking class and cannot be
 * 		called directly from the view, once implemented the 
 * 		MVC desing pattern.
 *
 * return: flag error, containing the log message, if any error
 *         occured.
 *
 * FIXME: In this implementation, only the last booking can be retrieved.
 *
 * TODO:  associate each booking instance to only one user instance.
 * 	  Otherwise, there is no way to guarantee the oneness and persitence
 * 	  of data. This will be implemented in future versions, as asked by the teacher.
 */
Booking.prototype.saveData = function()
{
	var flag_error = "";
	if (typeof(Storage) != undefined) {
		localStorage.setItem("checkin", this.getDateCheckIn());
		localStorage.setItem("checkout", this.getDateCheckOut());
		localStorage.setItem("adults", this.getNumberOfAdults().toString());
		localStorage.setItem("babies", this.getNumberOfBabies().toString());
		localStorage.setItem("children", this.getNumberOfChildren().toString());
	} else {
		flag_error = "Your browser does not support the Web Storage API";
		return flag_error;
	}
}

/*
 * retrieveData: retrieve all the informations about the last booking made.
 *
 * description: all the properties of the booking's instance are filled
 * 		by retrieving all the informations about the last booking
 * 		made on he browser (data saved using the Web Storage API)
 *
 * returns: -1, if the booking does not exist,
 * 	    1, if the browser does not support the Web Storage API
 * 	    0, otherwise.
 *
 * XXX: verify if the returning type from the function violates
 * 	the MVC design pattern.
 */
Booking.prototype.retrieveData = function()
{
	var flag_error;
	if (typeof(Storage) != undefined) {
		var booking_exists = localStorage.getItem("checkin");
		if (booking_exists == null || booking_exists == undefined) {
			flag_error = -1;
			return flag_error;
		}
		this.dateCheckIn = localStorage.getItem("checkin");
		this.dateCheckOut = localStorage.getItem("checkout");
		this.setNumberOfAdults(parseInt(localStorage.getItem("adults")));
		this.setNumberOfBabies(parseInt(localStorage.getItem("babies")));
		this.setNumberOfChildren(parseInt(localStorage.getItem("children")));
		flag_error = 0;
		return flag_error;		
	} else {
			flag_error = 1;
	}
}
