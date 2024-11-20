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

    return (
        <div className="todo-list">
            <h1>To do-list</h1>
            {tasks.map(task => (
                <p>{task.text}</p>
            ))}
        </div>
    );
}

export default TodoList;