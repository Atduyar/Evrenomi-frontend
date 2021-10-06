var apiUser = new ApiAuth();
var apiDeleteBlog = new ApiAuth();

getUser();
function getUser() {
    apiUser.resultFunction = (t) => {
        console.log(t);
        apiUser.resultFunction = (b) => {
            console.log(b);
            getUserBlogs(b.id);
        }
        apiUser.GetMyProfil(t.token);
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
        apiUser.resultErrFunction = apiUser.resultErrFunction;
        apiUser.GetAuth("blogs/getMyBlogs?pageId="+userBlogsPageId+"&pageSize=42", t.token);
    }
    apiUser.resultErrFunction = (t) => {
        console.log(t);
    }
    apiUser.resultUnAuthFunction = (t) => {
        console.log(t);
    }
    ApiAuth.GetToken(apiUser)
}//https://api.atduyar.com/api/blogs/getBlogDraft?id=1&pageId=1&pageSize=42


function setUserBlogs(b){
    console.log(b);
    var userBlogsPage = document.getElementById("user-blog-list");
    if(userBlogsPageId == 1){
        userBlogsPage.innerHTML = "";
    } 
    userBlogsPageId++;
    for(var i = 0; i< b.length;i++){
        var tags = "";
        if(b[i].blogTags != null && b[i].blogTags != undefined){
            for(var j = 0; j < b[i].blogTags.length;j++){
                tags += `<a href="/category/${b[i].blogTags[j].name}" class="p-kategori-black-blog-item inactive-blackbg c-p td-n">${b[i].blogTags[j].name}</a>`
            }
        }
        userBlogsPage.innerHTML += 
        `<div class="${((i%14) >= 12)?"blog-list-long ":""}blog-item">
            <div class="delete-btn" onclick="deleteBlog(${b[i].blogId},'${b[i].blogTitle}')">X</div>
            <a href="/write/${b[i].blogId}-${b[i].authorName.includes("Yayında") ? "p" :"t"}" class="a-img-blog-item" >
                <img class="img-blog-item" onerror="this.src='https://api.atduyar.com/ConstImage/errorImg.jpg';" src="${b[i].blogTitlePhotoUrl == null ? "" : b[i].blogTitlePhotoUrl}" loading="lazy" alt="${b[i].blogTitle}">
            </a>
            <div class='blog-content'>
                <p class="p-publish-title only-long">
                    ${b[i].blogDate}
                </p>
                <div class="blog-des-group">
                    <p class="text-color p-baslik-blog-item c-p">${b[i].blogTitle}</p>
                    <p class="p-aciklama-blog-item">${b[i].blogSummary != undefined ? ((b[i].blogSummary.length > 250) ? b[i].blogSummary.substring(0, 225) + "...":b[i].blogSummary ) : ""}</p>
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





var apiAddBlog = new ApiAuth();
function addBlog(){
    var blogName = prompt("Blog ismini giriniz: ")

    apiAddBlog.resultFunction = (t) => {
        apiAddBlog.resultFunction = (b) => {
            console.log(b);
            window.location.href = window.location.origin + '/write/'+b.data;
        }
        apiAddBlog.resultErrFunction = apiAddBlog.resultErrFunction;
        apiAddBlog.GetAuth("blogs/addBlogDraft?blogTitle="+blogName, t.token);
    }
    apiAddBlog.resultErrFunction = (t) => {
        console.log(t);
    }
    apiAddBlog.resultUnAuthFunction = (t) => {
        console.log(t);
    }
    ApiAuth.GetToken(apiAddBlog)
}

function deleteMod(){
    document.getElementById("user-blog-list").classList.toggle("delete-mod");
}
function deleteBlog(id,name=""){
    var result = window.prompt("DİKAT!!\n"+name+" ADLI, "+id+" İD Lİ BLOG SİLİNECEK.\nEğer onaylıyorsanız \""+id+"\" yazıp tamam a tıklayın.","Blog id sini buraya yazınız.");
    if(id == parseInt(result)){
        console.log(result);
    }
}

function getUserBlogs(blogId) {
    apiDeleteBlog.resultFunction = (t) => {
        apiDeleteBlog.resultFunction = (b) => {
            console.log(b);
            setUserBlogs(b);
        }
        apiDeleteBlog.resultErrFunction = apiDeleteBlog.resultErrFunction;
        apiDeleteBlog.GetAuth("blogs/deleteBlog?blogId="+blogId, t.token);
    }
    apiDeleteBlog.resultErrFunction = (t) => {
        console.log(t);
    }
    apiDeleteBlog.resultUnAuthFunction = (t) => {
        console.log(t);
    }
    ApiAuth.GetToken(apiDeleteBlog)
}