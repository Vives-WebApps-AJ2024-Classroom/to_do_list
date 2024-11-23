import {useState} from "react";

function TodoList() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: "Studeren Web Apps",
            completed: true
        },
        {
            id: 2,
            text: "Taak regeltechnieken",
            completed: false
        }
    ])

    function deleteTask(id: number) {
        setTasks(tasks.filter((filterTask) => filterTask.id !== id))
    }

    function checkboxChangedStatus(id: number) {
        setTasks(tasks.map(mappedTask => {
            if(mappedTask.id === id) {
                return {...mappedTask, completed: !mappedTask.completed};
            } else {
                return mappedTask;
            }
        }));
    }

    return (
        <div className="todo-list">
            <h1>To do-list</h1>
                {tasks.map(task => (
                        <div className={`task ${task.completed ? 'completed' : ''}`} key={task.id}>
                            <input type="checkbox" checked={task.completed}
                                   onChange={() => checkboxChangedStatus(task.id)}/>
                            <p>{task.text}</p>
                            <button onClick={() => deleteTask(task.id)}>X</button>
                        </div>
                    )
                )}
            </div>
            );
            }

            export default TodoList;