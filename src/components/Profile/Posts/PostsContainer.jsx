import React from 'react';
import Posts from "./Posts";
import {
    onAddPost,
} from "../../../redux/profilePage-reducer";
import {connect} from "react-redux";



// let PostsContainer = (props) => {
//     let state = props.store.getState().profilePage;
//
//     let onAddPost = () => {
//         props.store.dispatch(addPostActionCreater());
//     };
//
//     let onChangeTextarea = (text) => {
//         props.store.dispatch(updateNewPostTextActionCreater(text));
//     };
//
//     return(
//         <Posts onAddPost={onAddPost} onChangeTextarea={onChangeTextarea} state={state}/>
//     )
// };

const mapStateToProps = (state) => {
    return {
        state: state.profilePage,
    }
};

const mapDispatchToProps =  {
        onAddPost,
}

const PostsContainer = connect(mapStateToProps, mapDispatchToProps )(Posts);

export default PostsContainer;