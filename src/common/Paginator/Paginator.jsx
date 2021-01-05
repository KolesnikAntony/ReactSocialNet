import React, {useState} from 'react'
import style from "../../components/Users/Users.module.css";


const Paginator = (props) => {
    let totalPage = Math.ceil(props.totalUsers / props.pageSize);
    let pages = [];
    for(let i=1; i<totalPage; i++){
        pages.push(i)
    };

    let portionCount = Math.ceil(totalPage/ props.portionSize );
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1 ) * props.portionSize + 1;
    let rightPortionPageNumber =  props.portionSize * portionNumber;

    return <div>
        <button onClick={() => setPortionNumber(portionNumber -1)} disabled={portionNumber <= 1}>prev</button>
        <div className={style.pagination}>
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => <span onClick={()=> props.showCurrentUsers(p)} className={props.currentPage === p && style.selectedPage}>{p}</span>)}
        </div>
        <button onClick={()=>setPortionNumber(portionNumber + 1)} disabled={portionCount <= portionNumber}>next</button>
    </div>
};




export default Paginator;