import { useRef, useState } from "react";
import { connect } from "react-redux";
import "./App.css";

function App(props) {
  const { todos } = props;
  const [value, setValue] = useState("");
  const ref = useRef(null);

  const addTodos = () => {
    props.addTodo({ content: value });
    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyUp = (e) => {
    console.log(e.key);
    if (e.key === "Enter") addTodos();
  };

  return (
    <div className="todos">
      <div className="todo-input-wrapper">
        <input
          className="todo-input"
          ref={ref}
          value={value}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
        <button className="todo-submit" onClick={addTodos}>
          add todos
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li className="todo" key={Math.random() * 10e12}>
            {todo.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default connect(
  (state) => ({ todos: state.todos }),
  (dispatch) => ({
    addTodo: (todo) => dispatch({ type: "ADD_TODO", payload: todo }),
  })
)(App);
