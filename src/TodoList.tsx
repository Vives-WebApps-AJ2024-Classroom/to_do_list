import {useState} from "react";
import TodoItem from "./TodoItem";
import Popup from "./popup";

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

    const [text, setText] = useState("");
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    function addTask(text:string) {
        const newTask = {
            id: Date.now(),
            text,
            completed: false
        }
        setTasks([...tasks, newTask]);
        setText("");
    }

    function deleteTask(id:any){
        setTasks(tasks.filter((task) => task.id !== id))
    }

    function toggleCompleted(id:any) {
        setTasks(tasks.map(task => {
            if(task.id === id) {
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
            {tasks.map(task => (
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