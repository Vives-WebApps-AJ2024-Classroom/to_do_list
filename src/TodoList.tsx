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

    const [isPopupVisible, setIsPopupVisible] = useState(false);

    function deleteTask(id: number): void {
        setTasks(tasks.filter((filterTask) => filterTask.id !== id))
    }

    function checkboxChangedStatus(id: number): void {
        setTasks(tasks.map(mappedTask => {
            if (mappedTask.id === id) {
                return {...mappedTask, completed: !mappedTask.completed};
            } else {
                return mappedTask;
            }
        }));
    }

    function addTask(text: string): void {
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
            {tasks.map(mappedTask => (
                <TodoItem
                    key={mappedTask.id}
                    task={mappedTask}
                    checkboxChangedStatus={() => checkboxChangedStatus(mappedTask.id)}
                    deleteTask={() => deleteTask(mappedTask.id)}
                />
            ))}
            <button onClick={() => setIsPopupVisible(true)}>Add</button>
            {isPopupVisible && (
                <TodoPopup addTask={addTask} setIsPopupVisible={setIsPopupVisible}/>
            )}
        </div>
    );
}

function TodoItem({task, checkboxChangedStatus, deleteTask}
                      : {
    task: { id: number; completed: boolean; text: string };
    checkboxChangedStatus: (id: number) => void;
    deleteTask: (id: number) => void
}) {
    return (
        <div className={`task ${task.completed ? 'completed' : ''}`} key={task.id}>
            <input type="checkbox" checked={task.completed}
                   onChange={() => checkboxChangedStatus(task.id)}/>
            <p>{task.text}</p>
            <button onClick={() => deleteTask(task.id)}>X</button>
        </div>
    )
}

function TodoPopup({addTask, setIsPopupVisible}: {
    addTask: (text: string) => void;
    setIsPopupVisible: (value: boolean) => void
}) {
    const [popupText, setPopupText] = useState("");

    return (
        <div className="popup">
            <input value={popupText} onChange={(e) => setPopupText(e.target.value)}/>
            <button onClick={() => {
                addTask(popupText);
                setIsPopupVisible(false);
                setPopupText("");
            }}>Add
            </button>
            <button onClick={() => setIsPopupVisible(false)}>Cancel</button>
        </div>
    )
}

export default TodoList;