// @ts-ignore
function popup({text, setText, onSubmit, onCancel}) {
    return(
        <div className="popup">
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={onSubmit}>Add</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    )
}

export default popup;