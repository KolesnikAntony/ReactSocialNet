import React , {useState, useEffect} from "react";

const ProfileStatusHooks = props => {

    const [editStatus, setEditStatus] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(()=> {
        setStatus(props.status);
    },[props.status])

    let acitvateStatusEditor = () => {
        setEditStatus(true);
    }
    let deacitvateStatusEditor = () => {
        setEditStatus(false);
        props.updateProfileStatus(status);
    }
    let onChangeStatus = e => {
        setStatus(e.target.value);
    };


    return <div>
        {editStatus
            ? <input onChange={onChangeStatus} autoFocus={true} onBlur={deacitvateStatusEditor} type="text"
                     value={status}/>
            : <span
                onDoubleClick={acitvateStatusEditor}>{props.status ? props.status : '---------'}</span>}
    </div>


}

export default ProfileStatusHooks;