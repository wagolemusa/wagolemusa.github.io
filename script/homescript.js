	function myFunction(){
		var txt;
		if (confirm("Do you have an account?")){
			 window.location = 'account.html';
		}else{
			 window.location = 'register.html';
	}
	document.getElementById("demo").innerHTML = txt;
}


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




// register user
//token = document.cookie.split(',')[0];
function fetchUser(){
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
		document.getElementById("reg").innerText = "Email exists "
		console.log(data["message"])
	}
})
.catch(error => console.log('error:',error));
}


// function fetchsession(){
// 	event.preventDefault()
// 	const url = route+"/v2/auth/signup";
// 	fetch(url, {method: "GET",
// headers: {"Content-Type":"application/json", 'x-access-token':token}})
// .then((resp)=> resp.json())
// .then((data)=> {
// 	if (data["message"] == "You are out of session" || data["message"] == "Your token expired Please Login again"
// || data["message"] == "Invalid token please login to get a new token"){
// 	window.location.replace('login.html');
// } else{console.log(data);}
// })
// .catch(error => console.log('error:',error));
// }


// function onload(){
// 	const url = route+"/v2/auth/signup"
// 	fetch(url, {method:"GET", 
// headers: {"Content-Type":"application/json", 'x-access-token':token}})
// .then((resp)=>resp.json())
// .then((data) =>{
//     if (data["message"] == "you are out of session" || data["message"] == "your token expired please login again"
// || data["message"] == "invalid token please login to get a new token")
// {
// window.location.replace('login.html');
// } 
// else{console.log("Welcome "+data["name"]);

// }

// })
// .catch(error =>{ window.location.replace('add_entry.html');});
// }





function fetchAddEntry(){
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
	window.location.replace("update_entry.html")
})
.catch(error => console.log('error:',error));
}



