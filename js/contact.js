var siteName = window.location.hostname == ""? "Evrenomi" : capitalizeFirstLetter(window.location.hostname.split(".")[0]);
document.getElementById("contact-site").textContent = siteName;

var api = new ApiAuth();
function sendContact(){
    contact = { 
        "site": window.location.hostname,
        "name": document.getElementById("contact-name").value,
        "email": document.getElementById("contact-email").value,
        "head": document.getElementById("contact-head").value,
        "body": document.getElementById("contact-body").value,
    };
    console.log(contact);
    api.resultFunction = (t) => {
        alertify.message(t.message);
    };
    api.resultErrFunction = (t) => {
        alertify.message(t.message);
        console.log(t);
        alertify.error();
    };  
    api.Post("contact/add", contact);
    
}

//alertify.alert("Su anda bu bölümü yapım asamasında 1 gün içerisinde yeniden calısır olucak. Lütfen daha sonra tekrar deneyin.");
