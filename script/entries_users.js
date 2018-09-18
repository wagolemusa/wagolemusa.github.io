
// Fetch all users, title and dates
let route2 = "https://dairyapp.herokuapp.com/api";

function Allentries(){
	let url = route2 +"/v2/all_entries"
	fetch(url,{
		method: "GET", headers : {
			"Content-Type":"application/json"}
	})
	.then((res)=>res.json())
	.then((data)=>{
        data = data["data"];
        //console.log(data)
        let entry = `
        <div class="book1">
        <table>
            <th>Title</th>
            <th>Date</th>
            <th>User</th>
            <th><th>
        </table>
        </div>`;

    Object.keys(data).forEach(function(AllE){
    let title = data[AllE]["title"]
    let dates = data[AllE]["dates"]
    let username = data[AllE]["username"]

    entry += `
    <div class="book">

	<table>

		<tr>
			<td> ${data[AllE]["title"]}</td>
			<td>${data[AllE]["dates"]}</td>
            <td>${data[AllE]["username"]}</td>
            
        <td><input type="submit" id="myBtn" value="View" onclick="shows(${data[AllE]["entry_id"]})"></td>

		
		</tr>
	</table>
    </div>`;
    });
    document.getElementById("allentries").innerHTML = entry

})
.catch((error) => console.log(error))
}




// Fetch all users, title and dates
// let route2 = "https://dairyapp.herokuapp.com/api";

function shows(entry_id){
	let url = "https://dairyapp.herokuapp.com/api/v2/all_entries/"+entry_id;
	fetch(url,{
		method: "GET", headers : {
			"Content-Type":"application/json"}
	})
	.then((res)=>res.json())
	.then((data)=>{
        data = data["data"];
        //console.log(data)
        let showE = `
        <div class="book1">
          
        `;

    Object.keys(data).forEach(function(Showme){
    let title = data[Showme]["title"]
    let dates = data[Showme]["dates"]
    let entries = data[Showme]["entries"]

    showE += `
			<h1> ${data[Showme]["title"]}</h2>
			<h4>${data[Showme]["dates"]}</h4>
            <b>${data[Showme]["entries"]}</b>
            `;
    });
    document.getElementById("allentries").innerHTML = showE

})
.catch((error) => console.log(error))
}
