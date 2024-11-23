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

    return (
        <div className="todo-list">
            <h1>To do-list</h1>
            {tasks.map(task => (
                    <div className="task" key={task.id}>
                        <p>{task.text}</p>
                        <button onClick={() => deleteTask(task.id)}>X</button>
                    </div>
                )
            )}
        </div>
    );
}

export default TodoList;