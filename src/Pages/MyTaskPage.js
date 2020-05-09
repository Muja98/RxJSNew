import {RouterComponent} from '../../Router/RouterComponent'
import {TaskServices} from '../../Services/taskService';
import {fromEvent, zip, interval} from 'rxjs';
import { switchMap,filter, mergeMap, map, withLatestFrom, take } from 'rxjs/operators';
import {WorkServices} from '../../Services/workServices';
export class MyTask{

    constructor(){
        this.router = new RouterComponent();
        this.tasks = new TaskServices();
        this.works = new WorkServices();
        this.left = null;
        this.right = null;
        this.center = null;
    }   

    MyTaskContainer(parent){
        let div = document.createElement("div");
        div.className = "taskContainer"
        parent.appendChild(div);

        this.createTaskContainerLeft(div);
        this.createTaskContainerRight(div);
    }

    createSearchBar(parent)
    {
        let div = document.createElement("div");
        parent.appendChild(div);
        div.className = "topnav"

        
        let inp = document.createElement("input");
        inp.type = "text";
        inp.placeholder = "Unesite JMBG...";
        inp.id = "inputTask3"
        inp.style.height = "50px"
        inp.style.width = "610px"
        
        div.append(inp);
        let button = document.createElement("button");
        button.type ="submit"
        button.id = "searchButton3"
        button.style.height = "50px"
        button.style.width = "80px"
        button.innerHTML = "<i class=\"fa fa-search\"></i>"
        div.appendChild(button)

        this.searchTasks();
    }

    inputObservable(){
        const inp = document.getElementById("inputTask3")
        return fromEvent(inp,"input")
        .pipe(
          map(input=>input.target.value));
    }


    searchTasks()
    {
        const searchButton = document.getElementById("searchButton3")
        fromEvent(searchButton,"click").pipe(
            withLatestFrom(
                this.inputObservable()
            )
        ).subscribe(itemForSearch=>this.getAllWorkerJmbgTask(itemForSearch[1]))

    }

    getAllWorkerJmbgTask(jmbg)
    {
       zip( this.tasks.getAllTaskByWorkerJMBG(jmbg),
            this.works.getWorker(jmbg)
            ).subscribe(
            allTasks => this.createTasks(allTasks,this.center)
        )
    }

