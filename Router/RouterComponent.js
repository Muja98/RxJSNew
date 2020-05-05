import {MainPage} from '../src/Pages/MainPage';
import {TaskPage} from '../src/Pages/TaskPage'

export class RouterComponent{
    constructor(){}
    openMainPage(parent){
        var mainPage = new MainPage();
        mainPage.MainContainer(parent)
    }

    openTaskPage(){
        var taskPage = new TaskPage();
        taskPage.TaskContainer(parent)
    }
}