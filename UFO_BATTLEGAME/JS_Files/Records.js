window.onload = function() {
    userRequest();
}

function userRequest(){
    let options = {
        method: "GET", 
      };
    let url = "http://wd.etsisi.upm.es:10000/records"
    
    fetch(url, options)
  
    .then (function(response){
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status + " " + response.statusText);
      }
    })
    .then (function(data){
      print(data);
    })
  
    .catch (function(error){
      alert("Error: " + error.message);
    })
  
  }

  function print(data){

    let tbody = document.querySelector('.table tbody');

    tbody.innerHTML = '';

    for (let i = 0; i < data.length; i++) {

        // Process the date and format it
        let date = new Date(data[i].recordDate);
        let formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

        // Create the row for each player and add it to the table
        let row = `
            <tr>
                <td>${i + 1}</td>
                <td>${data[i].username}</td>
                <td>${data[i].punctuation}</td>
                <td>${data[i].ufos}</td>  
                <td>${data[i].disposedTime}</td>  
                <td>${formattedDate}</td>  
            </tr>
        `;

        tbody.innerHTML += row;
    }
  }