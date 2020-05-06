import {RouterComponent} from '../../Router/RouterComponent'

export class TaskPage{
    constructor(){
       
    }   

    TaskContainer(parent){
        let div = document.createElement("div");
        parent.appendChild(div);
        div.innerText = "TaskPage"
    }
}