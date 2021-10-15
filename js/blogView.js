String.prototype.turkishToUrl = function(){
	var string = this;
	var letters = { "İ": "I", "I": "i", "Ş": "S", "Ğ": "G", "Ü": "U", "Ö": "O", "Ç": "C", "ı": "i", "i": "i", "ş": "s", "ğ": "g", "ü": "u", "ö": "o", "ç": "c"};
	string = string.replace(/(([İIŞĞÜÇÖiışğüçö]))/g, function(letter){ return letters[letter]; })
	return string;
}	

var apiBlogDetail = new ApiAuth();
// const urlParams = new URLSearchParams(window.location.search);
// const BlogId = urlParams.get('id');

// getBlogDetail(BlogId);

function setBlogDetail(b){
    document.getElementById("div-icerik").classList.remove("fake");

    
    var blogContent = document.getElementById("div-makale");

    var title = document.getElementsByClassName("title-bar")[0];
    var titleAut = title.getElementsByClassName("p-publish-title")[0];
    var blogDate = new Date(b.blogDate).toDateString();
    var blogTitle = title.getElementsByClassName("p-main-title")[0];
    var tags = document.getElementsByClassName("kategori-bar")[0];
    var img = document.getElementsByClassName("top-bar")[0].getElementsByClassName("img-div")[0].getElementsByTagName("img")[0];
    img.src = b.blogTitlePhotoUrl;
    img.style = "";
    tags.innerHTML = "";
    blogTitle.style = "";
    titleAut.style = "";
    document.head.innerHTML += `<meta name="description" content="${b.blogSummary}">

    <meta property="og:description" content="${b.blogSummary}">
    
    <meta name="twitter:description" content="${b.blogSummary}">`;

    if(b.blogTags != null && b.blogTags != undefined){
        for(var i = 0;i<b.blogTags.length;i++){
            tags.innerHTML += `<a href="/category/${b.blogTags[i].id}" class="p-kategori inactive c-p td-n">${b.blogTags[i].name}</a>`;
        }
    }
    blogTitle.innerHTML = b.blogTitle;
    titleAut.innerHTML = blogDate +` tarihinde <a class='inactive c-p td-u' href="/user/${b.authorSummary.nickname}">${b.authorSummary.nickname}</a> tarafından yazıldı.`;

    blogContent.innerHTML = "";
    for(var i = 0; i < b.blogContent.length; ++i){
        addBlogContent(b.blogContent[i], blogContent);
    }
}
function addBlogContent(content, blogContent){
    var text = "";
    switch(content.type){
        case "p":
            console.log("p");
            text = `<p class='p-text'>${content.data}</p>`;
            break;
        case "img":
            console.log("img");
            text = 
            `<div class="img-div">
                <img src="${content.data}" alt="foto">
                <p class="img-subtitle inactive">${content.description}</p>
            </div>`
            break;
        case "h":
            console.log("h");
            text =
            `<h1 class="p-main-title">${content.data}</h1>`;
            break;
        case "sep":
        case "hr":
            console.log("hr");
            text = "<hr>";
            break;
        case "quote":
            console.log("quote");
            text = `<p class='p-text quote'>${content.data}</p>`;
            break;
        case "li":
            console.log("li");
            text = `<li>${content.data}</li>`;
            break;
        case "a":
            console.log("a");
            text = `<a href="${content.description}">${content.data}</a>`;
            break;
        case "video":
        case "vıdeo":
            console.log("video");
            text = `<iframe src="${content.data}"></iframe>`;
            break;
        // case "sep":
        //     console.log("sep");
        //     text = 
        //     `<div class="div-seperator">
        //         <p class="seperator inactive">•</p>
        //         <p class="seperator inactive">•</p>
        //         <p class="seperator inactive">•</p>
        //     </div>`
        //     break;
        default:
            console.log("aaaaaaaaaaaaaaaaa");
    }
    blogContent.innerHTML += text;

}
function getBlogDetail(id, fixUrl = ()=>{}){
    if(id == 0){
        return;
    }
    apiBlogDetail.resultFunction = (t)=>{
        apiBlogDetail.resultFunction = (b)=>{
            console.log(b);
            fixUrl(b.blogTitle);
            setBlogDetail(b);
            getBlogComment(b.blogId);
        }
        apiBlogDetail.GetAuth("blogs/getBlog?id="+id, t.token);
    }
    apiBlogDetail.resultUnAuthFunction = (r)=>{
        apiBlogDetail.resultFunction = (b)=>{
            console.log(b);
            fixUrl(b.blogTitle);
            setBlogDetail(b);
            getBlogComment(b.blogId);
        }
        apiBlogDetail.GetAuth("blogs/getBlogGuest?id="+id);
    }
    apiBlogDetail.resultErrFunction = (err)=>{
        console.log(err);
    }
    ApiAuth.GetToken(apiBlogDetail);
}

