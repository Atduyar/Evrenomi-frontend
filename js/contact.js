var siteName = window.location.hostname == ""? "Evrenomi" : capitalizeFirstLetter(window.location.hostname.split(".")[0]);
document.getElementById("contact-site").textContent = siteName;

var api = new ApiAuth();
function sendContact(){
    contact = { 
        site: window.location.hostname,
        name: document.getElementById("contact-name").innerHTML,
        email: document.getElementById("contact-email").innerHTML,
        head: document.getElementById("contact-head").innerHTML,
        body: document.getElementById("contact-body").innerHTML,
    };
    api.resultFunction = (t) => {
        alertify.message(t.message);
    };
    api.resultErrFunction = (t) => {
        alertify.message("Su anda bu bölümü yapım asamasında 1 gün içerisinde yeniden calısır olucak. Lütfen daha sonra tekrar deneyin.");
        console.log(t);
        alertify.error(t.message);
    };  
    api.Post("contact/add", contact);
    
}

alertify.alert("This is an alert dialog.", function(){
    alertify.message("Su anda bu bölümü yapım asamasında 1 gün içerisinde yeniden calısır olucak. Lütfen daha sonra tekrar deneyin.");
});
