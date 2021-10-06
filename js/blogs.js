var apiBlogs = new ApiAuth();
let pageNumber = 1;
let pageBlogCounter = 43;


var divBlog = document.getElementsByClassName("div-blog")[0];
var blogDivDes = divBlog.getElementsByClassName("div-blog-details")[0];
blogDivDes.classList.add("div-blog-details-transition");
function setBlogs(b) {
    var blogsHtml = "";
    if (pageNumber == 1) {
        pageBlogCounter--;

        var firstBlog = b.shift();
        blogDivDes.getElementsByClassName("title")[0].getElementsByTagName("a")[0].href = "/blogView/" + firstBlog.blogId;
        var blogImg = divBlog.getElementsByClassName("div-image")[0].getElementsByTagName("img")[0];
        var blogTitle = blogDivDes.getElementsByClassName("title")[0].getElementsByTagName("p")[0];
        var blogDescriptionDiv = blogDivDes.getElementsByClassName("description")[0].getElementsByTagName("p");
        var blogAut = blogDescriptionDiv[0];
        var blogDes = blogDescriptionDiv[1];

        blogDivDes.classList.add("show");
        blogDes.innerHTML = (firstBlog.blogSummary.length > 250) ? firstBlog[i].blogSummary.substring(0, 225) + "..." : firstBlog.blogSummary ;//firstBlog.blogSummary;
        blogImg.src = firstBlog.blogTitlePhotoUrl;
        blogImg.style = "";
        blogTitle.innerHTML = firstBlog.blogTitle;
        blogAut.innerHTML = firstBlog.blogDate + " <a class='inactive-blackbg c-p td-u' href=/user/" + firstBlog.authorName + ">" + firstBlog.authorName + "</a> tarafından yazıldı.";
    }
    for (var i = 0; i < b.length; i++) {//((i+((pageNumber == 1)?1:0))%13 == 0)
        var tags = "";
        if(b[i].blogTags != null && b[i].blogTags != undefined){
            for(var j = 0; i < b[i].blogTags.length;i++){
                tags += `<a href="/category/${b[i].blogTags[j].name}" class="p-kategori-black-blog-item inactive-blackbg c-p td-n">${b[i].blogTags[j].name}</a>`
            }
        }
        blogsHtml +=
            `<div class="${((i%14) >= 12)?"blog-list-long ":""}blog-item">
            <a href="/blogView/${b[i].blogId}" class="a-img-blog-item" >
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
        </div>`;
    }
    fakeNavBar(false); //sahte nav barı kapat
    if (b.length < ((pageNumber == 1) ? (pageBlogCounter - 1) : pageBlogCounter)) {
        pageNumberTemp = -1; //make last page 

    }

    document.getElementById("blog-list").innerHTML += blogsHtml;

    pageNumber++;
}
function goto(id){
    window.location.href = window.location.origin + "/blogView/" + id;
}
getBlogs()

function getBlogs(pageNumber = 1) {
    apiBlogs.resultFunction = (t) => {
        console.log(t);
        apiBlogs.resultFunction = (b) => {
            console.log(b);
            setBlogs(b);
        }
        apiBlogs.resultErrFunction = apiBlogs.resultErrFunction;
        apiBlogs.PostAuth("blogs/getbypage", t.token, { PageNumber: pageNumber, PageSize: pageBlogCounter });
    }
    apiBlogs.resultErrFunction = (t) => {
        if (t instanceof TypeError) {
            pageNumberTemp = -1; // make last page
            console.log("Sanslı zaman ;D");
            console.log(t);
        } else {
            console.log(t);
        }
    }
    apiBlogs.resultUnAuthFunction = (t) => { //guest giris yapılıyor
        apiBlogs.resultFunction = (b) => {
            console.log(b);
            setBlogs(b);
        }
        apiBlogs.resultErrFunction = apiBlogs.resultErrFunction;
        apiBlogs.Post("blogs/getbypageGuest", { PageNumber: pageNumber, PageSize: pageBlogCounter });
    }
    ApiAuth.GetToken(apiBlogs)
}

let documentHeight;
let currentScroll;
let modifier = 750;
var pageNumberTemp = 2; //1.sayfa cekildiyse 

anan();
function anan() {
    documentHeight = document.body.scrollHeight;
    currentScroll = window.scrollY + window.innerHeight;
    if (documentHeight < currentScroll + modifier && pageNumber == pageNumberTemp) {
        console.log("getBlog!!!!!: ", pageNumber);
        fakeNavBar(true); //sahte nav barı aç
        pageNumberTemp = pageNumber + 1;
        getBlogs(pageNumber);
    }

    setTimeout(anan, 250);
}

function fakeNavBar(bool) {
    if (!bool) {
        document.getElementById("blog-list-fake").style = "display: none;";
    } else {
        document.getElementById("blog-list-fake").style = "";
    }
}