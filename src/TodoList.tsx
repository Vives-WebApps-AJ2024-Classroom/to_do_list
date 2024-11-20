import {Key, useEffect, useState} from "react";
import TodoItem from "./TodoItem";
import Popup from "./popup";

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

    const [text, setText] = useState("");
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function addTask(text: string) {
        const newTask = {
            id: Date.now(),
            text,
            completed: false
        }
        setTasks([...tasks, newTask]);
        setText("");
    }

    function deleteTask(id: any) {
        setTasks(tasks.filter((task: { id: any; }) => task.id !== id))
    }

    function toggleCompleted(id: any) {
        setTasks(tasks.map((task: { id: any; completed: any; }) => {
            if (task.id === id) {
                return {...task, completed: !task.completed};
            } else {
                return task;
            }
        }));
    }

    function handleAddButtonClick() {
        setIsPopupVisible(true);
    }

    function handlePopupSubmit() {
        addTask(text);
        setIsPopupVisible(false);
    }

    return (
        <div className="todo-list">
            <h1>To do-list</h1>
            {tasks.map((task: { id: Key | null | undefined; }) => (
                <TodoItem key={task.id} task={task} deleteTask={deleteTask} toggleCompleted={toggleCompleted}/>
            ))}
            <button onClick={handleAddButtonClick}>Add</button>
            {isPopupVisible && (
                <Popup
                    text={text}
                    setText={setText}
                    onSubmit={handlePopupSubmit}
                    onCancel={() => setIsPopupVisible(false)}
                />
            )}
        </div>
    );
}

export default TodoList;