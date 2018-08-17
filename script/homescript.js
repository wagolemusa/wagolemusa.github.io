	function myFunction(){
		var txt;
		if (confirm("Do you have an account?")){
			 window.location = 'account.html';
		}else{
			 window.location = 'register.html';
	}
	document.getElementById("demo").innerHTML = txt;
}




let route = "https://dairyapp.herokuapp.com/api/";

function fetchIndex(){
fetch(route+"/", {method:"GET", 
headers:{"Content-Type":"application/json"}})
.then((response) => response.json())
.then((data)=>{
    document.getElementById("output").innerHTML = data["message"]
})
.catch((err) => console.log(err))
}



// function getText(){
// 	fetch('https://dairyapp.herokuapp.com/api/')
// 	.then((res) => res.text())
// 	.then((data) =>{
// 		document.getElementById('output').innerHTML = data;
// 	})
// 	.catch((err) => console.log(err))
// }
