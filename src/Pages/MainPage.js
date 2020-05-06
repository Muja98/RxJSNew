import {RouterComponent} from '../../Router/RouterComponent'
import {TaskServices} from '../../Services/taskService';
import {Subscriber} from 'rxjs';
import {zip} from 'rxjs'
export class MainPage{
    constructor(){
        this.router = new RouterComponent();
        this.tasks = new TaskServices();
        this.mainContainer = null;
    }   

    MainContainer(parent){
        let div = document.createElement("div");
        parent.appendChild(div);
        this.mainContainer = div;
        this.mainContainer.className = "mainContainer";
        this.tasks.getAllTasks().subscribe(
            allTasks => this.createTasks(allTasks)
        )
    }

    createTasks(allTasks)
    {
        allTasks.map((el)=>{


            let taskItem = document.createElement("div");
            taskItem.className = "taskItem";
            this.mainContainer.appendChild(taskItem);

            let leftDiv = document.createElement("div");
            leftDiv.className = "leftDiv"
            taskItem.appendChild(leftDiv);

            let pom = document.createElement("h1");
            pom.innerText = el.title;
            pom.style.fontFamily = "Arial, Helvetica"
            pom.style.color = "yellowgreen"
            leftDiv.appendChild(pom);
            
            pom = document.createElement("img");
            pom.src = "./resources/decor.png";
            leftDiv.appendChild(pom);



            pom = document.createElement("p");
            pom.innerText = el.description;
            pom.style.fontFamily = "Arial, Helvetica";
            leftDiv.appendChild(pom);

            pom = document.createElement("h5");
            pom.innerText ="Datum pocetka: "+el.dateOpen;
            pom.style.fontFamily = "Arial, Helvetica";
            leftDiv.appendChild(pom);

            pom = document.createElement("h5");
            pom.innerText ="Datum ocekivanog zavrsetka: "+el.dateClosed;
            pom.style.fontFamily = "Arial, Helvetica";
            leftDiv.appendChild(pom);

            let rightDiv = document.createElement("div")
            rightDiv.className = "rightDiv"
            taskItem.appendChild(rightDiv);

            let pic = document.createElement("img");
            pic.src = `./resources/icons/${el.taskid}.png`;
            pic.style.width = "100px";
            pic.style.height = "100px"
            rightDiv.appendChild(pic);


            
        })
    }

}

//"id": 1,
// "title": "Oranje",
// "description": "Neophodno je izorati njivu da bi se pripremila za buduce oranje",
// "completed": false,
// "WorkerId": null,
// "dateOpen": "20.5.2020",
// "dateClosed": "24.5.2020"