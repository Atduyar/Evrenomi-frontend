var mySidenav = document.getElementById("mySidenav");
var myMask = document.getElementById("myMask");

function openNav() {
    mySidenav.style.width = "250px";
    myMask.style = "display:block!important;";
    myMask.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    mySidenav.style.width = "0";
    myMask.style.backgroundColor = "rgba(0,0,0,0)";
    setTimeout(() => { document.getElementById("myMask").style = ""; }, 500);

}

var apiNav = new ApiAuth;
getUser()

function getUser() {
    apiNav.resultFunction = (t)=>{    //token alırsan
        apiNav.resultFunction = (u)=>{//kullanıcıyı alırsan
            console.log(u);
            document.getElementsByClassName("nav-bar")[0].getElementsByClassName("nav-bar-pc")[0].children[0].innerText = u.nickname;
        }
        // apiNav.resultErrFunction = apiNav.resultErrFunction;//kullanıcıyı almasa
        apiNav.GetMyProfil(t.token);
    };
    apiNav.resultErrFunction = (t)=>{//token almasa
        console.log(t);
    };
    ApiAuth.GetToken(apiNav);
}