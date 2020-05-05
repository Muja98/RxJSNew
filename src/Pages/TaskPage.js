import {RouterComponent} from '../../Router/RouterComponent'

export class TaskPage{
    constructor(){
        this.router = new RouterComponent();
    }   

    TaskContainer(parent){
        let div = document.createElement("div");
        parent.appendChild(div);
        div.innerText = "Task page"
    }
}