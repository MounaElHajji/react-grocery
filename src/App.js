import './App.css';
import { useState } from 'react';
import List from './List';
import Alert from './Alert';

function App() {
  const [input, setInput] = useState(''); //the input that the user will enter
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({show:false, msg:'', type:''})

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!input)
    {
      showAlert(true, 'danger', 'Please enter a value')
    }
    else if(input && isEditing)
    {
      setList(
        list.map((item) => {
          if(item.id === editID){
            return {...item, title: input} //title: input is the one that will change the title of the item
          }
          return item;
        })
      )
      setInput('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'item changed')
    }
    else 
    {
      //Add a new item
      showAlert(true, 'success', 'Item Added Successfully')
      const newItem = {id: new Date().getTime().toString(), title:input}
      setList([...list, newItem]);
      setInput(''); //cleat the input

    }
  }

  const showAlert = (show=false, type="", msg="") => {
    setAlert({show,type, msg})
  }

  const clearList= () => {
    showAlert(true, 'danger', 'empty list');
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed ')
    setList(list.filter((item) => item.id !== id)) 
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id); //return the item where the id in the edit method is equal to the id of the item.
    setIsEditing(true);
    setEditID(id) //we set the id because we will need it
    setInput(specificItem.title) //give the input the value os this item.
  }

  return (
    <section className='section-center'>
        <form className="grocery-form" onSubmit={handleSubmit}>
            {alert.show && <Alert alertProp={alert} removeAlert={showAlert} 
            list={list}
            />}
            <h3>Grocery Bud</h3>
            <div className="form-control">
              <input type="text" className='grocery' placeholder="e. g. eggs"
               value={input} onChange={(e) => setInput(e.target.value)} />
              <button type="submit" className="submit-btn" >
                { isEditing ? 'edit' : 'submit' }
              </button>
            </div>
        </form>

        {list.length > 0 && (<div className="grocery-container">
           <List items={list} removeItemfunc={removeItem} editItemfunc={editItem}/>
           <button className='clear-btn' onClick={clearList}>Clear Items</button>
        </div>)}
    </section>
  );
}

export default App;
