function show(){
    console.log("on")
    document.getElementById("hide-show").style.width = "300px";

    document.getElementById("text-uploaded").style.display="block";
    

    var deleteButtons = document.getElementsByClassName('pdf-name');
    for (var i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].style.display = "block";
    }
    

    var deleteButtons = document.getElementsByClassName('delete-button');
    for (var i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].style.display = "block";
    }

    var deleteButtons = document.getElementsByClassName('pdf-svg');
    for (var i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].style.display = "none";
    }

    var pdf_link = document.getElementsByClassName('pdf-link');
    for (var i = 0; i < pdf_link.length; i++) {
        pdf_link[i].style.background="white";

    }

}


function hide(){
    console.log("out")

    

    document.getElementById("hide-show").style.width = "100px";
 

    var pdf_name = document.getElementsByClassName('pdf-name');
    for (var i = 0; i < pdf_name.length; i++) {
        pdf_name[i].style.display = "none";
    }

    document.getElementById("text-uploaded").style.display="none";

    var deleteButtons = document.getElementsByClassName('delete-button');
    for (var i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].style.display = "none";
    }

    var pdfsvg = document.getElementsByClassName('pdf-svg');
    for (var i = 0; i < pdfsvg.length; i++) {
        pdfsvg[i].style.display = "block";
    }

    var pdf_link = document.getElementsByClassName('pdf-link');
    for (var i = 0; i < pdf_link.length; i++) {
        pdf_link[i].style.background="transparent";
        pdf_link[i].style.border="none";
    }




}

function generatemodel(){
    document.getElementById('loader').style.display="block"
    document.getElementById('generate-button').style.display="none"
    fetch("/generateModel")  // Replace with your actual Flask API endpoint
        .then(response => response.json())

        .then(data => {
            console.log(data.message)
            document.getElementById('flash-message').style.display="block";
            document.getElementById('loader').style.display="none"
            document.getElementById('generate-button').style.display="block"

        })
        .catch(error => {
            console.error("Error:", error);
        });
}






// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



// When the user clicks on the button, open the modal
btn.onclick = function() {
modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal) {
modal.style.display = "none";
}
}


$(document).ready(function(){

var $messages = $('.messages-content'),
d, h, m,
i = 0;

$(window).load(function() {
$messages.mCustomScrollbar();
setTimeout(function() {
fakeMessage();
}, 100);
});



function updateScrollbar() {
$messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
scrollInertia: 10,
timeout: 0
});
}

function setDate(){
d = new Date()
if (m != d.getMinutes()) {
m = d.getMinutes();
$('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
}
}



function insertMessage() {
msg = $('.message-input').val();




var d = {message: msg};
$.ajax({
    url: '/messaging',
    type: 'post',
    contentType: 'application/json',
    success: function (data) {
      $("#fake_message").html(data["message"]);
       console.log(data);
       var fake = $("#fake_message").html();

        if ($('.message-input').val() != '') {
        return false;
        }

        setTimeout(function() {
        $('.message.loading').remove();
        $('<div class="message new"><figure class="avatar"><img src="https://img.freepik.com/premium-vector/chatbot-icon-concept-chat-bot-chatterbot-robot-virtual-assistance-website_123447-1615.jpg?w=2000" /></figure><p id="koto">' +fake+ '</p></div>').appendTo($('.mCSB_container')).addClass('new');
        setDate();
        updateScrollbar();
        i++;
        }, 5000 + (Math.random() * 20) * 100);


        }
    ,
    data: JSON.stringify(d)
});

if ($.trim(msg) == '') {
return false;
}

$('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
$('<div class="message loading new"><figure class="avatar"><img src="https://img.freepik.com/premium-vector/chatbot-icon-concept-chat-bot-chatterbot-robot-virtual-assistance-website_123447-1615.jpg?w=2000" /></figure><span></span></div>').appendTo($('.mCSB_container'));
updateScrollbar();

setDate();
$('.message-input').val(null);
updateScrollbar();
setTimeout(function() {
fakeMessage();
}, 1000 + (Math.random() * 20) * 100);
}

$('.message-submit').click(function() {
insertMessage();
});

$(window).on('keydown', function(e) {
if (e.which == 13) {
insertMessage();
return false;
}
})






});





// Function to generate a random string
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Function to generate and copy the link
function generateAndCopyLink() {
    var link = window.location.origin + '/sharing/' + generateRandomString(10);
    var textarea = document.createElement("textarea");
    textarea.value = link;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Link copied to clipboard: " + link);
}

// Add an event listener to the button
document.getElementById("share-button").addEventListener("click", generateAndCopyLink);