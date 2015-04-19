function User()
{
	var name = "";
	var cpf = "";
	var birthDate = "";
	var gender = "";
	var maritalStatus = "";
	var city = "";
	var state = "";
	var zipCode = "";
	var email = "";
	var password = "";
}

/*setters and getters to each property*/
User.prototype.getName = function()
{
	return this.name;
}

User.prototype.setName = function(newName)
{
	this.name = newName;
}

User.prototype.getCPF = function()
{
	return this.cpf;
}

User.prototype.setCPF = function(newCPF)
{
	this.cpf= newCPF;
}

User.prototype.getBirthDate = function()
{
	return this.birthDate;
}

User.prototype.setBirthDate = function(newBirthDate)
{
	this.birthDate = newBirthDate;
}

User.prototype.getGender = function()
{
	return this.gender;
}

User.prototype.setGender = function(newGender)
{
	this.gender = newGender;
}

User.prototype.getMaritalStatus = function()
{
	return this.maritalStatus;
}

User.prototype.setMaritalStatus = function(newStatus)
{
	this.maritalStatus = newStatus;
}

User.prototype.getCity = function()
{
	return this.city;
}

User.prototype.setCity = function(newCity)
{
	this.city = newCity;
}

User.prototype.getState = function()
{
	return this.state;
}

User.prototype.setState = function(newState)
{
	this.state = newState;
}

User.prototype.getZipCode = function()
{
	return this.zipCode;
}

User.prototype.setZipCode = function(newZip)
{
	this.zipCode = newZip;
}

User.prototype.getEmail = function()
{
	return this.email;
}

User.prototype.setEmail = function(newEmail)
{
	this.email = newEmail;
}

User.prototype.getPassword = function()
{
	return this.password;
}

User.prototype.setPassword = function(newPassword)
{
	this.password = newPassword;
}

/*
 * saveData: saves all the user info.
 * 
 * description: using the Web Storage API, all the data inserted by
 * 		user at view of cadastre page, are saved locally 
 * 		and permanently. This function is a method of User class
 * 		and cannot be called directly by the view, once implemented
 * 		the MVC design pattern.
 *
 * returns: flag_error, containing the log message if any error 
 * 		occurred
 *
 */
User.prototype.saveData = function()
{
	var flag_error = "";
	if (this == null) {
		flag_error = "null pointer passed as valid parameter\n";
		return flag_error;	
	} else {
		if (typeof(Storage) != "undefined") {
			/* 			   
   			 *  the pair (email, password) forms an primary key, 
			 *  wich identifies an unique user in localStorage
 			 */
			var primary_key = this.getEmail() + this.getPassword();

		       /*
 			* now, lets save all the data, reminding that
 			* we must care about the oneness of each user's register.
 			*/

			localStorage.setItem(primary_key + "name", this.getName());
			localStorage.setItem(primary_key + "cpf", this.getCPF());
			localStorage.setItem(primary_key + "birthDate", this.getBirthDate());
			localStorage.setItem(primary_key + "gender", this.getGender());
			localStorage.setItem(primary_key + "maritalStatus", this.getMaritalStatus());
			localStorage.setItem(primary_key + "city", this.getCity());
			localStorage.setItem(primary_key + "state", this.getState());
			localStorage.setItem(primary_key + "zipCode", this.getZipCode());
			localStorage.setItem(primary_key + "email", this.getEmail());
			localStorage.setItem(primary_key + "password", this.getPassword());
			flag_error = "data successfully recorded";
			return flag_error;
		} else {
			flag_error = "your browser does not support the Storage API";
			return flag_error;
		}
	}
}

/*
 * retriveData: recovers all the data previsoly saved.
 *
 * description: this function recovers all the data saved in the localStorage.
 *		Using a primary key (email + password), all the data are recovered
 *		and stored in respective property of the instance of class User.
 *		Note that, once implemented the MVC design pattern, this function
 *		shall not be called from the view.
 *
 * return: flag_error, containing the log message, if any error occured
 */
User.prototype.retrieveData = function()
{
	var flag_error = "";
	if (this.getEmail() == null || this.getPassword() == null) {
		flag_error = "user login informations are not defined. null value.";
		return flag_error;
	}

	var primary_key = this.getEmail() + this.getPassword();
	this.setName(localStorage.getItem("primary_key" + "name"));
	this.setCPF(localStorage.getItem(primary_key + "cpf"));
	this.setBirthDate(localStorage.getItem(primary_key + "birthDate"));
	this.setGender(localStorage.getItem(primary_key + "gender"));
	this.setMaritalStatus(localStorage.getItem(primary_key + "maritalStatus"));
	this.setCity(localStorage.getItem(primary_key + "city"));
	this.setState(localStorage.getItem(primary_key + "state"));
	this.setZipCode(localStorage.getItem(primary_key + "zipCode"));
	this.setEmail(localStorage.getItem(primary_key + "email"));
	this.setPassword(localStorage.getItem(primary_key + "password"));
	flag_error = "data successfully recovered";
	return flag_error;	
}


/*
 * validateUser: checks whether a user exists
 *
 * description: this method try to chek if an given user exists,
 * 		using the primary key (email + password), try to read
 *		from the local storage the information about the CPF,
 *		if getItem return null or undefined, its because the user
 *		does not exist, or exists, otherwise.
 *
 * return: 1 if the user does not exist,
 * 	   0, otherwise.
 */
User.prototype.validateUser = function()
{
	var primary_key = this.getEmail() + this.getPassword();
	var CPF = localStorage.getItem(primary_key + "cpf");
	if (CPF == null || CPF == undefined) {
		return 1;	
	} else {
		return 0;	
	}
}
