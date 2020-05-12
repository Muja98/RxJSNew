import {RouterComponent} from '../../Router/RouterComponent'
import {TaskServices} from '../../Services/taskService';
import {fromEvent, interval,from,merge} from 'rxjs';
import { switchMap,filter, mergeMap, map, withLatestFrom, take } from 'rxjs/operators';

export class TaskPage{
    brojac: Number;
    tasks: TaskServices;
    left: HTMLDivElement;
    right: HTMLDivElement;
    center: HTMLDivElement;
    arrayTask: Array<Object>;
    constructor(){
        this.tasks = new TaskServices();
        this.left = null;
        this.right = null;
        this.center = null;
        this.arrayTask = new Array();
        this.brojac = 0;
    }   

    TaskContainer(parent:HTMLDivElement){
        let div = document.createElement("div");
        div.className = "taskContainer"
        parent.appendChild(div);

        this.createTaskContainerLeft(div);
        this.createTaskContainerRight(div);
    }

    createTaskContainerLeft(parent:HTMLDivElement)
    {
        //this.left.innerHTML = "";
        let div = document.createElement("div");
        div.className = "TaskContainerLeft"
        parent.appendChild(div);
        this.left = div;

        let pomdiv = document.createElement("div");
        pomdiv.className = "TaskContainerLeftContainer"
        div.appendChild(pomdiv)

        let topDiv = document.createElement("div");
        topDiv.className = "TaskContainerLeftContainerTop"
        pomdiv.appendChild(topDiv);

        let naslov = document.createElement("h1");
        naslov.innerHTML =  "<span style=\"color:yellowgreen\">Napravi &nbsp;</span>novi task";
        naslov.style.fontFamily = "Arial, Helvetica"
        topDiv.appendChild(naslov)

        let pic = document.createElement("img");
        pic.src = "./resources/decor.png";
        pic.style.width="230px"
        topDiv.appendChild(pic);

        let bottomDiv = document.createElement("div");
        bottomDiv.className = "TaskContainerLeftContainerBottom"
        pomdiv.appendChild(bottomDiv);

        let niz = ["JMBG poslodavca: ","Naslov: ","Telefon: ", "Datum Početka: ", "Datum očekivanog završetka: ","Opis: "];

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
            if(i==5)
            {
                let inp = document.createElement("textarea")
                inp.style.float = "right"
                inp.style.width = "350px"
                inp.style.height = "70px"
                inp.style.maxWidth = "350px"
                inp.style.maxHeight = "70px"
                div.appendChild(inp)
            }
            else
            {
                let inp = document.createElement("input");
                inp.type = "text";
                inp.style.height = "35px"
                inp.style.float = "right"
                div.appendChild(inp)
            }
        })

        div = document.createElement("div");
        div.className = "TaskContainerLeftContainerBottomEllement"
        div.innerText = "Tip posla: "
        bottomDiv.appendChild(div);

        let select  = document.createElement("select");
        select.style.marginTop=  "45px"
        select.onchange
        div.appendChild(select)

        let nizOpcija = ["Radnik","Sadnja","Čuvanje Stoke","Košenje","Rad u plasteniku","Okopavanje", "Mehanizacija"]
        nizOpcija.map((el,i)=>{
            let opt = document.createElement("option");
            opt.value = (i+1).toString();
            opt.text = el;
            select.options.add(opt);
        })

        let button = document.createElement("button");
        button.className = "btnSuccess";
        button.innerText = "Napravi!";
        button.style.width = "110px"
        button.style.marginLeft = "97px"
        button.onclick=(ev)=>{
            this.putNewTask(ev.currentTarget)
        }
        div.appendChild(button);

    }

    putNewTask(button)
    {
        let parent = button.parentNode.parentNode;

        //#region Handle blank input in Tasks
         let pom = parent.childNodes[0].childNodes[1].value
         if(pom === null || pom === undefined || pom===""){alert("Molimo unesite JMBG!") 
         return}
         pom = parent.childNodes[1].childNodes[1].value
        if(pom === null || pom === undefined || pom===""){alert("Molimo unesite Naslov!") 
         return}
        pom = parent.childNodes[2].childNodes[1].value
        if(pom === null || pom === undefined || pom===""){alert("Molimo unesite Telefon!") 
        return}
       pom = parent.childNodes[3].childNodes[1].value
        if(pom === null || pom === undefined || pom===""){alert("Molimo unesite Datum početka!") 
        return}
        pom = parent.childNodes[4].childNodes[1].value
        if(pom === null || pom === undefined || pom===""){alert("Molimo unesite očekivani datum završetka!") 
        return}
        pom = parent.childNodes[5].childNodes[1].value
        if(pom === null || pom === undefined || pom===""){alert("Molimo unesite opis!") 
        return}
        //#endregion
        
        let Tasks = {
                      jmbg: parent.childNodes[0].childNodes[1].value,
                      title: parent.childNodes[1].childNodes[1].value,
                      taskid: parent.childNodes[6].childNodes[1].value,
                      description: parent.childNodes[5].childNodes[1].value,
                      completed: false,                     
                      WorkerJMBG: 0,                   
                      dateOpen: parent.childNodes[3].childNodes[1].value,
                      dateClosed: parent.childNodes[4].childNodes[1].value,
                      phone: parent.childNodes[2].childNodes[1].value  
        }

        //#region clear blank input in Tasks
        parent.childNodes[0].childNodes[1].value = ""
        parent.childNodes[1].childNodes[1].value = ""
        parent.childNodes[2].childNodes[1].value = ""
        parent.childNodes[3].childNodes[1].value = ""
        parent.childNodes[4].childNodes[1].value = ""
        parent.childNodes[5].childNodes[1].value = ""
        parent.childNodes[6].childNodes[1].value = 1
        //#endregion

        this.tasks.addTask(Tasks);
    }



    createTaskContainerRight(parent:HTMLDivElement)
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
        levi.className = "TaskContainerRightBottomLeft"
        botom.appendChild(levi);
        let desni = document.createElement("div");
        desni.className = "TaskContainerRightBottomRight"
        botom.appendChild(desni);

        this.createTekst(levi,desni)
        let lf = document.createElement("div");
        lf.style.width = "100%";
        lf.style.height = "100%"

        levi.appendChild(lf);

        let rh = document.createElement("div");
        rh.style.width = "100%";
        rh.style.height = "100%"

        desni.appendChild(rh);

        this.left = lf;
        this.right = rh


     
    }

    createSearchBar(parent:HTMLDivElement)
    {
        let div = document.createElement("div");
        parent.appendChild(div);
        div.className = "topnav"

        
        let inp = document.createElement("input");
        inp.type = "text";
        inp.placeholder = "Unesite JMBG...";
        inp.id = "inputTask2"
        inp.style.height = "50px"
        inp.style.width = "610px"
        
        div.append(inp);
        let button = document.createElement("button");
        button.type ="submit"
        button.id = "searchButton2"
        button.style.height = "50px"
        button.style.width = "80px"
        button.innerHTML = "<i class=\"fa fa-search\"></i>"
        div.appendChild(button)

        this.searchTasks();
    }

    inputObservable(){
        const inp = document.getElementById("inputTask2")
        return fromEvent(inp,"input")
        .pipe(
          map(input=>(<HTMLTextAreaElement>input.target).value));
    }


    searchTasks()
    {
        const searchButton = document.getElementById("searchButton2")
        fromEvent(searchButton,"click").pipe(
            withLatestFrom(
                this.inputObservable()
            ),
            take(5)
        ).subscribe(itemForSearch=>this.getAllTaskJMBG(itemForSearch[1]))

    }

    getAllTaskJMBG(jmbg:String)
    {

        this.left.innerHTML =""
        this.right.innerHTML = ""
        merge(
            this.tasks.getAllTaskByJMBGET(jmbg),
            this.tasks.getAllTaskByJMBGNET(jmbg)
        ).subscribe(
            allTasks => this.createTasks(allTasks,this.center,this.left,this.right)
        )
        // this.tasks.getAllTaskByJMBG(jmbg).subscribe(
        //     allTasks => this.createTasks(allTasks,this.center,this.left,this.right)
        // )
    }

    createTekst(levi,desni)
    {
        let taskItem = document.createElement("div");
        taskItem.className = "taskItemError";
        taskItem.innerText = "Nezavršeni"
        taskItem.style.marginLeft = "50px"
        taskItem.style.color = "#dc3545"
        levi.appendChild(taskItem);

        taskItem = document.createElement("div");
        taskItem.className = "taskItemError";
        taskItem.innerText = "Završeni"
        taskItem.style.marginLeft = "50px"
        taskItem.style.color = "#28a745"
        taskItem.style.height = "120px"
        desni.appendChild(taskItem);
    }

    createTasks(allTasks, parent, left ,right)
    {
       

        // if(this.brojac===3)
        // {
        //     this.brojac=0
        //   //  parent.innerHTML = ""
        //      left.innerHTML = ""
        //      right.innerHTML = ""

            
        // }
       
     
        // if(allTasks.length===0)
        // {
        //     taskItem = document.createElement("div");
        //     taskItem.className = "taskItemError";
            
        //     taskItem.style.marginLeft = "400px"
        //     taskItem.innerText = "Ne postoje rezultati za taj JMBG!"
        //     left.appendChild(taskItem);
        //     return;
        // }

        this.createTask(allTasks,left,right)
    }

    createTask(elp,left,right){
        elp.map((el)=>{
            let taskItem = document.createElement("div");
            taskItem.className = "taskItem";
            taskItem.style.width = "600px"
            if(el.completed)
            {   
    
                right.appendChild(taskItem);
         
            }
          
            else
            {
    
                left.appendChild(taskItem);
              
            }
    
            let leftDiv = document.createElement("div");
            leftDiv.className = "leftDiv"
            taskItem.appendChild(leftDiv);
    
            let x = document.createElement("div");
            x.innerHTML = "<i class=\"fa fa-times-circle fa-2x\"></i>"
            x.style.position = "absolute";
            x.style.marginLeft = "570px"
            x.style.cursor = "pointer"
            x.onclick =(ev)=>{
                if(el.completed)
                {
                    this.delete(ev.currentTarget,el.id)
                }
                else
                {
                    this.delete(ev.currentTarget,el.id)
                }
              
            }
            leftDiv.appendChild(x);
    
            let pom = document.createElement("h1");
            pom.innerText = el.title;
            pom.style.fontFamily = "Arial, Helvetica"
            pom.style.color = "yellowgreen"
            leftDiv.appendChild(pom);
            
            let pom1 = document.createElement("img");
            pom1.src = "./resources/decor.png";
            leftDiv.appendChild(pom1);
    
    
    
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

    delete(pos,id)
    {
        let index =  pos.parentNode.parentNode.value;
        pos.parentNode.parentNode.style.border = "none"
        pos.parentNode.parentNode.innerHTML = ""

        // let parent  = pos.parentNode.parentNode.parentNode;
        
         this.tasks.removeTask(id)
      
        //     parent.childNodes[index+1].style.border = "none"  
        //     parent.childNodes[index+1].innerHTML = ""
            

        //alert(el);
    }

}