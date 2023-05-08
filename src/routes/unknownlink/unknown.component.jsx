import React from 'react'
import "./unknown.component.scss"
import image404 from "../../assets/welcome/undraw_Page.png"
export default function Unknown() {
  return (
    <div className='unknown-page'>
        <div className="general-header d-flex">
            <h3 className='logo-title-general m-5'>Kochen.</h3>
        </div>
        <div className="info-message-general">
            <div className="image-message-general">
                <img src={image404} alt="" />
            </div>
        </div>
    </div>
  )
}
