import React, { act } from 'react';
import { Link } from 'react-router-dom/';

function PaginationItem({ data, action }) {
	return (
		<li className={`mt-0 mb-0 m-1 page-item ${data.active && 'active'}`}>
			<Link
				className="page-link"
				to={`/articles/number/${data.i}/`}
				data-number={data.i}
				aria-label="Previous"
				onClick={(e) => {
					let number = data.i;
					action((data) => {
						return {
							...data,
							offset: data.limit * number,
						};
					});
				}}
			>
				<span aria-hidden="true">{data.i}</span>
			</Link>
		</li>
	);
}

export default function Pagination({ props, action }) {
	const { count, active } = props;

	let size = 5,
		start,
		finish,
		paginationList = [];
	if (size + active < count) {
		start = active;
		finish = size + active;
	} else {
		start = count - size + 1;
		finish = count + 1;
	}
	for (let i = start; i < finish; i++) {
		paginationList.push(<PaginationItem key={i} data={{ i, active: active == i }} action={action} />);
	}
	return (
		<nav aria-label="Articles navigation" className="mt-3">
			<ul className="pagination justify-content-center mb-0">
				<li className={`page-item ${active == 1 && 'disabled'}`}>
					<Link
						className="page-link"
						to={`/articles/number/${active != 1 ? active - 1 : 1}/`}
						aria-label="Previous"
						onClick={() =>
							action((data) => {
								return { ...data, offset: 0 };
							})
						}
					>
						<span aria-hidden="true">&laquo;</span>
					</Link>
				</li>
				{paginationList}
				<li className={`page-item ${active == count && 'disabled'}`}>
					<Link
						className="page-link"
						to={`/articles/number/${active != count ? active + 1 : active}/`}
						aria-label="Next"
						onClick={() =>
							action((data) => {
								return { ...data, offset: data.offset + data.limit };
							})
						}
					>
						<span aria-hidden="true">&raquo;</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
}
