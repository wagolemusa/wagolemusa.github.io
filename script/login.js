

//User Login
let route = "https://dairyapp.herokuapp.com/api";

document.getElementById("regform").addEventListener("submit",
function fetchlogin(event){
	event.preventDefault()
	let username = document.forms["login"]["username"].value;
	let password = document.forms["login"]["password"].value;

	if (username == ""){
		alert("Username can't not be empty");
		document.login.username.focus();
		return false
	}
	else if (password == ""){
		alert("Password can't be empity");
		document.login.password.focus();
		return false
	}
	else{
		let url = route+"/v2/auth/login"

		let data = {username:username, password:password};
		fetch(url, {method: "POST",
		headers:{
			"Content-Type":"application/json"
		},
	body:JSON.stringify(data)
	})
	.then((res)=>res.json())
	.then((data) => {
		if (data["token"]){
			localStorage.setItem("token", JSON.stringify(data["token"]));
			window.location.assign("add_entry.html");
		}
		else {
			document.getElementById("regstatus").innerText = data["message"];
			console.log(data["message"]);
		}
	})
	.catch(error => console.log('error:',error));
}

});