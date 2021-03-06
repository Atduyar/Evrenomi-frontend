var apiUser = new ApiAuth();
var apiUser2 = new ApiAuth();
var apiUser3 = new ApiAuth();
var user;
// getUser(1)

function setUser(u){
    document.getElementById("user-name").children[0].innerHTML = u.nickname;
    document.getElementById("user-des").children[0].innerHTML = u.description || "";
    document.getElementById("user-pp").children[0].src = "https://api.evrenomi.com/Images/" + u.avatarUrl;
}

function getUser(userName, fixUrl=()=>{}) {
    apiUser.resultFunction = (t) => {
        console.log(t);
        apiUser.resultFunction = (b) => {
            console.log(b);
            user = b.data;
            fixUrl(b.data.nickname);
            setUser(b.data);
            document.getElementById("fake-mode").classList.remove("fake-mode");
            getUserReaded(b.data.id);
            getUserBlogs(b.data.id);
            getUserComments(b.data.id);
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
var oldUBPage = 0;
function changeUBPage(x){
    userPage.style = "transform: translateX(calc( (-100% / 3) * "+x+" ));";
    userPageLine.style = "padding-left: calc("+x+" * 100% / 3 + 100% / 3 / 2 - var(--nav-line-fix ));!important";
    //active
    userPage.children[oldUBPage].classList.remove("active");
    oldUBPage = x;
    userPage.children[x].classList.add("active");
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
    var readedPage = document.getElementById("user-body-page").getElementsByClassName("user-body-page-item")[0].children[0];
    if(userReadedPageId == 1){
        readedPage.innerHTML = "";
    } 
    userReadedPageId++;
    
    for(var i = 0; i< b.length;i++){
        var tags = "";
        if(b[i].blogTags != null && b[i].blogTags != undefined){
            for(var j = 0; j < b[i].blogTags.length;j++){
                tags += `<a href="/category/${b[i].blogTags[j].name}" class="p-kategori-black-blog-item inactive-blackbg c-p td-n">${b[i].blogTags[j].name}</a>`
            }
        }
        readedPage.innerHTML += 
        `<div class="${((i%14) >= 12)?"blog-list-long ":""}blog-item">
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

var userReadedPageId = 1;
function getUserReaded(userId) {
    apiUser.resultFunction = (t) => {
        apiUser.resultFunction = (b) => {
            setUserReaded(b.data);
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
}//https://api.evrenomi.com/api/users/getUserReaded?id=1&pageId=1&pageSize=3


////////////////////////////////////////////////////////////////////

var aa;
function setUserBlogs(b){
    console.log(b);
    var BlogsPage = document.getElementById("user-body-page").getElementsByClassName("user-body-page-item")[2].children[0];
    if(userBlogsPageId == 1){
        if(globalUser.nickname == window.location.href.split("/").pop()){
            BlogsPage.innerHTML = 
            `<div class="${((i%14) >= 12)?"blog-list-long ":""}blog-item">
                <a href="/author" class="a-img-blog-item" >
                    <img class="img-blog-item" src="https://api.evrenomi.com/ConstImage/addBlog.png" loading="lazy" alt="Author Page">
                </a>
                <div class='blog-content'>
                    <p class="p-publish-title only-long">
                        
                    </p>
                    <div class="blog-des-group">
                        <p class="text-color p-baslik-blog-item c-p">${"Bloglarım"}</p>
                        <p class="p-aciklama-blog-item">${"Bloglarım<br>Blog Yaz<br>Blog Yayınla"}</p>
                    </div>
                    <div class="blog-item-details">
                        <div class="kategori-bar-blog-item">
                            <div class="blog-item-author-info">
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        }
        else{
            BlogsPage.innerHTML = "";
        }
        
    } 
    userBlogsPageId++;
    for(var i = 0; i< b.length;i++){
        var tags = "";
        if(b[i].blogTags != null && b[i].blogTags != undefined ){
            for(var j = 0; j < b[i].blogTags.length;j++){
                tags += `<a href="/category/${b[i].blogTags[j].name}" class="p-kategori-black-blog-item inactive-blackbg c-p td-n">${b[i].blogTags[j].name}</a>`
            }
        }
        BlogsPage.innerHTML += 
        `<div class="${((i%14) >= 12)?"blog-list-long ":""}blog-item">
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

var userBlogsPageId = 1;
function getUserBlogs(userId) {
    apiUser2.resultFunction = (t) => {
        apiUser2.resultFunction = (b) => {
            setUserBlogs(b.data);
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
}//https://api.evrenomi.com/api/users/getUserBlog?id=1&pageId=1&pageSize=3



//////////////////////////////////

var userCommentsPageId = 1;
function getUserComments(userId) {
    apiUser3.resultFunction = (t) => {
        apiUser3.resultFunction = (b) => {
            setUserComments(b.data);
        }
        apiUser3.resultErrFunction = apiUser3.resultErrFunction;
        apiUser3.GetAuth("blogs/getUserComment?id="+userId+"&pageId="+userCommentsPageId+"&pageSize=42", t.token);
    }
    apiUser3.resultErrFunction = (t) => {
        console.log(t);
    }
    apiUser3.resultUnAuthFunction = (t) => {
        console.log(t);
    }
    ApiAuth.GetToken(apiUser3)
}//https://api.evrenomi.com/api/blogs/getUserBlog?id=1&pageId=1&pageSize=3

function setUserComments(b){
    var commentUl = document.getElementById("blog-comment").getElementsByTagName("ul")[0];
    commentUl.innerHTML = "";
    for(var i = 0;i<b.length;i++){
        commentUl.innerHTML += addComment(b[i]);
    }
}

function addComment(c){
    return `<li commentId="${c.commentId}">
    <a href="/user/${c.userSummary.nickname/*+"-"+c.userSummary.id*/}"><img class="img-fluid rounded-circle" alt="User Avatar" src="https://api.evrenomi.com/Images/${c.userSummary.avatarUrl}"></a>
        <div>
            <div userId="${c.userSummary.id}">
                <a href="/user/${c.userSummary.nickname/*+"-"+c.userSummary.id*/}"><h2 class="user-comment-name">${c.userSummary.nickname}</h2></a>
                <h5 class="user-comment-date">${c.commentDate}</h5>
            </div>
            <p class="user-comment-text">
                ${c.text}
            </p>
            <div class="${c.commentResponse > 0 ? "show-comment-response": ""}">
                <a onclick="showCommentResponse(this.parentElement.parentElement, true);">Yanlıtla</a>
                <a onclick="showCommentResponse(this.parentElement.parentElement, false);">${c.commentResponse} yanıtı gör</a>
            </div>
            <div class="comment-response-div">
            </div>
        </div>
    </li>`;
}