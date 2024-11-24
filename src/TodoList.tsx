import {Key, useEffect, useState} from "react";

function TodoList() {
    const defaultTasks = [
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
    ];

    const [tasks, setTasks] = useState(() => {
        // Load tasks from localStorage
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks && JSON.parse(savedTasks).length > 0 ? JSON.parse(savedTasks) : defaultTasks;
    });
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function deleteTask(id: number): void {
        setTasks(tasks.filter((filterTask:{id:any}) => filterTask.id !== id));
    }

    function checkboxChangedStatus(id: number): void {
        setTasks(tasks.map((mappedTask: { id: number; completed: any; }) => {
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
        };
        setTasks([...tasks, newTask]);
    }

    return (
        <div className="todo-list">
            <h1>To do-list</h1>
            {tasks.map((mappedTask: { id: any; completed: boolean; text: string; }) => (
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

function TodoItem(
    {task, checkboxChangedStatus, deleteTask}: {
        task: { id: number; completed: boolean; text: string };
        checkboxChangedStatus: () => void;
        deleteTask: () => void;
    }
) {
    return (
        <div className={`task ${task.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={checkboxChangedStatus}
            />
            <p>{task.text}</p>
            <button onClick={deleteTask}>X</button>
        </div>
    );
}

function TodoPopup(
    {addTask, setIsPopupVisible}: {
        addTask: (text: string) => void;
        setIsPopupVisible: (value: boolean) => void;
    }
) {
    const [popupText, setPopupText] = useState("");

    return (
        <div className="popup">
            <input
                value={popupText}
                onChange={(e) => setPopupText(e.target.value)}
            />
            <button onClick={() => {
                if (popupText.trim() === "") {
                    alert("Task cannot be empty!");
                    return;
                }
                addTask(popupText);
                setPopupText("");
                setIsPopupVisible(false);
            }}>Add Task
            </button>
            <button onClick={() => setIsPopupVisible(false)}>Cancel Adding</button>
        </div>
    );
}

export default TodoList;