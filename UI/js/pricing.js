let token = localStorage.getItem('access_token')
let current_user = localStorage.getItem('current_user')
let access_token = "Beare " + token

// let route = "/v2/admin/display/price/data"


function getuser(){
    document.getElementById('current_user').innerHTML = current_user
}

fetch("https://senditparcel.herokuapp.com/api/v2/admin/display/price",{
    method: "GET", 
    headers: {
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization": current_user
    },

})
.then((response)=>{
    response.json().then((dis)=>{
        console.log(dis)
        dis = dis["dis"];
        let output = `
        <div class="tabl">
        <table id="tablePreview" class="table table-striped table-hover table-borderless">
        <thead>
        <tr>
        <th>From</th>
        <th>To</th>
        <th>Price</th>
        <th>Travel Time</th>
        <th>Arrival</th>
        <th>Period</th>
        <th>Date</th>
        </tr>
        </thead>
        </div>
    
        `;

        Object.keys(dis).forEach(function(pric){
            

            output +=`
           
                <tr>
                <td>${dis[pric]["from_location"]}</td>
                <td>${dis[pric]["to_location"]}</td>
                <td>${dis[pric]["price"]}</td>
                <td>${dis[pric]["day_time"]}</td>
                <td>${dis[pric]["arrival"]}</td>
                <td>${dis[pric]["period"]}</td>
                <td>${dis[pric]["dates"]}</td>`
        
        });
        // if (collection){
        //     document.getElementById("msgerror").innerText = collection["message"]
        //     // window/location.replace("login.html")
        // }
        // else{
        document.getElementById("shows").innerHTML = output + `</table>`;
        // }
    
})
.catch(err => console.log(err));
})