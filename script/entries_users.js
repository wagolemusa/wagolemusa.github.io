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
        </table>
        </div>`;

    Object.keys(data).forEach(function(AllE){
    let title = data[AllE]["title"]
    let dates = data[AllE]["dates"]
    let username = data[AllE]["username"]

    console.log(AllE)

    entry += `
    <div class="book">

	<table>

		<tr>
			<td>${data[AllE]["title"]}</td>
			<td>${data[AllE]["dates"]}</td>
			<td>${data[AllE]["username"]}</td>
		
		</tr>
	</table>
    </div>`;
    });
    document.getElementById("allentries").innerHTML = entry

})
.catch((error) => console.log(error))
}
