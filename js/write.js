var textboxs = document.getElementsByClassName('textbox');
var icerikDiv = document.getElementById("div-icerik");
var aaa;

function addEvent(x){
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
            if(evt.target.textContent = ""){
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
    switch(tagName.toLocaleLowerCase()){
        case "h1":
        case "img":
            tagName = "p";
            break;
        case "sep":
            tagName = "h1";
            break;
        case "ul":
            tagName = "li";
            break;
    }
    return tagName;
}
function addElement(tagName){
    switch(tagName){
        case "p":
            return getDefualtElement(`<p contenteditable class="textbox" placeholder="Type something..."></p>`)
            break;
        case "h1":
            return getDefualtElement(`<h1 contenteditable class="textbox title" placeholder="Type something..."></h1>`)
            break;
        case "p":
            break;
    }
}

function addElementToEnd(tagName){
    icerikDiv.innerHTML += addElement(tagName);
}
function addElementToNext(thisItem, tagName){
    aaa = thisItem;
    thisItem.outerHTML += addElement(tagName.toLocaleLowerCase());//outerHTML brok this element event
    var idElement = document.getElementById(thisItem.getElementsByClassName("item-body")[0].children[0].id);
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


//////////////

function getDefualtElement(htl){
    return `
    <div class="item">
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
                    <li onclick="addElementToNext(this.parentElement.parentElement.parentElement.parentElement, 'p')">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="350px" height="350px" viewBox="0 0 350 350" style="enable-background:new 0 0 350 350;bottom: -4px;width: 85%;height: 85%;position: relative;" xml:space="preserve"> <g> <path d="M150.299,26.634v58.25c0,7.9-6.404,14.301-14.304,14.301c-28.186,0-43.518,28.909-45.643,85.966h45.643   c7.9,0,14.304,6.407,14.304,14.304v122.992c0,7.896-6.404,14.298-14.304,14.298H14.301C6.398,336.745,0,330.338,0,322.447V199.455   c0-27.352,2.754-52.452,8.183-74.611c5.568-22.721,14.115-42.587,25.396-59.048c11.608-16.917,26.128-30.192,43.16-39.44   C93.886,17.052,113.826,12.333,136,12.333C143.895,12.333,150.299,18.734,150.299,26.634z M334.773,99.186   c7.896,0,14.305-6.407,14.305-14.301v-58.25c0-7.9-6.408-14.301-14.305-14.301c-22.165,0-42.108,4.72-59.249,14.023   c-17.035,9.248-31.563,22.523-43.173,39.44c-11.277,16.461-19.824,36.328-25.393,59.054c-5.426,22.166-8.18,47.266-8.18,74.605   v122.992c0,7.896,6.406,14.298,14.304,14.298h121.69c7.896,0,14.299-6.407,14.299-14.298V199.455   c0-7.896-6.402-14.304-14.299-14.304h-44.992C291.873,128.095,306.981,99.186,334.773,99.186z"/></svg>
                    </li>
                    <li onclick="addElementToNext(this.parentElement.parentElement.parentElement.parentElement, 'p')">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 60.123 60.123" style="enable-background:new 0 0 60.123 60.123;" xml:space="preserve"> <g> <path d="M57.124,51.893H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3S58.781,51.893,57.124,51.893z"/> <path d="M57.124,33.062H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3   C60.124,31.719,58.781,33.062,57.124,33.062z"/> <path d="M57.124,14.231H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3S58.781,14.231,57.124,14.231z"/> <circle cx="4.029" cy="11.463" r="4.029"/> <circle cx="4.029" cy="30.062" r="4.029"/> <circle cx="4.029" cy="48.661" r="4.029"/></g></svg>
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