import {from} from 'rxjs';
import {Observable} from 'rxjs';
import {fromFetch} from 'rxjs/fetch'
import {switchMap, take} from 'rxjs/operators'



let URL_TASK = "http://localhost:3000/Tasks"
let URL_WORKER = "http://localhost:3000/Worker"
let URL_WORKTYPES = "http://localhost:3000/WorkType"

export class WorkServices{
    constructor(){}

    addWorker(worker){
        const newWorker ={
            method:"post",
            body: JSON.stringify(worker),
            headers:{'Content-Type':'application/json'}
        };
        fetch(URL_WORKER,newWorker)
        .then(response => response.json())
        .then(data => {
          alert(`Uspešno kreiran CV!`)
        })
        .catch((error) => {
          alert("Trenutno nije moguće kreirati!")
        });
    }

    getWorker(JMBG){
      const data$ = fromFetch(URL_WORKER+`?JMBG=${JMBG}`).pipe(
          switchMap(response =>{
              if(response.ok)
              {
                  return response.json();
              }
          })
      )
      
    return data$;
  }

  
      async  getWorkerByPromises(JMBG) {
      return fetch(URL_WORKER+`?JMBG=${JMBG}`)
        .then((res) => res.json())
        .catch((err) => console.log(err));
    }
  

  

}