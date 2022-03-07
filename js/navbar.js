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
            globalUser = u.data;
            setUserAuth(u.data);
        }
        apiNav.GetMyProfil(t.token);
    };
    apiNav.resultErrFunction = (t) => { //token almasa
        console.trace(t);
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
var globalId = 0;
function getAra(text){
    splitedText = text.split(" ");
    apiAraNav.resultFunction = (t) => { //token alırsan
        apiAraNav.resultFunction = (b) => { //kullanıcıyı alırsan
            console.log(b);
            globalId++;
            setAra(b.data,globalId);
        }
        apiAraNav.PostAuth("blogs/searchBlogs",t.token,splitedText);
    };
    ApiAuth.GetToken(apiAraNav);
}

var araBlogList = document.getElementById("ara-blog-list");
async function setAra(b, id){
    await sleep(400);
    console.log(id+" - "+globalId);
    if(id != globalId){
        console.log("pas");
        return;
    }

    araBlogList.innerHTML = "";
    for(var i = 0; i< b.length;i++){
        var tags = "";
        if(b[i].blogTags != null && b[i].blogTags != undefined){
            for(var j = 0; j < b[i].blogTags.length;j++){
                tags += `<a href="/category/${b[i].blogTags[j].name}" class="p-kategori-black-blog-item inactive-blackbg c-p td-n">${b[i].blogTags[j].name}</a>`
            }
        }
        araBlogList.innerHTML += 
        `<div class="blog-item">
            <a href="/blogView/${b[i].blogId}" class="a-img-blog-item" >
                <img class="img-blog-item" src="${b[i].blogTitlePhotoUrl}" loading="lazy" alt="${b[i].blogTitle}">
            </a>
            <div class='blog-content'>
                <p class="p-publish-title only-long">
                    ${b[i].blogDate}
                </p>
                <div class="blog-des-group">
                    <p class="text-color p-baslik-blog-item c-p">${b[i].blogTitle}</p>
                    <p class="p-aciklama-blog-item">${(b[i].blogSummary.length > 250) ? b[i].blogSummary.substring(0, 225) + "...":b    [i].blogSummary }</p>
                </div>
                <div class="blog-item-details">
                    <div class="kategori-bar-blog-item">
                        <div class="blog-item-author-info">
                            <a href="/user/${b[i].authorName}" class="inactive-blackbg c-p td-n">${b[i].authorName}</a>
                        </div>
                        ${tags}
                    </div>
                </div>
            </div>
        </div>`
    }
}







function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  