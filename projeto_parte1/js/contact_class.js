function Contact()
{
	var user_name = "";
	var user_mail = "";
	var user_phone = "";
	this.advertising = new Array(6);
	var messageFromUser = "";
}

Contact.prototype.getUserName = function()
{
	return this.user_name;
}

Contact.prototype.setUserName = function(newUserName)
{
	this.user_name = newUserName;	
}

Contact.prototype.getUserMail = function()
{
	return this.user_mail;
}

Contact.prototype.setUserMail = function(newUserMail)
{
	this.user_mail = newUserMail;
}

Contact.prototype.getUserPhone = function()
{
	return this.user_phone;
}

Contact.prototype.setUserPhone = function(newUserPhone)
{
	this.user_phone = newUserPhone;
}

Contact.prototype.getAdvertisingVector = function()
{
	return this.advertising;
}

Contact.prototype.setAdvertisingVector = function(newAdvertisingVector)
{
	if (newAdvertisingVector == null || newAdvertisingVector == undefined)
		return;

	if (!Array.isArray(newAdvertisingVector))
		return;

	/*
 	* instead of this.advertising = newAdvertisingVector
 	* doing this way, we can guarantee that we are copying 
 	* values, not the reference, avoiding errors/bugs
 	*/
	for (var counter = 0; counter < newAdvertisingVector.length; counter++) {
		this.advertising[counter] = newAdvertisingVector[counter];
	}
}

Contact.prototype.getAdvertisingVectorAt = function(index)
{
	if (index < 0 || index >= this.advertising.length)
		return null;
	else
		return this.advertising[index];
}

Contact.prototype.setAdvertisingVectorAt = function(index, newValue)
{
	if (typeof newValue !== 'boolean')
		return;
	if (index < 0 || index > this.advertising.length)
		return;
	this.advertising[index] = newValue;
}

Contact.prototype.getMessageFromUser = function()
{
	return this.messageFromUser;
}

Contact.prototype.setMessageFromUser = function(newMessage)
{
	if (newMessage == null || newMessage == undefined)
		return;
	this.messageFromUser = newMessage;
}

Contact.prototype.saveData = function()
{
	if (typeof(Storage) == undefined) {
		return;
	}

	// problema: novamente a unicidade da info.
	// um usuario pode enviar mais de uma msg a um hotel
	// e uma mesma msg pode ter sido enviada por de um usuario
	
	localStorage.setItem("user_name", this.getUserName());
	localStorage.setItem("user_mail", this.getUserMail());
	localStorage.setItem("user_phone", this.getUserPhone());
	var advertising_vector = this.getAdvertisingVector();
	for (var counter = 0; counter < advertising_vector.length; counter++) {
		localStorage.setItem("advertising[" + counter.toString() + "]", advertising_vector[counter].toString());
	}
	localStorage.setItem("user_msg", this.getMessageFromUser());
}

Contact.prototype.retrieveData = function()
{
	if (typeof(Storage) == undefined) {
		return;
	}

	this.setUserName(localStorage.getItem("user_name"));
	this.setUserMail(localStorage.getItem("user_mail"));
	this.setUserPhone(localStorage.getItem("user_phone"));
	for (var counter = 0; counter < 6; counter++) {
		var strBoolean = localStorage.getItem("advertising[" + counter.toString() + "]");
		strBoolean = strBoolean.toLowerCase();
		if (!strBoolean.localeCompare("true"))
			this.setAdvertisingVectorAt(counter, true);
		else
			this.setAdvertisingVectorAt(counter, false);
		
	}
	this.setMessageFromUser(localStorage.getItem("user_msg"));
}
