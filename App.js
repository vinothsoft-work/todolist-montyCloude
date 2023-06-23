import React, { useState, useEffect, createRef, useRef, } from 'react';
import './style.css';
import './todosStyles.css';
import PreLoader from './preLoader';       

export default function App() {
  const [newItem, setNewItem] = useState();
  const [todosList, setTodosList] = useState([]);                     
  const [loader, setLoader] = useState(false);
  const [addButton, setAddButton] = useState(true);
  const inputVal = createRef(); 
  const getTextVal = (e) => {
    let item = e.target.value;
    if(item.length === 0) {
      setAddButton(true);
    }
    else {
      setAddButton(false);
    }
    setNewItem(item);
  };
  const handleClickTodos = () => {
    setLoader(true);
    todosList.push({
      id: Math.random(),
      title: newItem,
    });
    console.log(todosList);
    setTodosList(todosList);
    inputVal.current.value = '';
    setTimeout(() => {
      setLoader(false);
    }, 300);
  };
  const deleteItem = (itemId) => {
    setLoader(true);
    const deleteItem = todosList.filter((item) => item.id !== itemId);
    setTodosList(deleteItem);
    setTimeout(() => {
      setLoader(false);
    }, 300);
  };

  return (
    <div className='todoWrapperMain'>
      {loader && <PreLoader  message={'Loading..'}/> }
      <header>
        <h6>Admin </h6>
        <button>Logout</button>
      </header>
      <div className="todoWrapper">
        <div className="todosInnerWrapper">
          <div className="todosInnerWrappercenrwer">
            <div className="todoHeader">
              <h6>Todos ({todosList.length}) </h6>
            </div>
          <div className="todoListText">
            <input ref={inputVal} type="text" placeholder="Enter Code Here!" onChange={getTextVal} />
            <button className={addButton ? 'todoListTextDisable' : '' } onClick={handleClickTodos}> Submit </button>
          </div>
          <div className="todoList">
            {todosList.length > 0 ? (
              todosList.map((item, index) => {
                return (
                  <div className="todosListItems" key={item.id}>
                    <h6> {item.title} </h6>
                    <div className="listAction">
                      <button className="edit" title="Edit" >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        className="delete"
                        onClick={() => deleteItem(item.id)}
                      >
                        <i className="fa fa-trash" title="Delete"></i>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="todosNotExisted">
                <h4> No Data Exists! </h4>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
