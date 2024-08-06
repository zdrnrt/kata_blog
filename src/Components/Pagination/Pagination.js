import React, { act } from "react";
import { Link } from "react-router-dom/";

function PaginationItem({data}){
    return (
        <li className={ `mt-0 mb-0 m-1 page-item ${data.active && 'active'}`} >
            <Link className="page-link" to={`/articles?number=${data.i}`} aria-label="Previous">
                <span aria-hidden="true">{data.i}</span>
            </Link>
        </li>
    )
}

export default function Pagination ({props}){
    const {count, active} = props;

    let size = 5, start, finish, paginationList = [];
    if (size + active < count) {
        start = active;
        finish = size + active;
    } else {
        start = count - size + 1;
        finish = count + 1;
    }
    for (let i = start; i < finish; i++){
        paginationList.push(<PaginationItem key={i} data={{i, active: (active == i)}} />)
    }
    return (
		<nav aria-label="Articles navigation" className="mt-3">
			<ul className="pagination justify-content-center mb-0">
                <li className={`page-item ${active == 1 && 'disabled'}`}>
                    <Link className="page-link" to="/" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </Link>
                </li>
				{paginationList}
                <li className={`page-item ${active == count && 'disabled'}`}>
                    <Link className="page-link" to={`/articles?number=${ active != count ? active + 1 : active}`} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </Link>
                </li>
			</ul>
		</nav>
	);
}