import React from "react";
import Pagination from 'react-bootstrap/Pagination';

import Article from "../Item";

export default function List() {
    return (
        <div className="col-md-9 m-auto pt-2 pb-5">
            Article List
            <Article />
            <Article />
            <nav className="pt-5" aria-label="Navigation">
                <ul class="pagination justify-content-center">
                    <li class="page-item disabled">
                    <a class="page-link">&laquo;</a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">&raquo;</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}