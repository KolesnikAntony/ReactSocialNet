import React from 'react';
import style from './Posts.module.css'
import Post from "./Post/Post";
import PostFormComponent from "./PostForm/PostForm";
import {onAddPost} from "../../../redux/profilePage-reducer";
import {connect} from "react-redux";
import {requestPosts} from "../../../redux/selectors";




let Posts = ({posts,onAddPost}) => {
    let postsArray = posts.map(el => <Post key={el.id} text={el.text} likeCount={el.likeCount}/>)


    let onSubmit = value => {
        onAddPost(value.postBody)
    };

    return(
        <div className={style.postsWrap}>
            <h3 className={style.title}>Мои посты</h3>
            <PostFormComponent onSubmit={onSubmit}/>
            <ul className={style.list}>
                {postsArray}
            </ul>
        </div>
    )
}


const mapStateToProps = state => ({
    posts: requestPosts(state)
});


const PostsContainer = connect(mapStateToProps, {onAddPost})(Posts);
export default PostsContainer;