import {RouterComponent} from '../../Router/RouterComponent';

var router = new RouterComponent();
var par = document.getElementById("contentContainer")
export function CreateNavigationBar(parent){
        let menu = document.createElement("div");
        menu.className = "menuContainer"
        parent.appendChild(menu)

        let div = document.createElement("div");
        div.className = "menuItem";
        menu.appendChild(div);

        let pic = document.createElement("img");
        pic.src = "./resources/logo.png";
        div.appendChild(pic);


       div = document.createElement("div");
       div.innerHTML = "<h1>Home</h1>"
       div.className = "menuItem";
       div.onclick=(ev)=>{
            router.openMainPage(par);
       }
       menu.appendChild(div);

       div = document.createElement("div");
       div.innerHTML = "<h1>Tasks</h1>"
       div.className = "menuItem";
       div.onclick=(ev)=>{
          router.openTaskPage(par);
     }
       menu.appendChild(div);

       div = document.createElement("div");
       div.innerHTML = "<h1>My Tasks</h1>"
       div.className = "menuItem";
       menu.appendChild(div);


}