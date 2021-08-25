var apiUser = new ApiAuth();
var apiUser2 = new ApiAuth();
var apiUser3 = new ApiAuth();
var user;
// getUser(1)

function setUser(u){
    document.getElementById("user-name").children[0].innerHTML = u.nickname;
    document.getElementById("user-des").children[0].innerHTML = u.description || "";
    document.getElementById("user-pp").children[0].src = "https://api.atduyar.com/Images/" + u.avatarUrl;
}

function getUser(userName, fixUrl=()=>{}) {
    apiUser.resultFunction = (t) => {
        console.log(t);
        apiUser.resultFunction = (b) => {
            console.log(b);
            user = b;
            fixUrl(b.nickname);
            setUser(b);
            getUserReaded(b.id);
            getUserBlogs(b.id);
        }
        apiUser.resultErrFunction = apiUser.resultErrFunction;
        apiUser.GetAuth("users/getUserByName?name="+userName, t.token);
    }
    apiUser.resultErrFunction = (t) => {
        console.log(t);
    }
    apiUser.resultUnAuthFunction = (t) => {
        console.log(t);//ulasılamaz penceresi yap
    }
    ApiAuth.GetToken(apiUser)
}

var userPage = document.getElementById("user-body-page");
var userPageLine = document.getElementById("user-body-nav-line");
function changeUBPage(x){
    userPage.style = "transform: translateX(calc( (-100% / 3) * "+x+" ));";
    userPageLine.style = "padding-left: calc("+(x)+" * 20vw + var(--nav-line-fix    ));!important";
    // userPageLine.style = "padding: 0 calc("+(2-x)+" var(--nav-size)) 0 calc("+(x)+" * var(--nav-size));!important";
    // console.log("padding: 0 "+(4-x*2)+"0vw 0 "+x*2+"0vw;!important");
}

var xxTemp = new URLSearchParams(window.location.search).get('name');
if(xxTemp != null){
    getUser(xxTemp, (userNickname)=>{history.pushState({}, null, "/user.html?name=" + xxTemp)});
}
function setParam(param){
    var x = param.split("-");
    getUser(x[0], (userNickname)=>{history.pushState({}, null, "/user/" + x[0])});
    
}


////////////////////////////////////////////////////////////////////


function setUserReaded(b){
    console.log(b);
    var readedPage = document.getElementById("  e").getElementsByClassName("user-body-page-item")[0].children[0];
    if(userReadedPageId == 1){
        readedPage.innerHTML = "";
    } 
    userReadedPageId++;
    for(var i = 0; i< b.length;i++){
        readedPage.innerHTML += 
        `<div class="${((i%18) >= 12)?"blog-list-long ":""}blog-item">
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
                        <a href="/category/Politika" class="p-kategori-black-blog-item inactive-blackbg c-p td-n">Politika</a>
                        <a href="/category/Elestiri" class="p-kategori-black-blog-item inactive-blackbg c-p td-n">Eleştiri</a>
                    </div>
                </div>
            </div>
        </div>`
    }
}

var userReadedPageId = 1;
function getUserReaded(userId) {
    apiUser.resultFunction = (t) => {
        console.log(t);
        apiUser.resultFunction = (b) => {
            setUserReaded(b);
        }
        apiUser.resultErrFunction = apiUser.resultErrFunction;
        apiUser.GetAuth("users/getUserReaded?id="+userId+"&pageId="+userReadedPageId+"&pageSize=42", t.token);
    }
    apiUser.resultErrFunction = (t) => {
        console.log(t);
    }
    apiUser.resultUnAuthFunction = (t) => {
        console.log(t);
    }
    ApiAuth.GetToken(apiUser)
}//https://api.atduyar.com/api/users/getUserReaded?id=1&pageId=1&pageSize=3


////////////////////////////////////////////////////////////////////


function setUserBlogs(b){
    console.log(b);
    var BlogsPage = document.getElementById("user-body-page").getElementsByClassName("user-body-page-item")[2].children[0];
    if(userBlogsPageId == 1){
        BlogsPage.innerHTML = "";
    } 
    userBlogsPageId++;
    for(var i = 0; i< b.length;i++){
        BlogsPage.innerHTML += 
        `<div class="${((i%18) >= 12)?"blog-list-long ":""}blog-item">
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
                        <a href="/category/Politika" class="p-kategori-black-blog-item inactive-blackbg c-p td-n">Politika</a>
                        <a href="/category/Elestiri" class="p-kategori-black-blog-item inactive-blackbg c-p td-n">Eleştiri</a>
                    </div>
                </div>
            </div>
        </div>`
    }
}

var userBlogsPageId = 1;
function getUserBlogs(userId) {
    apiUser2.resultFunction = (t) => {
        console.log(t);
        apiUser2.resultFunction = (b) => {
            setUserBlogs(b);
        }
        apiUser2.resultErrFunction = apiUser2.resultErrFunction;
        apiUser2.GetAuth("users/getUserBlog?id="+userId+"&pageId="+userBlogsPageId+"&pageSize=42", t.token);
    }
    apiUser2.resultErrFunction = (t) => {
        console.log(t);
    }
    apiUser2.resultUnAuthFunction = (t) => {
        console.log(t);
    }
    ApiAuth.GetToken(apiUser2)
}//https://api.atduyar.com/api/users/getUserBlog?id=1&pageId=1&pageSize=3