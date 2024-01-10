import React from 'react'
import './thing.css'
import { Link } from 'react-router-dom'

const thing = () => {
  return (
    <>
      <div className='title'>Add Thing</div>
      <div className='select-container'>
        <Link to='/add-thing/manual'>
          MANUAL
        </Link>
      </div>
      <div className='select-container'>
        <Link to='/add-thing/autoscan'>
          AUTO
        </Link>
      </div>
    </>
  )
}

export default thing