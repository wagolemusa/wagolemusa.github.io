let route2 = "https://dairyapp.herokuapp.com/api";


let token = JSON.parse(localStorage.getItem("token"));
let modal = document.getElementById('myModal');
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];

fetch("https://dairyapp.herokuapp.com/api/v2/entries",{
	method: "GET",
	headers: {
		"Content-Type": "application/json",
		"Accept":"application/json",
		"x-access-token":token
	},
})
.then((response)=>{
	response.json().then((data)=>{ 
		//console.log(data)
		if (data["message"] == "Token is missing!" || data["message"] == "Token is invalid!"){
			window.location.replace(login.html)
		}
		else{
			let output =`
			<div style="overflow-x:auto;">
			<table>
			<tr>
			<th>Title</th>
			<th>Date</th>
			<th></th>

			<th>Action</th>

			</tr>`;
			Object.keys(data).forEach(function(entr){
				//let entries = "`"+data[entr]["entries"]+"`";
				let title = data[entr]["title"];
				let dates = data[entr]["dates"];
				let entries = data[entr]["entries"];
				//console.log(entr.title)

				output += `
				<tr
				<td>${data[entr]["title"]}</td>
			
				<td>${data[entr]["dates"]}</td>
				<td><div id="myBtn"class="view", onclick="viewSingle(${data[entr]["entry_id"]})">
				<td> <div id="Btn" class="view", onclick="modifyEntry(${data[entr]["entry_id"]}','${data[entr]["title"]}',${entries})"></div>
				<h5>EDIT</h5></div>  <div class="view" onclick="deleteEntry(${data[entr]["entry_id"]})"><h5>DELETE</h5></div></td>
				</tr>`;
			});
			document.getElementById("tableform").innerHTML = output + `</table></div>`;
		}
	})
	.catch(err => console.log(err));
})

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
//             headers: {"Content-Type":"application/json", 'X-API-KEY':token}
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
//                 </tr>
//                 `;
//                 Object.keys(data["message"]).forEach(function(ent){
                    // let title = data["message"][ent]["title"];
                    // let dates = data["message"][ent]["dates"];
                    // //let entries = data["message"][ent]["entries"];

//                     output += `
//                     <tr>
//                     <td>${data["message"][ent]["title"]}</td>
//                     <td>${data["message"][ent]["dates"]}</td>
//                     <td><div id="myBtn"class="view", onclick="viewSingle(${data["message"][ent]["ID"]},\`${title}\`,\`${dates}\`)">
//                     ${data["message"][ent]["title"]}</td>
//                     <td> <div id="Btn" class="view", onclick="edit(${data["message"][ent]["ID"]},\`${title}\`,\`${dates}\`)">
//                     <h5>EDIT</h5></div>  <div class="view" onclick="deletes(${data["message"][ent]["ID"]})"><h5>DELETE</h5></div></td>
//                     </tr>
//                     `;
//                 });
//                 document.getElementById("tableform").innerHTML = output + `</table></div>`;
//                 document.getElementById("total").innerHTML = "Total entries : " +Object.keys(data["message"]).length.toString();
//             }
//         })
//         .catch((error) => console.log(error)) 
//     }
// });


function viewSingle(entry_id){
	let url = route2 +"/v2/entries/"+entry_id;
	fetch(url,{
		method: "GET", headers : {
			"Content-Type":"application/json",
			"x-access-token":token}
	})
	.then((res)=>res.json())
	.then((data)=>{
		document.getElementById("single").innerText = data["message"][2];
		ducument.getElementById("editor").innerHTML = '';
		model.style.display ="block";
	})
	.catch((error) => console.log(error))

}


let editId;
function edit(entry_id, title, entries){
	editId = entry_id;
	model.style.display="block";
	document.getElementById("single").innerHTML = "";
	document.getElementById("editor").innerHTML = `
	<form name="modify" onsubmit="modifyEntry()"<br><p id="id"></p></br>
	<textarea maxlength="20" rows="1" cols="33" name="title">${title}<textarea><br>
	<textarea rows="10" cols="33" name="entry">${entries}</textarea></br><br/>
	<button name="save">Edit</button><br></form>
	`;
}

function modifyEntry(){
	event.preventDefault();
	let url = route2+"/v2/entries/"+editId;
	let title = document.forms["modify"]["title"].value;
	let dates = document.forms["modify"]["datas"].value;
	let entries = document.forms["modify"]["entries"].value;

	let data = {title:title, dates:dates, entries:entries}

	fetch(url, {
		method:"PUT", headers:{"Content-Type":"application/json", 'X-API-KEY':token},
		body:JSON.stringify(data)
	})
	.then((res)=>res.json())
	.then((output)=>{
		if (output["message"] == "Edited successfully")
		{
			window.location.replace("add_entries.html")
			console.log(output);
		}else{
			document.log("id").innerHTML = output["message"];
		}
	})
	.catch((error)=>console.log(error))
}


function deleteEntry(entry_id){
	let url = route2+"/v2/entries/entry_id";
	if (window.confirm("Are you sure, You want to delete?")){
		fetch(url, {
			method:"DELETE",
			headers: {"Content-Type":"application/json", 'x-access-token':token}
		})
		.then((res) => res.json())
		.then((data) => {
			//console.log(data["message"]);
			window.location.replace("add_entrie.html");
		})
	}
	else{
		window.location.replace("add_entries.html");
	}
}

