let route = "https://senditparcel.herokuapp.com/api/"

function fetchnumbers(){
// Fuction to fetch numbers that Sum all Daily total
fetch(route+"v2/admin/daily/total", {  method: "GET",
headers:{"Content-Type":"application/json", "Accept":"applicaton/json"}})
.then((response) =>{
    response.json().then((y)=>{
        console.log(y)

    document.getElementById("orders").innerText= y["num"]
})

.catch((err) => console.log(err))
})


// Fuction  fetch numbers that Sum all weekly total data booked by client with Mpesa 
fetch(route+"v2/admin/weekly", {  method: "GET",
headers:{"Content-Type":"application/json", "Accept":"applicaton/json"}})
.then((response) =>{
    response.json().then((weekly)=>{
        console.log(weekly)

    document.getElementById("weeklydata").innerText= weekly["week"]
})

.catch((err) => console.log(err))
})


// Fuction  fetch numbers that Sum all monthly total data booked by client with Mpesa 
fetch(route+"v2/adman/monthly", {  method: "GET",
headers:{"Content-Type":"application/json", "Accept":"applicaton/json"}})
.then((response) =>{
    response.json().then((month)=>{
    console.log(month)
    month = month["month"]

    let output = `
    
    <table class="table">

    <thead>
      <tr>
        <th class="th-sm">Month</th>
        <th class="th-sm">Year</th>
        <th class="th-sm">Amount</th>
      </tr>
    
    `;
    Object.keys(month).forEach(function(searchme){

    output +=`
    <tbody>
    <tr>
        <td> ${month[searchme]["mon"]} </td>
        <td>${month[searchme]["yyyy"]}</td>
        <td> <h4>${month[searchme]["amount"]}</h4></td>
        
        
    </tbody>
    
    `;
    })
    document.getElementById("monthly").innerHTML = output
})

.catch((err) => console.log(err))
})


}