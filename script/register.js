let route = "https://dairyapp.herokuapp.com/api";

// User Registration 
document.getElementById("submit").addEventListener("click",
function fetchUser(event){
	event.preventDefault()
	let url = route+"/v2/auth/signup"
	let full_name = document.forms["register"]["full_name"].value;
	let username = document.forms["register"]["username"].value;
	let email = document.forms["register"]["email"].value;
	let password = document.forms["register"]["password"].value;
	let confirm_password = document.forms["register"]["confirm_password"].value;
	var atindex=email.indexOf("@");

	var dotindex=email.lastIndexOf(".");
	if (full_name == "" || username == "" || password.length < 8 ||confirm_password == ""){
		alert("All fields must be filled out and password should be 8 characters long")
		return false;
	}

	else if (atindex<1 || dotindex-atindex <2){
		alert("Invalid email");
		return false;
	}

	else if(password != confirm_password){
		alert("Password Should match");
		return false;
	}

	let data = {full_name:full_name, username:username, email:email, password:password, confirm_password:confirm_password};
	fetch(url, {method:"POST",
	headers:{
		"Content-Type":"application/json"
	},
	body:JSON.stringify(data)
	})
	.then((res)=>res.json())
	.then((data) => {
		if (data["message"] == "You registered succesfully"){
		window.location.replace("login.html") 
	}
	else if (data["message"] == "A conflict happened."){
		document.getElementById("reg").innerText = "Username already taken or Email exists. Try again!!";
		console.log(data["message"])
	}
	else{
		document.getElementById("reg").innerText = "You registered succesfully"
		window.location.replace("login.html") 
	}
})
.catch(error => console.log('error:',error));
});