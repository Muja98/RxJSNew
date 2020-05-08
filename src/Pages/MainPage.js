import {RouterComponent} from '../../Router/RouterComponent'
import {TaskServices} from '../../Services/taskService';
import {fromEvent, interval} from 'rxjs';
import {zip} from 'rxjs'
import { isThrowStatement, textChangeRangeIsUnchanged } from 'typescript';
import { switchMap,filter, mergeMap, map, withLatestFrom, take } from 'rxjs/operators';
export class MainPage{
    constructor(){
        this.router = new RouterComponent();
        this.tasks = new TaskServices();
        this.mainContainer = null;
        this.rightMenuContent = null;
        this.modal = null
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

        //this.createSearchBar(div)

        this.tasks.getAllWorkTypes().subscribe(
            allTypes => this.createSearchByItem(allTypes)
        )

        this.createAllTask()
        this.createModal(parent);
        
       
    }

  
    createSearchBar(parent)
    {
        let div = document.createElement("div");
        parent.appendChild(div);
        div.className = "topnav"

        
        let inp = document.createElement("input");
        inp.type = "text";
        inp.placeholder = "Traži...";
        inp.id = "inputTask"
        inp.style.height = "50px"
        inp.style.width = "610px"
        
        div.append(inp);
        let button = document.createElement("button");
        button.type ="submit"
        button.id = "searchButton"
        button.style.height = "50px"
        button.style.width = "80px"
        button.innerHTML = "<i class=\"fa fa-search\"></i>"
        div.appendChild(button)
        this.searchTasks();
    }

    searchTasks()
    {
        const searchButton = document.getElementById("searchButton")
        fromEvent(searchButton,"click").pipe(
            withLatestFrom(
                this.inputObservable()
            )
        ).subscribe(itemForSearch=>this.createAllTask(itemForSearch[1]))

    }   

    inputObservable(){
        const inp = document.getElementById("inputTask")
        return fromEvent(inp,"input")
        .pipe(
          map(input=>input.target.value));

    }

    createAllTask(itemForSearch){
        if(itemForSearch===null || itemForSearch ===undefined)
        {

            this.tasks.getAllTasks().subscribe(
                allTasks => this.createTasks(allTasks,this.rightMenuContent)
            )
        }
        else
        {
            this.tasks.getAllTasksByName(itemForSearch).subscribe(
                allTasks => this.createTasks(allTasks,this.rightMenuContent)
            )
        }
    }

    createModal(parent){
        let div = document.createElement("div");
        div.className = "modal"
        this.modal = div;
        parent.appendChild(div)
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
        div.style.fontFamily = "Arial, Helvetica"
        div.innerText = "Tip posla",
        div.style.fontWeight = "600"
        div.style.fontSize = "24px"
        searchByItems.appendChild(div);

        allTypes.map(el=>{
            div = document.createElement("div");
            div.className = "leftMenuContentItem"
            div.innerText = el.name
            div.style.fontFamily = "Arial, Helvetica"
            div.style.fontWeight = "500"
            
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
        parent.innerHTML = ""
        this.createSearchBar(parent);
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

            if(el.WorkerId === 0)
            {
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
        }
        })
    }

    ShowModal(el,parent)
    {
        this.modal.innerHTML = ""
        let div = document.createElement("div");
        div.className = "modal-content"
       
        this.modal.appendChild(div);


        let sp = document.createElement("span");
        sp.className="close"
        sp.innerHTML = "&times;"
        sp.onclick =()=>{
            this.modal.style.display = "none"
        }
        div.appendChild(sp);

        let container = document.createElement("div");
        div.appendChild(container)
        container.className = "modalContainer"

        let pom = document.createElement("h1");
        pom.innerHTML = "<span style=\"color:yellowgreen\">Radi &nbsp;</span>u zdravoj sredini";
        pom.style.fontStyle = "Arial, Helvetica"
        pom.style.fontSize = "32px"
        container.appendChild(pom);

        pom = document.createElement("img");
        pom.src = "./resources/decor.png";
        pom.style.width="230px"
        container.appendChild(pom);

        let centarModal = document.createElement("div");
        centarModal.className = "centarModalDiv"
        div.appendChild(centarModal);

        let leftCetnerModal = document.createElement("div");
        leftCetnerModal.className = "leftCetnerModal";
        centarModal.appendChild(leftCetnerModal);

        pom = document.createElement("p");
        pom.innerText = `Prijavljujem se za posao: ${el.title}`
        pom.style.fontSize = "28px"
        leftCetnerModal.appendChild(pom);

        let niz = ["Ime:", "Prezime:", "JMBG:","Datum rodjenja: ", "Broj Telefona:"]
        let padd = ["145","105","120","27","50"]
        niz.map((el,i)=>{
            let pomdiv = document.createElement("div");
            pomdiv.style.padding = "10px"
            leftCetnerModal.appendChild(pomdiv);
            let lbl = document.createElement("lbl");
            lbl.innerText = el;
            lbl.style.fontSize = "24px"
            pomdiv.appendChild(lbl)
            let inp = document.createElement("input");
            inp.style.height = "30px"
            inp.style.marginLeft = padd[i]+"px"
            pomdiv.appendChild(inp)

        })


        let rightCenterModal = document.createElement("div");
        rightCenterModal.className = "rightCenterModal";
        centarModal.appendChild(rightCenterModal);


        let pic = document.createElement("img");
        pic.src = `./resources/icons/${el.taskid}.png`;
        pic.style.width = "100px";
        pic.style.height = "100px"
        pic.style.marginTop = "100px"
        rightCenterModal.appendChild(pic);

 
        
        let button = document.createElement("button");
        button.className = "btnSuccess"
        button.innerText = "Konkuriši";
        button.style.marginTop = "80px"

        button.onclick =(ev)=>{
            this.handleKonkurisiClick(ev.currentTarget,el)
        }
        rightCenterModal.appendChild(button)

        this.modal.style.display = "block"
    }

    handleKonkurisiClick(button,el){
        let parent = button.parentNode.parentNode.childNodes[0];
        
        let worker = {
            name : parent.childNodes[1].childNodes[1].value,
            surname : parent.childNodes[2].childNodes[1].value,
            JBMG : parent.childNodes[3].childNodes[1].value,
            dateOfBirth : parent.childNodes[4].childNodes[1].value,
            phoneNumber : parent.childNodes[5].childNodes[1].value,
            tasksId : el.id
        }
        
        this.tasks.addWorker(worker,el);
       
        this.modal.style.display = "none";
        this.rightMenuContent.innerHTML = "";
        this.createAllTask();
    }

  

}

// "id":1,
// "name": "Stefan",
// "surname": "Stamenkovic",
// "JBMG": "11111",
// "dateOfBirth":"10.5.1998",
// "phoneNumber":"0651324",
// "tasksId":[1]

//"id": 1,
// "title": "Oranje",
// "description": "Neophodno je izorati njivu da bi se pripremila za buduce oranje",
// "completed": false,
// "WorkerId": null,
// "dateOpen": "20.5.2020",
// "dateClosed": "24.5.2020"