function getBlogComment(blogId){
    apiBlogDetail.resultFunction = (t)=>{
        apiBlogDetail.resultFunction = (b)=>{
            console.log(b);
            setBlogComment(b);
        }
        apiBlogDetail.GetAuth("blogs/getBlogComment?blogId="+blogId);
    }
    apiBlogDetail.resultUnAuthFunction = apiBlogDetail.resultFunction;
    apiBlogDetail.resultErrFunction = (err)=>{
        console.log(err);
    }
    ApiAuth.GetToken(apiBlogDetail);
}

function setBlogComment(b){
    var commentUl = document.getElementById("blog-comment").getElementsByTagName("ul")[0];
    commentUl.innerHTML = "";
    for(var i = 0;i<b.length;i++){
        commentUl.innerHTML += addComment(b[i]);
    }
    var lis = commentUl.getElementsByTagName("li");
    for(var i = 0;i<lis.length;i++){
        lis[i].addEventListener('keyup', (evt) => {
            var text = araBar.innerHTML;
            console.log(text);
            getAra(text);
        });
        lis[i].addEventListener('paste', function (evt) {
            evt.preventDefault();
            var text = evt.clipboardData.getData('text/plain').replace(/\n/g,"");
            console.log("pasted: " + text);
            document.execCommand('insertText', false, text);
        });
    }
}

function addComment(c,com=true){
    var text = `<li commentId="${c.commentId}">
    <a href="/user/${c.userSummary.nickname/*+"-"+c.userSummary.id*/}"><img class="img-fluid rounded-circle" alt="User Avatar" src="https://api.atduyar.com/Images/${c.userSummary.avatarUrl}"></a>
        <div class="comment-body">
            <div userId="${c.userSummary.id}">
                <a href="/user/${c.userSummary.nickname/*+"-"+c.userSummary.id*/}"><h2 class="user-comment-name">${c.userSummary.nickname}</h2></a>
                <h5 class="user-comment-date">${c.commentDate}</h5>
            </div>
            <p class="user-comment-text">
                ${c.text}
            </p>
            ${com ? `
            <div class="comment-response${c.commentResponse > 0 ? " show-comment-response": ""}">
                <a onclick="showCommentResponse(this.parentElement.parentElement, true);"><b>Yanlıtla</b></a>
                <a onclick="showCommentResponse(this.parentElement.parentElement, false);"><b>${c.commentResponse} yanıtı gör</b></a>
            </div>
            <div class="comment-response-div">
                <h3 contenteditable=""></h3>
                <ul>
                </ul>
            </div>` : ""}
        </div>
    </li>`;
}

function showCommentResponse(t,bol){
    console.log(t);
    t.classList.add("show-comment-response");
}






var xxidTemp = new URLSearchParams(window.location.search).get('id');
if(xxidTemp != null){
    getBlogDetail(xxidTemp, (BlogTitle)=>{history.pushState({}, null, "/blogView.html?name=" + fixUrlChar(BlogTitle) + "&id=" + xxidTemp)});
}

var BlogId = 0;
function setParam(param){
    var x = param.split("-");
    BlogId = x[x.length - 1];
    getBlogDetail(BlogId, (BlogTitle)=>{history.pushState({}, null, "/blogView/" + fixUrlChar(BlogTitle) + "-" + BlogId)});
}

function fixUrlChar(text){
    text = text.split(" ").join("-");
    text = text.replaceAll("'","");
    text = text.turkishToUrl();
    return text;
}