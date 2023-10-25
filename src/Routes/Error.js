import React from 'react'
import ErrorImg from '../images/error.jpg'

const Error = () => {
  return (
    <div>
        <img src={ErrorImg} alt="Error 404" style={{width:'100vw',height:'100vh',overflow:'hidden'}}/>
    </div>
  )
}

export default Error
