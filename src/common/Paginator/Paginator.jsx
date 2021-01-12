import React, {useState} from 'react'
import style from "../../components/Users/Users.module.css";


const Paginator = ({totalUsers, pageSize, portionSize, currentPage,showCurrentUsers}) => {
    let totalPage = Math.ceil(totalUsers / pageSize);
    let pages = [];
    for(let i=1; i<totalPage; i++){
        pages.push(i)
    }

    let portionCount = Math.ceil(totalPage/ portionSize );
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1 ) * portionSize + 1;
    let rightPortionPageNumber =  portionSize * portionNumber;

    const portionFlow = (portionCurrentNumber,currentPageOfPortion) => {
        setPortionNumber(portionCurrentNumber);
        showCurrentUsers(currentPageOfPortion);
    };

    const nextPortion = (portionNumber, portionSize) => {
        let portionCurrentNumber = portionNumber + 1;
        let currentPageOfPortion = (portionCurrentNumber - 1) * portionSize+ + 1;
        portionFlow(portionCurrentNumber, currentPageOfPortion)

    };

    const prevPortion = (portionNumber,portionSize) => {
        let portionCurrentNumber = portionNumber - 1;
        let currentPageOfPortion = portionCurrentNumber * portionSize;
        portionFlow(portionCurrentNumber, currentPageOfPortion);
    };

    return <div>
        <button onClick={() => prevPortion(portionNumber,portionSize)} disabled={portionNumber <= 1}>prev</button>
        <div className={style.pagination}>
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => <span  key={p} onClick={()=> showCurrentUsers(p)} className={(p === currentPage)  && style.selectedPage}>{p}</span>)}
        </div>
        <button onClick={() => nextPortion(portionNumber,portionSize)} disabled={portionCount <= portionNumber}>next</button>
    </div>
};




export default Paginator;