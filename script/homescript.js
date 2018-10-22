
// declare the main route
let route = "https://dairyapp.herokuapp.com/api";
let token = JSON.parse(localStorage.getItem("token"));
// fetch the home message
function fetchIndex(){
fetch(route+"/", {method:"GET", 
headers:{"Content-Type":"application/json"}})
.then((response) => response.json())
.then((data)=>{
    document.getElementById("output").innerHTML = data["message"]
})
.catch((err) => console.log(err))
}

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




// Fetch all Entries
document.getElementById("submit").addEventListener("click",
function fetchAddEntry(event){
	event.preventDefault()
	let url = route+"/v2/entries";

	let title =document.forms["create"]["title"].value;
	let dates = document.forms["create"]["dates"].value;
	let entries = document.forms["create"]["entries"].value;

	let data = {title:title, dates:dates, entries:entries}
	fetch(url, {method:"POST",
	headers: {"Content-Type":"application/json", 'x-access-token':token},
    body:JSON.stringify(data)
})
.then((response) => response.text())
.then((output) => {
	document.getElementById("regstatus").innerText = "Succesfully posted "
	window.location.replace("add_entry.html")
})
.catch(error => console.log('error:',error));
})



