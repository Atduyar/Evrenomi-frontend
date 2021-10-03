
function getUser() {
    apiUser.resultFunction = (t) => {
        console.log(t);
        apiUser.resultFunction = (b) => {
            console.log(b);
            getUserBlogs(b.id);
        }
        apiNav.GetMyProfil(t.token);
    }
    apiUser.resultErrFunction = (t) => {
        console.log(t);
    }
    apiUser.resultUnAuthFunction = (t) => {
        console.log(t);//ulasılamaz penceresi yap
    }
    ApiAuth.GetToken(apiUser)
}


var userBlogsPageId = 1;
function getUserBlogs(userId) {
    apiUser.resultFunction = (t) => {
        apiUser.resultFunction = (b) => {
            console.log(b);
            setUserBlogs(b);
        }
        apiUser.resultErrFunction = apiUser2.resultErrFunction;
        apiUser.GetAuth("users/getUserBlog?id="+userId+"&pageId="+userBlogsPageId+"&pageSize=42", t.token);
    }
    apiUser.resultErrFunction = (t) => {
        console.log(t);
    }
    apiUser.resultUnAuthFunction = (t) => {
        console.log(t);
    }
    ApiAuth.GetToken(apiUser)
}//https://api.atduyar.com/api/users/getUserReaded?id=1&pageId=1&pageSize=3


function setUserBlog(b){
    console.log(b);
    var userBlogsPage = document.getElementById("user-blog-list");
    if(userBlogsPageId == 1){
        readedPage.innerHTML = "";
    } 
    userBlogsPageId++;
    for(var i = 0; i< b.length;i++){
        userBlogsPage.innerHTML += 
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
                        <a href="/category/Politika" class="p-kategori-black-blog-item inactive-blackbg c-p td-n">Politika</a>
                        <a href="/category/Elestiri" class="p-kategori-black-blog-item inactive-blackbg c-p td-n">Eleştiri</a>
                    </div>
                </div>
            </div>
        </div>`
    }
}