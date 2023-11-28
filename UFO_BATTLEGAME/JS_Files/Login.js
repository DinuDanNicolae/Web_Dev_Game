window.onload = function() {
    document.getElementById("LoginButton").onclick = loginRequest;
}

function loginRequest(){

    let username = document.getElementById("inputUser").value;
    let password = document.getElementById("inputPassword").value;

    let options = {
        method: "GET", 
      };

    let url = "http://wd.etsisi.upm.es:10000/users/login?username=" + username + "&password=" + password;

    fetch(url, options)
  
    .then (function(response){
      
      // If code 200 pass the header to the next then
      if (!response.ok) {
        throw new Error('Response problem ' + response.statusText);
      }

      return response.headers.get('authorization');

    })

    .then (function(data){

      // If data is not null, save the JWT in the local storage
      if (data) {

        let jwt = data.slice(7); 
        localStorage.setItem("JWT", jwt);
        console.log(jwt);

      } else {
          throw new Error('Authorization token invalid');
      }

    })
    
    .catch (function(error){
      alert("Error: " + error.message);
    })
}

