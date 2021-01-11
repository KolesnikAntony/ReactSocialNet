import React , {useState, useEffect} from "react";
import style from './ProfileInfo.module.css'

const ProfileStatus = props => {

    const [editStatus, setEditStatus] = useState(false);
    const [status, setStatus] = useState(props.status);
    const [statusPrompt, setStatusPrompt] = useState(false);

    useEffect(()=> {
        setStatus(props.status);
    },[props.status])

    let activateStatusEditor = () => {
        setEditStatus(true);
    };

    let deactivateStatusEditor = () => {
        setEditStatus(false);
        setStatusPrompt(false);
        props.updateProfileStatus(status);
    };

    let onChangeStatus = e => {
        setStatus(e.target.value);
    };

    const onKeyEnter = e => {
        if(e.keyCode === 13) deactivateStatusEditor();
    };

    const showStatusPrompt = () => {
        setStatusPrompt(true);
    };

    const hideStatusPrompt = () => {
        setStatusPrompt(false);
    };

    return <div className={style.statusHolder}>
        <b>Status: </b>
        {editStatus
            ? <input className={style.status}
                     onChange={onChangeStatus} autoFocus={true} onBlur={deactivateStatusEditor}
                     onKeyUp={(e)=> onKeyEnter(e)}
                     type="text"
                     value={status}/>
            : <span
                onDoubleClick={activateStatusEditor}
                onMouseLeave={hideStatusPrompt}
                onMouseEnter={showStatusPrompt}
            >{props.status ? props.status : 'Write your status...'}</span>}
        <p className={style.prompt + ' '+ (statusPrompt && !editStatus &&  style.showPrompt)}>on duble click for change status</p>
    </div>


}

export default ProfileStatus;