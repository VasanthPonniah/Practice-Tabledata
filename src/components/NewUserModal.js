import React, { Fragment } from 'react'
import { createPortal } from 'react-dom'
import classes from './NewUserModal.module.css'
import NewUser from './NewUser';

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClose} />
}

const NewUserOverlay = props => {
    return (
        <div className={classes.modal}>
            <NewUser className={classes.content} onClose={props.onClose} onAdd={props.onAdd} />
        </div>

    )
}
const NewUserModal = (props) => {
    return (
        <Fragment>
            {createPortal(<Backdrop onClose={props.onClose} />, document.getElementById("backdrop"))}
            {createPortal(<NewUserOverlay onClose={props.onClose} onAdd={props.onAdd} />, document.getElementById("overlay"))}
        </Fragment>
    )
}

export default NewUserModal