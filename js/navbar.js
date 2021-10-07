var globalUser;
//window.location = "twitter://mentions"

var mySidenav = document.getElementById("mySidenav");
var myMask = document.getElementById("myMask");

const capitalizeFirstLetter = ([first, ...rest], locale = navigator.language) =>
    first.toLocaleUpperCase(locale) + rest.join('')

function openNav() {
    mySidenav.style.display = "block";
    setTimeout(() => { mySidenav.style.opacity = "1"; }, 100);/* sadece opacity dokun  */
    
}

function closeNav() {
    mySidenav.style.opacity = "0";/* sadece opacity dokun */
    setTimeout(() => { mySidenav.style.display = "none"; }, 500);/* sadece sondaki sayıya dokun -transition: 0.3s*/

}

function setUserAuth(u){
    document.getElementById("mySidenav").getElementsByClassName("menu-items")[0].classList.add("auth");
    document.getElementById("nav-bar-menu").classList.add("auth");

    document.getElementById("mySidenav").getElementsByClassName("menu-items")[0].getElementsByClassName("profil")[0].href = "/user/" + u.nickname;
    document.getElementById("nav-bar-menu").getElementsByClassName("profil")[0].children[0].href = "/user/" + u.nickname;
    // document.getElementsByClassName("nav-bar")[0].getElementsByClassName("nav-bar-pc")[0].children[0].innerText = capitalizeFirstLetter(u.nickname);
}

var apiNav = new ApiAuth;

getUser()
function getUser() {
    if(globalUser != undefined){
        console.log(globalUser);//session'a al
        setUserAuth(u);
        return;
    }
    apiNav.resultFunction = (t) => { //token alırsan
        apiNav.resultFunction = (u) => { //kullanıcıyı alırsan
                console.log(u);
                globalUser = u;
                setUserAuth(u);
            }
        apiNav.GetMyProfil(t.token);
    };
    apiNav.resultErrFunction = (t) => { //token almasa
        console.log(t);
    };
    apiNav.resultUnAuthFunction = (t) => { //token almasa
        console.log(t);
    };
    ApiAuth.GetToken(apiNav);
}

var myAra = document.getElementById("ara-div");
function ara(b){
    if(b){
        myAra.style.display = "block";
        setTimeout(() => { myAra.style.opacity = "1"; }, 100);/* sadece opacity dokun  */
    }
    else{
        myAra.style.opacity = "0";/* sadece opacity dokun */
        setTimeout(() => { myAra.style.display = "none"; }, 500);/* sadece sondaki sayıya dokun -transition: 0.3s*/
    }
}

var araBar = document.getElementById("ara-bar");

araBar.addEventListener('keyup', (evt) => {
    var text = araBar.innerHTML;
    console.log(text);
    getAra(text);
});
araBar.addEventListener('paste', function (evt) {
    evt.preventDefault();
    var text = evt.clipboardData.getData('text/plain').replace(/\n/g,"");
    console.log("pasted: " + text);
    document.execCommand('insertText', false, text);
})

var apiAraNav = new ApiAuth;
function getAra(text){
    splitedText = text.split(" ");
    apiAraNav.resultFunction = (t) => { //token alırsan
        apiAraNav.resultFunction = (u) => { //kullanıcıyı alırsan
            console.log(u);
            globalUser = u;
            setUserAuth(u);
        }
        apiAraNav.PostAuth("blogs/searchBlogs",t.token,splitedText);
    };
    ApiAuth.GetToken(apiAraNav);
}