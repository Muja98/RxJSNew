import {MainPage} from '../src/Pages/MainPage';
import {TaskPage} from '../src/Pages/TaskPage'
import { MyTask } from '../src/Pages/MyTaskPage'
export class RouterComponent{
    constructor(){}
    openMainPage(parent){
        var mainPage = new MainPage();
        mainPage.MainContainer(parent)
    }

    openTaskPage(parent){
        var taskPage = new TaskPage();
        taskPage.TaskContainer(parent)
    }

    openMyTaskPage(parent){
        var myTaskPage = new MyTask();
        myTaskPage.MyTaskContainer(parent)
    }
}