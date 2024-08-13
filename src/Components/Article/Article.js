import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { format } from 'date-fns';
import Markdown from 'react-markdown';
import { Popover } from 'antd';

import * as API from '../API';
import Context from '../Context/Context';
import './Article.scss';

export default function Article(el) {
	const { user } = useContext(Context);
	const { data, single } = el;
	let tags = data.tagList.map((el, i) => (
		<span key={i} className="tags__item rounded-1">
			{el}
		</span>
	));
	function removeArticle() {
		console.log('remove');
		return API.deleteArticle({ token: user.token, slug: data.slug }).then((response) => {
			console.log(response);
			location.href = '/';
		});
	}
	const [open, setOpen] = useState(false);
	const hide = () => {
		setOpen(false);
	};
	const handleOpenChange = (newOpen) => {
		setOpen(newOpen);
	};
	const removePopover = (
		<div>
			<p>Are you sure to delete this article?</p>
			<div className="text-end">
				<button className="btn btn-outline-dark m-3 mt-0 mb-0" onClick={hide}>
					No
				</button>
				<button className="btn btn-primary" onClick={removeArticle}>
					Yes
				</button>
			</div>
		</div>
	);
	return (
		<article className="article p-4 bg-body">
			<header className="row align-items-start">
				<div className="col-md-9">
					<div className="article__title d-inline-flex justify-content-start align-items-center flex-grow-1">
						<h2 className="m-0">
							{!single ? (
								<Link to={`/articles/${data.slug}`} className="article__link">
									{data.title}
								</Link>
							) : (
								data.title
							)}
						</h2>
						<span
							className={
								data.favorited
									? 'flex-shrink-0 article__favorite favorite favorite--active'
									: 'flex-shrink-0 article__favorite favorite'
							}
							// disabled={user ? false : true}
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
						</span>
					</div>
					<div className="article__tags tags">{tags}</div>
				</div>
				<div className="col-md-3 author d-inline-flex justify-content-start justify-content-md-end align-items-center">
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
				{user && single && (
					<div className="col-md-4 text-end article__controls">
						<Popover
							placement="right"
							content={removePopover}
							trigger="click"
							open={open}
							onOpenChange={handleOpenChange}
						>
							<button className="btn btn-outline-danger">Delete</button>
						</Popover>
						<Link to={`/articles/${data.slug}/edit`} className="btn btn-outline-success">
							Edit
						</Link>
					</div>
				)}
				{single && (
					<div className="col-md-12 article__content">
						<Markdown>{data.body}</Markdown>
					</div>
				)}
			</div>
		</article>
	);
}