    createTasks(allTasks, parent)
    {
       
        parent.innerHTML = ""

        let left = document.createElement("div");
        parent.appendChild(left);
        left.className = "TaskContainerRightBottomRight";

        let right = document.createElement("div");
        parent.appendChild(right);
        right.className = "TaskContainerRightBottomRight";

        console.log(allTasks)
        if(allTasks[1].length===0)
        {
            let taskItem = document.createElement("div");
            taskItem.className = "taskItemError";
            taskItem.style.width = "500px"
            taskItem.innerText = "Ne postoji Radnik sa taj JMBG!"
            right.appendChild(taskItem);
            return;
        }
        else
        {
            let div = document.createElement("div");
            div.className = "TaskContainerLeft"
            div.style.alignItems = "initial"
            div.style.marginTop = "25px"
            div.style.width = "500px"
            right.appendChild(div);
     
    
            let pomdiv = document.createElement("div");
            pomdiv.className = "TaskContainerLeftContainer"
            pomdiv.style.height = "70%"
            div.appendChild(pomdiv)
    
            let topDiv = document.createElement("div");
            topDiv.className = "TaskContainerLeftContainerTop"
            pomdiv.appendChild(topDiv);
    
            let naslov = document.createElement("h1");
            naslov.innerHTML =  "<span style=\"color:yellowgreen\">Informacije &nbsp;</span>o radniku";
            naslov.style.fontFamily = "Arial, Helvetica"
            topDiv.appendChild(naslov)
    
            let pic = document.createElement("img");
            pic.src = "./resources/decor.png";
            pic.style.width="230px"
            topDiv.appendChild(pic);
    
            let bottomDiv = document.createElement("div");
            bottomDiv.className = "TaskContainerLeftContainerBottom"
            pomdiv.appendChild(bottomDiv);
    
            let niz = ["Ime: ","Prezime: ","Telefon: ", "Datum rođenja: "];
            let niz2 =[allTasks[1][0].name,allTasks[1][0].surname,allTasks[1][0].phone,allTasks[1][0].dateOfBirth]
            niz.map((el,i)=>{
                div = document.createElement("div");
                div.className = "TaskContainerLeftContainerBottomEllement"
                bottomDiv.appendChild(div);
    
                let lbl = document.createElement("label");
                lbl.innerText = el;
                lbl.style.fontFamily = "Arial, Helvetica";
                lbl.style.fontSize = "17px"
                lbl.style.fontWeight = "500"
                lbl.style.float = "left"
                div.appendChild(lbl);
    
                let inp = document.createElement("input");
                inp.type = "text";
                inp.value = niz2[i]
                inp.disabled = true;
                inp.style.height = "35px"
                inp.style.float = "right"
                div.appendChild(inp)
            })
    
        
        }

        if(allTasks[0].length===0)
        {
            let taskItem = document.createElement("div");
            taskItem.className = "taskItemError";
            taskItem.style.width = "500px"
            taskItem.innerText = "Ne postoji task za tog Radnika!"
            left.appendChild(taskItem);
            return;
        }
        else
        {
        allTasks[0].map((el,i)=>{
                console.log(el);
                let taskItem = document.createElement("div");
                taskItem.className = "taskItem";
                taskItem.style.width = "600px"
                taskItem.style.height = "280px"
                left.appendChild(taskItem);
                let leftDiv = document.createElement("div");
                leftDiv.className = "leftDiv"
                taskItem.appendChild(leftDiv);

                let x = document.createElement("div");
                x.innerHTML = "<i class=\"fa fa-check fa-2x\"></i>"
                x.style.position = "absolute";
                x.style.marginLeft = "560px"
                x.style.cursor = "pointer"
                x.onclick =(ev)=>{
                        this.complete(ev.currentTarget,el)
                }
                leftDiv.appendChild(x);

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
                pic.style.marginBottom = "150px"
                rightDiv.appendChild(pic);
        })
     }
    }

    createTaskContainerRight(parent)
    {
        let div = document.createElement("div");
        div.className = "TaskContainerRight"
        parent.appendChild(div);

        let top = document.createElement("div");
        top.className = "TaskContainerRightTop";
        div.appendChild(top)
        this.createSearchBar(top);

        let botom = document.createElement("div");
        botom.className = "TaskContainerRightBottom"
        div.appendChild(botom)
        this.center = botom;

        let levi = document.createElement("div")
        levi.className = "TaskContainerRightBottomRight"
        botom.appendChild(levi);
        this.left = levi;

        let desni = document.createElement("div")
        desni.className = "TaskContainerRightBottomRight"
        botom.appendChild(desni);
        this.right = desni
    }

    complete(pos,el)
    {
        let index =  pos.parentNode.parentNode.value;
        let parent  = pos.parentNode.parentNode.parentNode;


        let task = {
            id: el.id,
            jmbg: el.jmbg,
            title: el.title,
            taskid: el.taskid,
            description: el.description,
            completed: true,
            WorkerJMBG: -1,
            dateOpen: el.dateOpen,
            dateClosed: el.dateClosed,
            phone: el.phone
        }

        this.tasks.taskDone(task)
        parent.childNodes[index].style.height = 0;
        parent.childNodes[index].style.width = 0;
        parent.childNodes[index].style.border = "none"  
         parent.childNodes[index].innerHTML = ""     
           

        //alert(el);
    }

