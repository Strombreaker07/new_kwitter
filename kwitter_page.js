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
    room_store = localStorage.getItem("room_name");

    function send() 
{
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_store).push(
            {
                 name : user_name,
                 message : msg,
                 like : 0
            }
      );
      document.getElementById("msg").value = "";
}


function getData() { firebase.database().ref("/"+room_store).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
         console.log(firebase_message_id);
         console.log(message_data);
         name = message_data['name'];
         message = message_data['message'];
         like = message_data['like'];
         name_tick = "<h4>" + name + "<img src='tick.png' class='user_tick'> </h4>";
         name_tag = "<h4>" + name + "<img src='tick.png' class='user_name_ticked logo2'> </h4>";
         message_tag = "<h4 class='message_h4'>" + message + "</h4>";
         like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value = "+ like + " onclick='updatelike(this.id)'>";
         span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>" +like+ "</span> </button><hr>";
         row = name_tag + message_tag + like_button + span_with_tag;
         document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();

function logout()
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}

function updatelike(message_id) 
{
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      likes_count = 1 + Number(likes);
      console.log(likes_count);
      firebase.database().ref(room_store).child(message_id).update({
          like : likes_count
      });
}