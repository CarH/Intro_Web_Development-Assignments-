function Contact()
{
	var user_name = "";
	var user_mail = "";
	var user_phone = "";
	var advertising = [];
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

Contact.prototype.getAdvertisingVector() = function()
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
 	* doing this way we can guarantee that we are copying 
 	* values, not the reference, avoiding errors/bugs
 	*/
	for (var counter = 0; counter < newAdvertisingVector.length; counter++) {
		this.advertising[counter] = newAdvertisingVector[counter];
	}
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