    createTaskContainerLeft(parent)
    {
        let div = document.createElement("div");
        div.className = "TaskContainerLeft"
        div.style.alignItems = "initial"
        div.style.marginTop = "50px"
        parent.appendChild(div);
        this.left = div;

        let pomdiv = document.createElement("div");
        pomdiv.className = "TaskContainerLeftContainer"
        pomdiv.style.height = "70%"
        div.appendChild(pomdiv)

        let topDiv = document.createElement("div");
        topDiv.className = "TaskContainerLeftContainerTop"
        pomdiv.appendChild(topDiv);

        let naslov = document.createElement("h1");
        naslov.innerHTML =  "<span style=\"color:yellowgreen\">Napravi CV &nbsp;</span>za rad na Farmi";
        naslov.style.fontFamily = "Arial, Helvetica"
        topDiv.appendChild(naslov)

        let pic = document.createElement("img");
        pic.src = "./resources/decor.png";
        pic.style.width="230px"
        topDiv.appendChild(pic);

        let bottomDiv = document.createElement("div");
        bottomDiv.className = "TaskContainerLeftContainerBottom"
        pomdiv.appendChild(bottomDiv);

        let niz = ["Ime: ","Prezime: ","Telefon: ", "Datum rođenja: ", "JBMG: "];

        niz.map((el,i)=>{
            div = document.createElement("div");
            div.className = "TaskContainerLeftContainerBottomEllement"
            bottomDiv.appendChild(div);

            let lbl = document.createElement("label");
            lbl.innerText = el;
            lbl.style.fontFamily = "Arial, Helvetica";
            lbl.style.fontSize = "17px"
            lbl.style.fontWeight = "500"
            lbl.style.float = "left"
            div.appendChild(lbl);

            let inp = document.createElement("input");
            inp.type = "text";
            inp.style.height = "35px"
            inp.style.float = "right"
            div.appendChild(inp)
        })

        div = document.createElement("div");
        div.className = "TaskContainerLeftContainerBottomEllement"
        bottomDiv.appendChild(div);


        let button = document.createElement("button");
        button.className = "btnSuccess";
        button.innerText = "Napravi!";
        button.style.width = "110px"
        button.style.marginLeft = "97px"
        button.onclick=(ev)=>{
            this.putNewWorker(ev.currentTarget)
        }
        div.appendChild(button);

    }

    putNewWorker(button)
    {
        let parent = button.parentNode.parentNode;

        //#region Handle blank input in Tasks
         let pom = parent.childNodes[0].childNodes[1].value
         if(pom === null || pom === undefined || pom===""){alert("Molimo unesite Ime!") 
         return}
         pom = parent.childNodes[1].childNodes[1].value
        if(pom === null || pom === undefined || pom===""){alert("Molimo unesite Prezime!") 
         return}
        pom = parent.childNodes[2].childNodes[1].value
        if(pom === null || pom === undefined || pom===""){alert("Molimo unesite Telefon!") 
        return}
       pom = parent.childNodes[3].childNodes[1].value
        if(pom === null || pom === undefined || pom===""){alert("Molimo unesite Datum rođenja!") 
        return}
        pom = parent.childNodes[4].childNodes[1].value
        if(pom === null || pom === undefined || pom===""){alert("Molimo unesite JMBG!") 
        return}
        //#endregion
        
        let Worker = {
                      name: parent.childNodes[0].childNodes[1].value,
                      surname: parent.childNodes[1].childNodes[1].value,
                      phone: parent.childNodes[2].childNodes[1].value,
                      dateOfBirth: parent.childNodes[3].childNodes[1].value,             
                      JMBG: parent.childNodes[4].childNodes[1].value,
                      taskID: null  
        }
   
        const jmbg = parent.childNodes[4].childNodes[1].value
        //#region clear blank input in Tasks
        parent.childNodes[0].childNodes[1].value = ""
        parent.childNodes[1].childNodes[1].value = ""
        parent.childNodes[2].childNodes[1].value = ""
        parent.childNodes[3].childNodes[1].value = ""
        parent.childNodes[4].childNodes[1].value = ""
        //#endregion
      
        this.works.getWorker(jmbg).subscribe(
            data => data.length!==0? alert("Vec postoji nalog sa tim JMBG-om"):this.works.addWorker(Worker)
        )
    }

}