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
////////////////////////////////////////////////////////////////////////////


// Fuction fetch sum number paid with cash 
fetch(route+"v2/admin/book/daily", { 
    method: "GET",
    headers:{
        "content-Type":"application/json",
        "Accept":"application/json"
    }
 }).then((response) =>{
     response.json().then((dayTotal)=>{
        //  console.log(dayTotal)
    document.getElementById("resption").innerText = dayTotal["cash"]
     })
     .catch((err) => console.log(err))
 })


// Fuction  fetch numbers that Sum all weekly total data client booked by cash
fetch(route+"v2/admin/book/weekly", {  method: "GET",
headers:{"Content-Type":"application/json", "Accept":"applicaton/json"}})
.then((response) =>{
    response.json().then((weeklyTotal)=>{
        // console.log(weeklyTotal)

    document.getElementById("weeklyTotal").innerText= weeklyTotal["cashweek"]
})

.catch((err) => console.log(err))
})

// Fuction  fetch numbers that Sum all monthly total data booked by client with Mpesa 
fetch(route+"v2/admin/book/month", {  method: "GET",
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
    document.getElementById("monthlycash").innerHTML = output
})
.catch((err) => console.log(err))
})
 

// Fuction fetch sum number paid on resption with Mpesa
fetch(route+"v2/admin/desk/daily", { 
    method: "GET",
    headers:{
        "content-Type":"application/json",
        "Accept":"application/json"
    }
 }).then((response) =>{
     response.json().then((dailyTotal)=>{
        //  console.log(dailyTotal)
    document.getElementById("resp").innerText = dailyTotal["num"]
     })
     .catch((err) => console.log(err))
 })

// Fuction  fetch numbers that Sum all weekly total. booked on receiption by mpesa
fetch(route+"v2/admin/desk/weekly", {  method: "GET",
headers:{"Content-Type":"application/json", "Accept":"applicaton/json"}})
.then((response) =>{
    response.json().then((weeklyTotal)=>{
        // console.log(weeklyTotal)

    document.getElementById("weekly").innerText= weeklyTotal["week"]
})

.catch((err) => console.log(err))
})

// Fuction  fetch numbers that Sum all monthly total data done on Reception 
fetch(route+"v2/admin/desk/monthly", {  method: "GET",
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
    document.getElementById("monthlyrecep").innerHTML = output
})
.catch((err) => console.log(err))
})



// Fuction fetch sum number paid on resption with Mpesa
fetch(route+"v2/admin/resption/cash/daily", { 
    method: "GET",
    headers:{
        "content-Type":"application/json",
        "Accept":"application/json"
    }
 }).then((response) =>{
     response.json().then((dayTotal)=>{
        //  console.log(dayTotal)
    document.getElementById("cashreception").innerText = dayTotal["cash"]
     })
     .catch((err) => console.log(err))
 })


// Fuction  fetch numbers that Sum all weekly total. booked on receiption by mpesa
fetch(route+"v2/admin/resption/cash/weekly", {  method: "GET",
headers:{"Content-Type":"application/json", "Accept":"applicaton/json"}})
.then((response) =>{
    response.json().then((weeklyTotal)=>{
        // console.log(weeklyTotal)

    document.getElementById("weeklycash").innerText= weeklyTotal["cash"]
})

.catch((err) => console.log(err))
})


// Fuction  fetch numbers that Sum all monthly total data done on Reception 
fetch(route+"v2/admin/resption/cash/monthly", {  method: "GET",
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
    document.getElementById("monthlyreception").innerHTML = output
})
.catch((err) => console.log(err))
})



}