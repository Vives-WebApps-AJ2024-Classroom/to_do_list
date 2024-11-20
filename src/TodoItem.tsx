// @ts-ignore
function TodoItem ({ task, deleteTask, toggleCompleted }) {
    function handelChange() {
        toggleCompleted(task.id);
    }

    return (
        <div className={`todo-item ${task.completed ? "completed" : ""}`}>
            <input type="checkbox" checked={task.completed} onChange={handelChange} />
            <p>{task.text}</p>
            <button onClick={()=>deleteTask(task.id)}>X</button>
        </div>
    );
}

export default TodoItem;