import {RouterComponent} from '../../Router/RouterComponent'
import {TaskServices} from '../../Services/taskService';


export class MyTask{
    constructor(){
        this.router = new RouterComponent();
        this.tasks = new TaskServices();
        this.mainContainer = null;
        this.rightMenuContent = null;
        this.modal = null
    }   
}