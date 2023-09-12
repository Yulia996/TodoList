const container = document.getElementById('root');
    const root = ReactDOM.createRoot(container);
    root.render(<App />);
    
    function App() {
      const [value, setValue] = React.useState('')
      const [edit, setEdit] = React.useState(false)
      const [status, setStatus] = React.useState(false)
      const [id, setId] = React.useState(1);
      const [tasks, setTasks] = React.useState([]);

      const addTask = () => {
        setId(i => i+1);
        setTasks((task) =>([...task, {title: value, id: id, status: status, edit: edit}]));
        setValue('');
      }

      const onValue = (e) => {
        setValue(e.target.value)
      }

      const deleteTask = (id) => {
        setTasks(tasks.filter((task) => {
          return task.id !== id
        }))
      }

      const doneTask = (id) => {
       let task = tasks.filter((task) => {
          return task.id == id
        })

        task.forEach(item=> {
          setStatus(item.status = !item.status) 
        });
      }

      const editTask = (id, e) => {
        let task = tasks.filter((task) => {
          return task.id == id
        })

        task.forEach(item=> {
          setEdit(item.edit = !item.edit) 
        });
      }
      
      return (
        <section className='todo'>
          <Form  addTask = {addTask} value = {value} onValue = {onValue}/>
          <TaskList tasks ={tasks} onDelete = {deleteTask} doneTask = {doneTask} editTask = {editTask} value = {value} onValue = {onValue}/>
        </section>
      ) 
      
    }


    function Form({addTask, value, onValue}) {
      const handleClickButton = () => {
        addTask();
      }

      return (
        <div className="forma-box">
          <input type="text" placeholder="новая задача" value = {value} onChange = {onValue}></input>
          <button onClick = {handleClickButton}>добавить</button>
        </div>
      )
    }

    function TaskList ({tasks, onDelete, doneTask, editTask, value, onValue}){

      const taskEl = tasks.map((task) => (
          <TasksElement
            task = {task}
            text = {task.title}
            key = {task.id}
            id = {task.id}
            status = {task.status}
            edit = {task.edit}
            onDelete = {onDelete}
            doneTask = {doneTask}
            editTask = {editTask}
            value = {value}
            onValue = {onValue}
          />  
      ))

      return(
        <ul>
          {taskEl}
        </ul>
      )
    }
    
    function TasksElement({ task, text, id, onDelete, doneTask, status, edit, editTask}){
      const [valueEdit, setValueEdit] = React.useState('')

      const handleClickDel = () => {
        onDelete(id)
      }
      const handleClickDone = () => {
        doneTask(id)
      }

      const handleClickEdit = () => {
        editTask(id)
        task.title = valueEdit;
      }
      
      return (
        <li key = {id} className = {`todo ${status ? 'done':''}`}>
          {edit ? <input value = {valueEdit} onChange = {(e) => setValueEdit(e.target.value)}></input>: <span>{text}</span>}
          <button onClick={handleClickEdit}>редактировать</button>
          <button onClick={handleClickDone}>сделано</button>
          <button onClick = {handleClickDel}>удалить</button>
        </li>
      )
    }
