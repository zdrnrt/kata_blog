import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Markdown from 'react-markdown';

import Context from '../Context/Context';
import './Article.scss';

export default function Article(el) {
	const user = useContext(Context);
	// console.log(user);
	console.log(el);
	const { data, single } = el;
	console.log('article', data, single);
	let tags = data.tagList.map((el, i) => (
		<span key={i} className="tags__item rounded-1">
			{el}
		</span>
	));
	return (
		<article className="article p-4 bg-body">
			<header className="row">
				<div className="col-md-8">
					<div className="article__title d-inline-flex justify-content-start align-items-center flex-grow-1">
						<h2 className="m-0">
							<Link to={`/articles/${data.slug}`} className="article__link">
								{data.title}
							</Link>
						</h2>
						<button
							type="button"
							className={
								data.favorited
									? 'btn flex-shrink-0 article__favorite favorite favorite--active'
									: 'btn flex-shrink-0 article__favorite favorite'
							}
							disabled={user.profile ? false : true}
						>
							<svg
								className="favorite__icon"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M8 2.56911C7.26154 1.33835 6.03077 0.476807 4.55385 0.476807C2.46154 0.476807 0.861542 2.07681 0.861542 4.16911C0.861542 8.23065 3.07693 8.84604 8 13.523C12.9231 8.84604 15.1385 8.23065 15.1385 4.16911C15.1385 2.07681 13.5385 0.476807 11.4462 0.476807C9.96923 0.476807 8.73846 1.33835 8 2.56911Z" />
							</svg>
							{data.favoritesCount}
						</button>
					</div>
					<div className="article__tags tags">{tags}</div>
				</div>
				<div className="col-md-4 author d-inline-flex justify-content-end align-items-center">
					<div>
						<div className="author__name">{data.author.username}</div>
						<div className="author__date">{format(data.createdAt, 'MMM ee, yyyy')}</div>
					</div>
					<img src={data.author.image} className="author__pic" />
				</div>
			</header>
			<div className="row">
				<div className="col-md-8 article__content">
					<p>{data.description}</p>
				</div>
				{!!user.profile && single && (
					<div className="col-md-4 text-end article__controls">
						<button className="btn btn-outline-danger">Delete</button>
						<Link to={`/articles/${data.slug}/edit`} className="btn btn-outline-success">
							Edit
						</Link>
					</div>
				)}
				{single && (
					<div className="col-md-12">
						<Markdown>{data.body}</Markdown>
					</div>
				)}
			</div>
		</article>
	);
}
