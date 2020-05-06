import {RouterComponent} from '../../Router/RouterComponent'
import {TaskServices} from '../../Services/taskService';
import {Subscriber} from 'rxjs';
import {zip} from 'rxjs'
import { isThrowStatement } from 'typescript';
export class MainPage{
    constructor(){
        this.router = new RouterComponent();
        this.tasks = new TaskServices();
        this.mainContainer = null;
        this.rightMenuContent = null;
    }   

    MainContainer(parent){
        let div = document.createElement("div");
        parent.appendChild(div);
        this.mainContainer = div;
        this.mainContainer.className = "mainContainer";
        
        div = document.createElement("div")
        div.className = "rightMenuContent";
        this.mainContainer.appendChild(div);
        this.rightMenuContent = div;

        this.tasks.getAllWorkTypes().subscribe(
            allTypes => this.createSearchByItem(allTypes)
        )
        this.tasks.getAllTasks().subscribe(
            allTasks => this.createTasks(allTasks,div)
        )

        this.createModal(parent);

    }

    createModal(parent){

    }

  

    createSearchByItem(allTypes){
        let searchByItems = document.createElement("div");
        searchByItems.className = "leftMenuContent";
        this.mainContainer.appendChild(searchByItems);

        let div = document.createElement("div");
        div.className = "leftMenuContentItem"
        div.style.backgroundColor = "#c3e6cb"
        div.style.borderRadius = "3%"
        div.style.color = "#155724"
        div.innerText = "Tip posla",
        div.style.fontWeight = "600"
        div.style.fontSize = "24px"
        searchByItems.appendChild(div);

        allTypes.map(el=>{
            div = document.createElement("div");
            div.className = "leftMenuContentItem"
            div.innerText = el.name
            div.onclick =()=>{
                this.getItemClicked(el.id)
            }
            div.style.cursor = "pointer"
            div.style.backgroundColor = "whitesmoke"
            searchByItems.appendChild(div)
        })

    }

    getItemClicked(id)
    {
        this.rightMenuContent.innerHTML = "";
        this.tasks.getAllTaskById(id).subscribe(
            allTasks => this.createTasks(allTasks,this.rightMenuContent) 
            )
    }

    createTasks(allTasks, parent)
    {
        if(allTasks.length===0)
        {
            let taskItem = document.createElement("div");
            taskItem.className = "taskItem";
            taskItem.style.height = "100px";
            taskItem.style.display = "flex";
            taskItem.style.alignItems = "center";
            taskItem.style.justifyContent = "center";
            taskItem.style.fontSize = "24px"
            taskItem.innerText = "Ne postoje rezultati za željeni tip posla!"
            parent.appendChild(taskItem);
            return;
        }
        allTasks.map((el)=>{


            let taskItem = document.createElement("div");
            taskItem.className = "taskItem";
            parent.appendChild(taskItem);

            let leftDiv = document.createElement("div");
            leftDiv.className = "leftDiv"
            taskItem.appendChild(leftDiv);

            let pom = document.createElement("h1");
            pom.innerText = el.title;
            pom.style.cursor = "pointer";
            pom.onclick =()=>{
                this.ShowModal(el,parent);
            }
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

            pom = document.createElement("h5");
            pom.innerText ="Kontakt telefon: "+el.phone;
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

    ShowModal(el,parent)
    {
        
      
    }

  

}

//"id": 1,
// "title": "Oranje",
// "description": "Neophodno je izorati njivu da bi se pripremila za buduce oranje",
// "completed": false,
// "WorkerId": null,
// "dateOpen": "20.5.2020",
// "dateClosed": "24.5.2020"