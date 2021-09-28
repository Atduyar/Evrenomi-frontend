var textboxs = document.getElementsByClassName('textbox');
var icerikDiv = document.getElementById("div-icerik");
var aaa;

function addEvent(x){
    if(x.classList.contains("img")){
        x.addEventListener("input", (evt)=>{
            changeImgeUrl(evt.target)
        }, false);
    }
    if(x.classList.contains("video")){
        x.addEventListener("input", (evt)=>{
            changeVideoUrl(evt.target)
        }, false);
    }
    x.addEventListener('keydown', (evt) => {
        if (evt.keyCode === 13) {

            addElementToNext(evt.target.parentElement.parentElement, findNextElement(evt.target.tagName))
            // evt.target.parentElement.parentElement.outerHTML += addNextElement(evt.target.tagName.toLocaleLowerCase());
            // addEvent(document.getElementById(evt.target.id));//fix clicked element
            
            // fixEvents();
            // document.getElementById(max).focus();
            // document.getElementById(max).innerHTML = "";
            
            evt.preventDefault();
        }
        else if (evt.key === "Backspace" || evt.key === "Delete") {
            console.log(evt.target.textContent);
            if(evt.target.textContent == ""){
                deleteElement(evt.target.parentElement.parentElement);
            }
        }
    });
    x.addEventListener('paste', function (evt) {
        evt.preventDefault();
        var text = evt.clipboardData.getData('text/plain').replace(/\n/g,"");
        console.log(text);
        document.execCommand('insertText', false, text);
    })
}

addElementToEnd("img");
addElementToEnd("h1");
addElementToEnd("p");
fixEvents();
var max = -1;
function fixEvents(){
    // oninput="if(this.innerHTML.trim()==='<br>')this.innerHTML=''"
    max = -1;
    for(var i = 0; i < textboxs.length; i++) {
        if(textboxs[i].getAttribute("id") != null){
            if(max < textboxs[i].getAttribute("id")){
                max = textboxs[i].getAttribute("id");
            }
        }
    }

    for(var i = 0; i < textboxs.length; i++) {
        if(textboxs[i].getAttribute("id") == null){
            max++;
            console.table(max, textboxs[i]);

            textboxs[i].setAttribute("id", max);
            addEvent(textboxs[i]);
        }
    }
}

function findNextElement(tagName){
    tagName = tagName.toLocaleLowerCase();
    switch(tagName){
        case "a":
        case "h1":
        case "img":
        case "ımg":
        case "quote":
            tagName = "p";
            break;
        case "sep":
            tagName = "h1";
            break;
        case "li":
        case "lı":
            tagName = "li";
            break;
        default:
            tagName = "p";
            break;
    }
    return tagName;
}
function addElement(tagName){
    switch(tagName){
        case "p":
            return getDefualtElement(`<p contenteditable class="textbox" placeholder="Type something..."></p>`, "p")
            break;
        case "h1":
            return getDefualtElement(`<h1 contenteditable class="textbox title" placeholder="Type something..."></h1>`, "h1")
            break;
        case "quote":
            return getDefualtElement(`<p contenteditable class="textbox quote" placeholder="Type something..."></p>`, "quote")
            break;
        case "a":
            return getDefualtElement(`<a contenteditable class="textbox" spellcheck="false" placeholder="Type something..."></a>`, "a")
            break;
        case "li":
        case "lı":
            return getDefualtElement(`<li contenteditable class="textbox li" placeholder="Type something..."></li>`, "li")
            break;
        case "hr":
            return getDefualtElement(`<hr>`, "hr")
            break;
        case "img":
        case "ımg":
            return getDefualtElement(`<img onerror="this.src='https://api.atduyar.com/ConstImage/errorImg.jpg';" src="https://api.atduyar.com/BlogImages/manzara.jpg"><p contenteditable class="textbox img" placeholder="Type some url...">https://api.atduyar.com/BlogImages/manzara.jpg</p>`, "img")
            break;
        case "video":
        case "vıdeo":
            return getDefualtElement(`<iframe onerror="this.src='https://www.youtube.com/embed/iik25wqIuFo';" src="https://www.youtube.com/embed/iik25wqIuFo"></iframe><p contenteditable class="textbox video" placeholder="Type some url...">https://www.youtube.com/embed/iik25wqIuFo</p>`, "img")
            break;
    }
}

