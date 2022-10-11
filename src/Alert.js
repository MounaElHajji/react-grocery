import React, {useEffect} from 'react'

const Alert = ({alertProp, removeAlert, list}) => {
  useEffect(()=> {
    const timeout = setTimeout(() => {
      removeAlert()
    }, 3000)
    return () => clearTimeout(timeout)
  }, [list]) //when something changes in the list, we clear out the old timeout and we set up a new one 
 
  const {msg, type} = alertProp;
  return (
    <div className={`alert alert-${type}`}>{msg}</div>
  )
}


export default Alert