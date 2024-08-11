import React from 'react';

import Article from '../Article';
import Pagintaion from '../Pagination';

function Content({ props }) {
	const { articleListData, single, articleRequest, changeArticleRequest } = props;

	const spinner = (
		<div className="mt-3 mb-3 text-center">
			<div className="spinner-border text-primary" role="status" style={{ width: '5rem', height: '5rem' }}>
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	);

	let content = spinner,
		paginationData = null;

	if (articleListData?.articles) {
		content = articleListData.articles.map((el, i) => <Article key={i} data={el} single={single} />);
	}

	if (!single && articleListData?.articlesCount > articleRequest.limit) {
		paginationData = {
			count: Math.floor(articleListData.articlesCount / articleRequest.limit),
			active: articleRequest.offset ? articleRequest.offset / articleRequest.limit : 1,
		};
	}

	return (
		<div className="content">
			{content}
			{paginationData && <Pagintaion props={paginationData} action={changeArticleRequest} />}
		</div>
	);
}

export default Content;
