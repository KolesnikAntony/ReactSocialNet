import React from "react";

class ProfileStatus extends React.Component {
    state = {
        editStatus: false,
        status: this.props.status
    }
    acitvateStatusEditor = () => {
        this.setState(
            {editStatus: true}
        )
    }
    deacitvateStatusEditor = () => {
        this.setState(
            {editStatus: false}
        );
        this.props.updateProfileStatus(this.state.status);
    }
    onChangeStatus = e => {
        this.setState({
            status: e.currentTarget.value,
        });
    };
componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.status != this.props.status) {
        this.setState({
            status: this.props.status,
        })
    }
}

    render() {
        return <div>
            {this.state.editStatus
            ? <input onChange={this.onChangeStatus} autoFocus={true} onBlur={this.deacitvateStatusEditor} type="text" value={this.state.status}/>
            :<span onDoubleClick={this.acitvateStatusEditor}>{this.props.status? this.props.status: '---------' }</span>}
        </div>

    }
}

export default ProfileStatus;