import {from} from 'rxjs';
import {Observable} from 'rxjs';
import {fromFetch} from 'rxjs/fetch'
import {switchMap, take} from 'rxjs/operators'


let URL_TASK = "http://localhost:3000/Tasks"
let URL_WORKER = "http://localhost:3000/Worker"
let URL_WORKTYPES = "http://localhost:3000/WorkType"
export class TaskServices{
    constructor(){}

  
    getAllTasks(){
        const data$ = fromFetch(URL_TASK).pipe(
            switchMap(response =>{
                if(response.ok)
                {
                    return response.json();
                }
            }),
        )
        
      return data$;
    }

    getAllTasksByName(name){
        const data$ = fromFetch(URL_TASK+`?title=${name}`).pipe(
            switchMap(response =>{
                if(response.ok)
                {
                    return response.json();
                }
            })
        )
        
      return data$;
    }
    //http://localhost:3000/Tasks?taskid=1
    //Merge map
    //Salje podatke i ako hocemo nove ona prekida predhodno slanje
    getAllTaskById(id)
    {
        const data$ = fromFetch(URL_TASK+`?taskid=${id}`).pipe(
            switchMap(response =>{
                if(response.ok)
                {
                    return response.json();
                }
            })
        )
        
      return data$;
    }
    getAllWorkTypes(){
        const data$ = fromFetch(URL_WORKTYPES).pipe(
            switchMap(response =>{
                if(response.ok)
                {
                    return response.json();
                }
            })
        )
        return data$;
    }

    

    addWorker(worker,task){
        let pom = worker.id;
        const newWorker ={
            method:"post",
            body: JSON.stringify(worker),
            headers:{'Content-Type':'application/json'}
        };
        fetch(URL_WORKER,newWorker)
        .then(response => response.json())
        .then(data => {
          alert(`Uspešno ste konkurisali za posao!`)
        })
        .catch((error) => {
          alert("Trenutno nije moguće konkurisati za posao!")
        });

        task.WorkerId = 1;
        const UpdateTask ={
            method:"put",
            body: JSON.stringify(task),
            headers:{'Content-Type':'application/json'},
        };
        fetch(URL_TASK+"/"+task.id,UpdateTask)
    }

    addTask(task){

        const newTask ={
            method:"post",
            body: JSON.stringify(task),
            headers:{'Content-Type':'application/json'}
        };
        fetch(URL_TASK,newTask)
        .then(response => response.json())
        .then(data => {
          alert(`Uspešno dodan Task!`)
        })
        .catch((error) => {
          alert("Trenutno nije moguće dodati novi task!")
        });

    }

    getAllTaskByJMBG(jmbg)
    {
        const data$ = fromFetch(URL_TASK+`?jmbg=${jmbg}`).pipe(
            switchMap(response =>{
                if(response.ok)
                {
                    return response.json();
                }
            })
        )
        
      return data$;
    }
    taskDone(el)
    {
        console.log(el);
        const UpdateTask ={
            method:"put",
            body: JSON.stringify(el),
            headers:{'Content-Type':'application/json'},
        };
        fetch(URL_TASK+"/"+el.id,UpdateTask)
    }

    getAllTaskByWorkerJMBG(jmbg)
    {
        const data$ = fromFetch(URL_TASK+`?WorkerJMBG=${jmbg}`).pipe(
            switchMap(response =>{
                if(response.ok)
                {
                    return response.json();
                }
            })
        )
        
      return data$;
    }

    removeTask(id)
    {

        fetch(URL_TASK+`/${id}`,{method: 'DELETE'})
        .then(response => response.json())
        .then(data => {
          return true
        })
        .catch((error) => {
          return false;
        });
    }

   


}