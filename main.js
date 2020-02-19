function idel() {
    function addnote() {
        var id = curntTime();
        var inputval = document.getElementById("inputbx").value;
        var newdiv = document.createElement("div");
        var newspan = document.createElement("span");
        newspan.setAttribute("id", id);
        var newcontent = document.createTextNode(inputval);
        newspan.appendChild(newcontent);

        var closespan = document.createElement("span");
        closespan.setAttribute("id", id);
        closespan.setAttribute("class", "closemargin");
        var close = document.createTextNode("x");
        closespan.appendChild(close);

        newdiv.appendChild(newspan);
        newdiv.appendChild(closespan)
        var currentDiv = document.getElementById("notelist");
        document.body.insertBefore(newdiv, currentDiv);
        console.log(inputval);
        bindclose(id);
    }
    function curntTime() {
        var date = new Date();
        var time = date.getTime();
        return time;
    }
    function hideitem(e) {
        console.log(e)
    }
    var btn = document.getElementById("enterbtn");
    btn.addEventListener("click", addnote, false)
    function bindclose(id) {
        var closebtn = document.getElementById(id);
        closebtn.addEventListener("click", hideitem, false);
    }

}




var Todo = (function () {
    var todohandeler = {};
    var ListArr = [];
    todohandeler.init = function () {
        console.log("inittest");
        catchinput();
        searchbox();
    }
    function template(value, RenderArr) {
        var template = `<div class='container'>
                            <div class='row'>
                                <div class='col-sm-3'>${RenderArr[value]}</div>
                                <div class='col-sm-1'>
                                    <button type="button" class="close listitemclose" aria-label="Close">
                                    <span id=${value} aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>
                        </div>`;
        return template;
    }
    function catchinput() {
        document.getElementById("enterbtn").addEventListener("click", appendList, false);
    }
    function searchbox() {
        document.getElementById("searchbx").addEventListener("keyup",searchitem,false);
    }
    function appendList() {
        var entereditem = document.getElementById("inputbx").value;
        document.getElementById("inputbx").value ="";
        ListArr.push(entereditem);

        renderlist(ListArr);
        addremovelistener(ListArr);
    }
    function clearlist() {
        var childs = document.getElementById("notelist").children.length;
        if (childs > 0)
            document.getElementById("notelist").removeChild();
    }
    function renderlist(RenderArr) {
        var currentDiv = document.getElementById("notelist");
        var len = RenderArr.length;
        var concatlist = '';
        for (var i = 0; i < len; i++) {
            if(RenderArr[i]!= undefined)
            concatlist = template(i, RenderArr) + concatlist;
        }
        currentDiv.innerHTML = concatlist;
    }
    function addremovelistener(RenderArr){
        var closebtn = document.getElementsByClassName("listitemclose");
        for(var i=0;i< closebtn.length ; i++){
            closebtn[i].addEventListener('click', (e)=>{removeitem(e,RenderArr)} ,false)
        }
    }
    function removeitem(e, RenderArr){
        var indextoremove = e.target.attributes.id.value;
        RenderArr.splice(indextoremove, 1);
        if(RenderArr !== ListArr)
        ListArr.splice(indextoremove, 1);
        renderlist(RenderArr);
        addremovelistener(RenderArr);
    }
    function searchitem(event) {
        var enteredtext = document.getElementById("searchbx").value;
        var filterArr = [];var i=0;
        ListArr.map(function(element,index){
            if (element.search(enteredtext) >= 0){
            filterArr[index] = element ;
            }
        })
        renderlist(filterArr);
        addremovelistener(filterArr);
        console.log(filterArr);
    }
    return todohandeler;
})();


document.addEventListener("DOMContentLoaded", Todo.init);