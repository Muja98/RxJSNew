import {RouterComponent} from '../../Router/RouterComponent'

export class MainPage{
    constructor(){
        this.router = new RouterComponent();
    }   

    MainContainer(parent){
        let div = document.createElement("div");
        parent.appendChild(div);
        div.innerText = "MainPage"
    }
}