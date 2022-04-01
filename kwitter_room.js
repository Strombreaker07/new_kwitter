// Your web app's Firebase configuration
const firebaseConfig = {
      apiKey: "AIzaSyCKqSLSOCHrsYeyltM0kOK6knSpRBXK4zg",
      authDomain: "kwitter-6453b.firebaseapp.com",
      databaseURL: "https://kwitter-6453b-default-rtdb.firebaseio.com",
      projectId: "kwitter-6453b",
      storageBucket: "kwitter-6453b.appspot.com",
      messagingSenderId: "429953150070",
      appId: "1:429953150070:web:58b44267fc6e930b53c357"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
document.getElementById("welcome_name").innerHTML = "Welcome " + user_name + "!";

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
       //start code
      console.log(Room_names);
      row = "<div class='room_name' id="+ Room_names + " onclick='redirect(this.id)'>#" + Room_names + "</div>"
      document.getElementById("output").innerHTML += row;
      //End code
      });});}
getData();

function addRoom() 
{
      room_store = document.getElementById("room_name").value;

      firebase.database().ref("/").child(room_store).update({
            purpose : "adding room name"
        });
      
      localStorage.setItem("room_name", room_store);
      window.location = "kwitter_page.html";
}

function logout()
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}

function redirect(name) 
{
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html"
}