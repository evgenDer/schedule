export const hz = '';

// import React, { useState, useEffect } from 'react';
// import ToDoForm from '../components/ToDoForm';
// import ToDoList from '../components/ToDoList';
// import { IToDo } from '../interfaces';

// declare var confirm: (question: string) => boolean; // это на тот случай, если TS ругается на обращение к глобальным методам.

// const TodosPage: React.FC = () => {
//   const [todos, setTodos] = useState<IToDo[]>([]);

//   useEffect(() => { // вызывается один раз, после построения дом-дерева.
//     const saved = JSON.parse(localStorage.getItem('todos') || '[]') as IToDo[];
//     console.log(saved, localStorage.getItem('todos'), JSON.parse(localStorage.getItem('todos') || '[]'));
//     setTodos(saved);
//   }, []); // оставляем  пустым массив, для выполнения описанного выше.

//   useEffect(() => {
//     localStorage.setItem('todos', JSON.stringify(todos));
//   }, [todos]) // передаем Стейт Тодос и useEffect будет следить, если стейт будет изменен, то выполнится коллбек функция.

//   const handleAdd = (title: string) => {
//     console.log('Add new todo:', title);
//     const newTodo: IToDo = {
//       title: title,
//       id: Date.now(),
//       completed: false,
//     }
//     // setTodos([newTodo, ...todos]); перетирает стейт
//     setTodos((prev) => [newTodo, ...prev]); // оставляет предидущий стейт. Так правильно!
//   }

//   const handleToggle = (id: number) => {
//     setTodos((prev) => {
//       return prev.map(todo => {
//         if (todo.id === id) {
//           todo.completed = !todo.completed;
//         }
//         return todo;
//       });
//     });
//   }

//   const handleRemove = (id: number) => {
//     // const shoudRemove = window.confirm('Вы уверены что хотите удалить элемент?'); // Крутой сопсоб получить true/false от ответа пользователя
//     const shoudRemove = confirm('Вы уверены что хотите удалить элемент?');
//     if (shoudRemove) {
//       setTodos((prev) => prev.filter((todo) => todo.id !== id));
//     }
//   }

//   return (
//     <>
//       <ToDoForm onAdd={handleAdd} />
//       <ToDoList 
//         todos={todos} 
//         onToggle={handleToggle}
//         onRemove={handleRemove}
//       />
//     </>
//   );
// }

// export default TodosPage;
