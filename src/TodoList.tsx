import {useState} from "react";
import {text} from "node:stream/consumers";

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

    const [popupText, setPopupText] = useState("");
    const [isPopupVisible, setIsPopupVisible] = useState(false);

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

    function addTask(text:string) {
        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        }
        setTasks([...tasks, newTask]);
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
            <button onClick={() => setIsPopupVisible(true)}>Add</button>
            {isPopupVisible && (
                <div className="popup">
                    <input value={popupText} onChange={(e) => setPopupText(e.target.value)}/>
                    <button onClick={()=>{addTask(popupText); setIsPopupVisible(false); setPopupText("");}}>Add</button>
                    <button onClick={() => setIsPopupVisible(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default TodoList;