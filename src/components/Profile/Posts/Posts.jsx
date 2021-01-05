import React from 'react';
import style from './Posts.module.css'
import Post from "./Post/Post";
import PostFormComponent from "./PostForm/PostForm";




let Posts = (props) => {
    let postsArray = props.state.posts.map(el => <Post text={el.text} likeCount={el.likeCount}/>)

    let addPost = (value) => {
       props.onAddPost(value.addPost)
    };

    let onSubmit = (value) => {
        addPost(value)
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

export default Posts;