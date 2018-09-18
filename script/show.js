
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
