let route2 = "https://dairyapp.herokuapp.com/api";



// Fetch user entries
let token = JSON.parse(localStorage.getItem("token"));
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
			data = data["data"];
			//console.log(data)
			let output =`
			<div class="book-container">
			<div class="book2">
			<table>
				<th>Title</th>
				<th>Date</th>
				<th></th>
				<th></th>
				<th></th>
		
			
			</table>`;
			Object.keys(data).forEach(function(entr){
				//let entries = "`"+data[entr]["entries"]+"`";
				let title = data[entr]["title"];
				let dates = data[entr]["dates"];
				let entries = data[entr]["entries"];
				//console.log(data)

				output += `
				<table>
					<tr>

				<td>${data[entr]["title"]}</td>
			
				<td>${data[entr]["dates"]}</td>

				<td><input type="submit" id="myBtn" value="View" onclick="viewSingle(${data[entr]["entry_id"]})"></td>
				<td><input type="submit" id="myBtn1" value="Edit" onclick="edit('${data[entr]["entry_id"]}','${data[entr]["title"]}','${data[entr]["dates"]}','${data[entr]["entries"]}')"></td>
				<td><input type="submit" id="delete" value="Delete" onclick="deleteEntry(${data[entr]["entry_id"]})"></td>
                
				</div></div></tr>`;
			});
			document.getElementById("book-update").innerHTML = output + `</table>`;
		}
	})
	.catch(err => console.log(err));
})

// Fetch and View entry by ID
function viewSingle(entry_id){
	let url = route2 +"/v2/entries/"+entry_id;
	fetch(url,{
		method: "GET", headers : {
			"Content-Type":"application/json",
			"x-access-token":token}
	})
	.then((res)=>res.json())
	.then((data)=>{
		data = data["data"];

		let show =`
		<p></p>
		<p></p>
		<p></p>
		`;
		Object.keys(data).forEach(function(me){
		//console.log(data)
		let title = data[me]["title"];
		let dates = data[me]["dates"]
		let entries = data[me]["entries"];

		show +=`
		<div class="shows">
		<p style="color:red">${data[me]["title"]}</p>
		
		<h3>${data[me]["dates"]}</h3><br/><br/>

		${data[me]["entries"]}
		</div>
		`;

		});
		//document.getElementById("single").innerText = data["title"];
		//document.getElementById("dates").innerHTML  = data['dates'];
		document.getElementById("editor").innerHTML = show
		modal.style.display ="block";
	})
	.catch((error) => console.log(error))

}



// Update Entries
function edit(entry_id,title, dates, entries){
    
    modal.style.display="block";
	document.getElementById("single").innerText = "";
	document.getElementById("title").innerText = "";
	document.getElementById("manydate").innerHTML = "";
	document.getElementById("dates").innerText = "";
	document.getElementById("singleTitle").innerText = "";
    document.getElementById("entries").innerText = "";
	document.getElementById("editor").innerHTML = `
	
    <form name="modify"><br><p id="id"></p><br>
	<textarea maxlength="20" rows ="2" cols = "33" name ="title">${title}</textarea><br><br>
	<textarea maxlength="20" rows ="2" cols = "33" name ="dates">${dates}</textarea><br><br>
    <textarea rows ="10" cols = "33" name ="entries">${entries}</textarea><br><br>
    <button class="view" name="save" id = "submit">Edit </button><br></form>
    `;
    document.getElementById("submit").addEventListener("click",
    function modifyEntry(event){
        event.preventDefault();
        let url = "https://dairyapp.herokuapp.com/api/v2/entries/"+entry_id;
		let title = document.forms["modify"]["title"].value;
		let dates = document.forms["modify"]["dates"].value;
        let entries = document.forms["modify"]["entries"].value;
        let data = {title:title, dates:dates, entries:entries}
        fetch(url, {
            method:"PUT", headers: {"Content-Type":"application/json", "x-access-token":token},
            body:JSON.stringify(data)
        })
        .then((response)=>response.json())
        .then((output)=>{
			document.getElementById("id").innerText = "Succesfully updated "
			window.location.replace("update_entry.html")
        })
        .catch((error)=>console.log(error))
    });
}



// Delete Entry by id
function deleteEntry(entry_id){
	let url = "https://dairyapp.herokuapp.com/api/v2/entries/"+entry_id;
	if (window.confirm("Are you sure, You want to delete?")){
		fetch(url, {
			method:"DELETE",
			headers: {"Content-Type":"application/json", 'x-access-token':token}
		})
		.then((res) => res.json())
		.then((data) => {
			//console.log(data["message"]);
			window.location.replace("update_entry.html");
		})
	}
	else{
		window.location.replace("update_entry.html");
	}
}