function addElementToEnd(tagName){
    icerikDiv.innerHTML += addElement(tagName);
}
function addElementToNext(thisItem, tagName){
    thisItem.outerHTML += addElement(tagName.toLocaleLowerCase());//outerHTML brok this element event
    var temp = thisItem.getElementsByClassName("item-body")[0];
    var idElement = document.getElementById(temp.children[temp.children.length-1].id);
    // var idElement = document.getElementById(thisItem.getElementsByClassName("item-body")[0].children[0].id);
    addEvent(idElement);//fix new event
    
    fixEvents();

    // document.getElementById(thisItem.getElementsByClassName("item-body")[0].children[0].id).parentElement.parentElement.classList.remove("open");
    var item = idElement.parentElement.parentElement;
    if(item.classList.contains("open")){
        openItemMenu(item);
    }

    document.getElementById(max).focus();
}
function deleteElement(item){
    item.outerHTML = "";
}
function changeImgeUrl(t){
    t.parentElement.getElementsByTagName("img")[0].src = t.textContent;
}
function changeVideoUrl(t){
    t.parentElement.getElementsByTagName("iframe")[0].src = t.textContent;
}




// a
class AtdElement{
	constructor(type,data,description){
    	this.type=type;
        this.data=data;
        this.description=description;
    }
  	displayInfo(){
    	return this.name + "is " + this.age + " years old!";
    }
}

function createblog(){
    var blog = [];
    for(var i = 0; icerikDiv.children.length > i; i++){
        blog.push(getItemJson(icerikDiv.children[i]));
    }
    aaa = blog;
    console.table(blog);
    console.log(JSON.stringify(blog));
}
function getItemJson(item){
    var newItemType = item.getAttribute("atdtag");
    var newItemData = "";
    var newItemDescription = "";

    switch(newItemType){
        case "p":
        case "h1":
        case "li":
        case "lı":
            newItemData = item.getElementsByClassName("textbox")[0].textContent;
            break;
        case "quote":
            newItemData = item.getElementsByClassName("textbox")[0].textContent;
            newItemDescription = "Yazar";
            break;
        case "a":
            newItemData = item.getElementsByClassName("textbox")[0].textContent;
            newItemDescription = "Url";
            break;
        case "hr":
            // newItemData = "";
            break;
        case "img"://silme iselminde null hatası event hatası düzelt
        case "ımg":
        case "video"://https://www.youtube.com/embed?listType=playlist&list=PL2QY0xcsWhz6ghPUixeNQm47xapSKw4SM&index=4
        case "vıdeo":
            // newItemData = item.getElementsByClassName("textbox")[0].textContent;
            newItemData = item.getElementsByClassName("item-body")[0].children[0].src;
        break;
    }
    var newItem = new AtdElement(newItemType, newItemData, newItemDescription);
    return newItem;
}
// a







function aael(l){
    for(var i = 0;i<l.length;i++){
        console.table(i,getEventListeners(l[i]));
    }
}

function openItemMenu(t){
    if(t.classList.contains("open")){//t.parentElement.classList.toggle('open')
        t.classList.remove("open");
        setTimeout(()=>{t.style = "";}, 500);
    }
    else{
        t.classList.add("open");
        t.style = "--thisItemHeight: "+ t.offsetHeight +"px;";
    }   
}

function openMenu(b){
    if(b){
        document.getElementById("div-edit-menu").classList.add("div-edit-menu-open");
    }
    else{
        document.getElementById("div-edit-menu").classList.remove("div-edit-menu-open");
    }
}

//////////////

