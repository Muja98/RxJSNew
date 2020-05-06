import {from} from 'rxjs';
import {Observable} from 'rxjs';
import {fromFetch} from 'rxjs/fetch'
import {switchMap} from 'rxjs/operators'


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
            })
        )
        
      return data$;
    }
    //http://localhost:3000/Tasks?taskid=1
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

   


}