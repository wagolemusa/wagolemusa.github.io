
//let token = JSON.parse(localStorage.getItem("token"));
var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

/*btn.onclick = function() {
    modal.style.display = "block";
}*/

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var modal2 = document.getElementById('myModal2');
var btn = document.getElementById("myBtn1");

var span = document.getElementsByClassName("close1")[0];

/*btn.onclick = function() {
    modal.style.display = "block";
}*/

span.onclick = function() {
    modal2.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}

// let route2 = "https://dairyapp.herokuapp.com/api";


// let token = JSON.parse(localStorage.getItem("token"));
// let modal = document.getElementById('myModal');
// let btn = document.getElementById("myBtn");
// let span = document.getElementsByClassName("close")[0];

// fetch("https://dairyapp.herokuapp.com/api/v2/entries",{
// 	method: "GET",
// 	headers: {
// 		"Content-Type": "application/json",
// 		"Accept":"application/json",
// 		"x-access-token":token
// 	},
// })
// .then((response)=>{
// 	response.json().then((data)=>{ 
// 		//console.log(data)
// 		if (data["message"] == "Token is missing!" || data["message"] == "Token is invalid!"){
// 			window.location.replace(login.html)
// 		}
// 		else{
// 			let output =`
// 			<div style="overflow-x:auto;">
// 			<table>
// 			<tr>
// 			<th>Title</th>
// 			<th>Date</th>
// 			<th></th>
// 			<th>Action</th>
// 			</tr>`;
// 			data.forEach(function(entr){
// 				//let entries = "`"+data[entr]["entries"]+"`";
// 				 let title = entr["title"];
// 				 let dates = entr["dates"];
// 				// let entries = data[entr]["entries"];
// 				console.log(entr)

// 				output += `
// 				<tr>
// 				<td>${entr.title}</td>
			
// 				<td>${entr.dates}</td>
// 				<td><div id="myBtn"class="view", onclick="viewSingle(${entr.entry_id})">
// 				<td> <div id="Btn" class="view", onclick="modifyEntry(${entr.entry_id}','${entr.title}',${entr.entries})"></div>
// 				<h5>EDIT</h5></div>  <div class="view" onclick="deleteEntry(${entr.entry_id})"><h5>DELETE</h5></div></td>
// 				</tr>`;
// 			});
// 			document.getElementById("tableform").innerHTML = output + `</table></div>`;
// 		}
// 	})
// 	//.catch(err => console.log(err));
// })

// let token = JSON.parse(localStorage.getItem("token"));
// let modal = document.getElementById('myModal');
// let btn = document.getElementById("myBtn");
// let span = document.getElementsByClassName("close")[0];

// document.addEventListener("DOMContentLoaded", ()=>{
//     if (!token){
//         window.location.replace('login.html');
//     }
//     else{
//         let url = route2+"/v2/entries";
//         fetch(url, {
//             method:"GET",
//             headers: {"Content-Type":"application/json", 'x-access-token':token}
//         })
//         .then((response) => response.json())
//         .then((data) => {
//             if (data["message"] == "you are out of session" 
//             || data["message"] == "your token expired please login again"
//             || data["message"] == "invalid token please login to get a new token") {
//                 window.location.replace('login.html');
//             }
//             else{
//                 let output =`
//                 <div style="overflow-x:auto;">
//                 <table>
//                 <tr>
// 				<th>Title</th>
// 				<th>Date</th>
//                 <th>Action</th>
//                 </tr>`;
//                 Object.keys(data["message"]).forEach(function(ent){
//                     let title = data["message"][ent]["title"];
//                     let dates = data["message"][ent]["dates"];
// 					//let entries = data["message"][ent]["entries"];
// 					console.log(data)

//                     output +=`
//                     <tr>
//                     <td>${data["message"][ent]["title"]}</td>
//                     <td>${data["message"][ent]["dates"]}</td>
//                     <td><div id="myBtn"class="view", onclick="viewSingle(${data["message"][ent]["ID"]},\`${title}\`,\`${dates}\`)">
//                     ${data["message"][ent]["title"]}</td>
//                     <td> <div id="Btn" class="view", onclick="edit(${data["message"][ent]["ID"]},\`${title}\`,\`${dates}\`)">
//                     <h5>EDIT</h5></div>  <div class="view" onclick="deletes(${data["message"][ent]["ID"]})"><h5>DELETE</h5></div></td>
//                     </tr>`;
//                 });
//                 document.getElementById("tableform").innerHTML = output + `</table></div>`;
//                 document.getElementById("total").innerHTML = "Total entries : " +Object.keys(data["message"]).length.toString();
//             }
//         })
//         .catch((error) => console.log(error)) 
//     }
// });