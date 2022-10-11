import React from 'react'
import {FaEdit, FaTrash} from 'react-icons/fa'

const List = ({items, removeItemfunc, editItemfunc}) => {
  return (
    <div className="grocery-list">
        {items.map((item) => {
            const {id, title} = item; //define the id and the title because we're going to need them
            return <article key={id} className="grocery-item">
                        <p className='title'>{title}</p>

                        <div className="btn-container">
                            <button onClick={() => editItemfunc(id)} type="button" className='edit-btn'>
                                <FaEdit />
                            </button>
                            <button onClick={() => removeItemfunc(id)} type="button" className='delete-btn'>
                                <FaTrash />
                            </button>
                        </div>
                    </article>
        })}
    </div>
  )
}


export default List