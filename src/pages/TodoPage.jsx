import { Footer, Header, TodoCollection, TodoInput } from 'components';

import { useState } from 'react';

const dummyTodos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1,
    isDelete: false,
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2,
    isDelete: false,
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3,
    isDelete: false,
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4,
    isDelete: false,
  },
];

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState(dummyTodos);

  function handleChange(value) {
    setInputValue(value);
  }

  const handleAddTodo = () => {
    if (inputValue.length === 0) {
      return;
    }
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: Math.random() * 100,
          title: inputValue,
          isDone: false,
          isDelete: false,
        },
      ];
    });
    setInputValue('');
  };

  function handleToggleDone(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone };
        } else {
          return todo;
        }
      }),
    );
  }

  function handleItemChange({ id, isEdit }) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isEdit: isEdit };
        } else {
          return { ...todo, isEdit: false };
        }
      }),
    );
  }

  function handleOnSave(id, inputRef) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title: inputRef, isEdit: false };
        } else {
          return todo;
        }
      }),
    );
  }

  function handleDelete(id) {
    const newTodo = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDelete: true };
      } else {
        return todo;
      }
    });
    console.log('newTodo', newTodo);
    setTodos(newTodo);
  }

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDone={handleAddTodo}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onChangeMode={handleItemChange}
        onSave={handleOnSave}
        onDelete={handleDelete}
      />
      <Footer todos={todos} />
    </div>
  );
};

export default TodoPage;