function getDefualtElement(htl, itemTag){
    return `
    <div class="item" atdTag="${itemTag}">
        <div class="item-plus" onclick="openItemMenu(this.parentElement)">
            <div class="fake-top"></div>
            <div class="cros">
                <div>
                    <svg height="426.66667pt" viewBox="0 0 426.66667 426.66667" width="426.66667pt" xmlns="http://www.w3.org/2000/svg"><path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0"/></svg>
                </div>
            </div>
            <div class="menu">
                <ul>
                    <li onclick="addElementToNext(this.parentElement.parentElement.parentElement.parentElement, 'h1')">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 190 190" style="enable-background:new 0 0 190 190;" xml:space="preserve"><path id="XMLID_27_" d="M175,0H15C6.716,0,0,6.716,0,15v38.99c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15V30h50v130H56.836  c-8.284,0-15,6.716-15,15s6.716,15,15,15h76.328c8.284,0,15-6.716,15-15s-6.716-15-15-15H110V30h50v23.99c0,8.284,6.716,15,15,15  c8.284,0,15-6.716,15-15V15C190,6.716,183.284,0,175,0z"/>
                        </svg>
                    </li>
                    <li onclick="addElementToNext(this.parentElement.parentElement.parentElement.parentElement, 'p')">
                        <svg xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 190 190" xml:space="preserve" version="1.1"><path stroke="null" d="m151,57l-112,0c-5.7988,0 -10.5,4.7012 -10.5,10.5l0,27.293c0,5.7988 4.7012,10.5 10.5,10.5c5.7988,0 10.5,-4.7012 10.5,-10.5l0,-16.793l35,0l0,91l-16.2148,0c-5.7988,0 -10.5,4.7012 -10.5,10.5s4.7012,10.5 10.5,10.5l53.4296,0c5.7988,0 10.5,-4.7012 10.5,-10.5s-4.7012,-10.5 -10.5,-10.5l-16.2148,0l0,-91l35,0l0,16.793c0,5.7988 4.7012,10.5 10.5,10.5c5.7988,0 10.5,-4.7012 10.5,-10.5l0,-27.293c0,-5.7988 -4.7012,-10.5 -10.5,-10.5z" id="XMLID_27_"/></svg>
                    </li>
                    <li onclick="addElementToNext(this.parentElement.parentElement.parentElement.parentElement, 'quote')">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="350px" height="350px" viewBox="0 0 350 350" style="enable-background:new 0 0 350 350;width: 85%;height: 85%;" xml:space="preserve"> <g> <path d="M150.299,26.634v58.25c0,7.9-6.404,14.301-14.304,14.301c-28.186,0-43.518,28.909-45.643,85.966h45.643   c7.9,0,14.304,6.407,14.304,14.304v122.992c0,7.896-6.404,14.298-14.304,14.298H14.301C6.398,336.745,0,330.338,0,322.447V199.455   c0-27.352,2.754-52.452,8.183-74.611c5.568-22.721,14.115-42.587,25.396-59.048c11.608-16.917,26.128-30.192,43.16-39.44   C93.886,17.052,113.826,12.333,136,12.333C143.895,12.333,150.299,18.734,150.299,26.634z M334.773,99.186   c7.896,0,14.305-6.407,14.305-14.301v-58.25c0-7.9-6.408-14.301-14.305-14.301c-22.165,0-42.108,4.72-59.249,14.023   c-17.035,9.248-31.563,22.523-43.173,39.44c-11.277,16.461-19.824,36.328-25.393,59.054c-5.426,22.166-8.18,47.266-8.18,74.605   v122.992c0,7.896,6.406,14.298,14.304,14.298h121.69c7.896,0,14.299-6.407,14.299-14.298V199.455   c0-7.896-6.402-14.304-14.299-14.304h-44.992C291.873,128.095,306.981,99.186,334.773,99.186z"/></svg>
                    </li>
                    <div class="vertical-line" style="transform: translateX(-4px);"></div> 
                    <li onclick="addElementToNext(this.parentElement.parentElement.parentElement.parentElement, 'a')">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path d="M476.853,35.148c-46.864-46.864-122.842-46.864-169.706-0.001L206.853,135.441c-48.475,48.477-43.987,125.717,0,169.706    c7.366,7.366,15.516,13.372,24.122,18.305l18.305-18.305c12.006-12.008,7.78-26.045,7.564-36.174    c-2.635-1.868-5.198-3.887-7.564-6.253c-22.573-22.571-23.588-61.265,0-84.853c3.503-3.503,98.166-98.166,100.292-100.292    c23.399-23.399,61.454-23.399,84.853,0c23.399,23.399,23.399,61.454,0,84.853l-66.293,66.293    c1.917,10.607,13.422,35.733,7.504,77.181c0.289-0.284,0.635-0.467,0.923-0.754l100.294-100.294    C523.715,157.99,523.715,82.012,476.853,35.148z"/><path d="M312.918,199.081c-7.365-7.366-15.516-13.372-24.12-18.305l-18.305,18.305c-12.008,12.006-7.782,26.043-7.566,36.172    c2.637,1.868,5.2,3.887,7.566,6.253c22.573,22.573,23.588,61.265,0,84.853c-3.511,3.511-106.015,106.015-108.066,108.066    c-23.399,23.399-61.454,23.399-84.853,0c-23.399-23.399-23.399-61.454,0-84.853l74.067-74.067    c-1.917-10.607-13.423-35.733-7.504-77.181c-0.289,0.284-0.637,0.469-0.925,0.756L35.147,307.147    c-46.862,46.864-46.862,122.842,0,169.706c46.864,46.862,122.841,46.862,169.705,0l108.066-108.066    C360.494,321.211,357.894,244.056,312.918,199.081z"/></svg>
                    </li>
                    <li onclick="addElementToNext(this.parentElement.parentElement.parentElement.parentElement, 'li')">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 60.123 60.123" style="enable-background:new 0 0 60.123 60.123;" xml:space="preserve"> <g> <path d="M57.124,51.893H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3S58.781,51.893,57.124,51.893z"/> <path d="M57.124,33.062H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3   C60.124,31.719,58.781,33.062,57.124,33.062z"/> <path d="M57.124,14.231H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3S58.781,14.231,57.124,14.231z"/> <circle cx="4.029" cy="11.463" r="4.029"/> <circle cx="4.029" cy="30.062" r="4.029"/> <circle cx="4.029" cy="48.661" r="4.029"/></g></svg>
                    </li>
                    <li onclick="addElementToNext(this.parentElement.parentElement.parentElement.parentElement, 'hr')">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 409.6 409.6" style="enable-background:new 0 0 409.6 409.6;" xml:space="preserve"><path d="M392.533,187.733H17.067C7.641,187.733,0,195.374,0,204.8s7.641,17.067,17.067,17.067h375.467    c9.426,0,17.067-7.641,17.067-17.067S401.959,187.733,392.533,187.733z"/></svg>
                    </li>
                    <div class="vertical-line" style="transform: translateX(-4px);"></div> 
                    <li onclick="addElementToNext(this.parentElement.parentElement.parentElement.parentElement, 'img')">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="550px" height="550px" viewBox="0 0 550 550" style="enable-background:new 0 0 550 550;" xml:space="preserve"> <g> <path d="M515.828,61.201H34.972C15.659,61.201,0,76.859,0,96.172v358.458C0,473.942,15.659,489.6,34.972,489.6h480.856   c19.314,0,34.973-15.658,34.973-34.971V96.172C550,76.859,535.143,61.201,515.828,61.201z M515.828,96.172V350.51l-68.92-62.66   c-10.359-9.416-26.289-9.04-36.186,0.866l-69.752,69.741L203.438,194.179c-10.396-12.415-29.438-12.537-39.99-0.271L34.972,343.219   V96.172H515.828z M367.201,187.972c0-26.561,21.523-48.086,48.084-48.086c26.562,0,48.086,21.525,48.086,48.086   c0,26.561-21.523,48.085-48.086,48.085C388.725,236.058,367.201,214.533,367.201,187.972z"/> </g> </svg>
                    </li>
                    <li onclick="addElementToNext(this.parentElement.parentElement.parentElement.parentElement, 'video')">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="163.861px" height="163.861px" viewBox="0 0 163.861 163.861" style="enable-background:new 0 0 163.861 163.861;" xml:space="preserve"><path d="M34.857,3.613C20.084-4.861,8.107,2.081,8.107,19.106v125.637c0,17.042,11.977,23.975,26.75,15.509L144.67,97.275   c14.778-8.477,14.778-22.211,0-30.686L34.857,3.613z"/></svg>
                    </li>
                    <div class="vertical-line" style="transform: translateX(-4px);"></div> 
                    <li onclick="deleteElement(this.parentElement.parentElement.parentElement.parentElement)">
                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" style="&#10;    fill: red;&#10;"><g><path d="m424 64h-88v-16c0-26.467-21.533-48-48-48h-64c-26.467 0-48 21.533-48 48v16h-88c-22.056 0-40 17.944-40 40v56c0 8.836 7.164 16 16 16h8.744l13.823 290.283c1.221 25.636 22.281 45.717 47.945 45.717h242.976c25.665 0 46.725-20.081 47.945-45.717l13.823-290.283h8.744c8.836 0 16-7.164 16-16v-56c0-22.056-17.944-40-40-40zm-216-16c0-8.822 7.178-16 16-16h64c8.822 0 16 7.178 16 16v16h-96zm-128 56c0-4.411 3.589-8 8-8h336c4.411 0 8 3.589 8 8v40c-4.931 0-331.567 0-352 0zm313.469 360.761c-.407 8.545-7.427 15.239-15.981 15.239h-242.976c-8.555 0-15.575-6.694-15.981-15.239l-13.751-288.761h302.44z"/><path d="m256 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"/><path d="m336 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"/><path d="m176 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"/></g></svg>
                    </li>
                </ul>
            </div>
            <div class="fake-menu"></div>
        </div>
        <div class="item-body">
            ${htl}
        </div>
    </div>`
}