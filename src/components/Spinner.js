import React from "react"
import spinnerImg from './../assets/images/spinner.png'
import './Spinner.css'

function Spinner() {
  return (
    <div className="Spinner" >
      <img className="Spinner__img" src={spinnerImg} alt="loading spinner" />
      <p className="Spinner__text">Loading...</p>
    </div>
  )
}

export default Spinner