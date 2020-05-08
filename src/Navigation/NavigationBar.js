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
        pic.style.width="78%"
        pic.style.cursor = "pointer"
        div.appendChild(pic);


       div = document.createElement("div");
       div.innerHTML = "<p>Home</p>"
       div.className = "menuItem";
       div.onclick=(ev)=>{
            par.innerHTML = "";
            router.openMainPage(par);
       }
       menu.appendChild(div);

       div = document.createElement("div");
       div.innerHTML = "<p>Tasks</p>"
       div.className = "menuItem";
       div.onclick=(ev)=>{
          par.innerHTML = "";
          router.openTaskPage(par);
     }
       menu.appendChild(div);

       div = document.createElement("div");
       div.innerHTML = "<p>My Tasks</p>"
       div.className = "menuItem";
       div.onclick=(ev)=>{
          par.innerHTML = "";
          router.openMyTaskPage(par);
       }
       menu.appendChild(div);


}