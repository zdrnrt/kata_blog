import React from 'react';

import Article from '../Article';
import Pagintaion from '../Pagination';

function Content({ props }) {

	const { articleListData, single, articleRequest, changeArticleRequest } = props;
	// console.log('Content', articleListData, single);
	const spinner = (
		<div className="mt-3 mb-3 text-center">
			<div className="spinner-border text-primary" role="status" style={{ width: '5rem', height: '5rem' }}>
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	);

	let content = spinner, paginationData = null;

	if (articleListData?.articles) {
		content = articleListData.articles.map((el, i) => <Article key={i} data={el} single={single} />);
	}

	if (!single && articleListData?.articlesCount > articleListData?.articles.length) {
		paginationData = {
			count: Math.ceil(articleListData.articlesCount / articleListData.articles.length),
			active: articleRequest.offset ? Math.ceil(articleRequest.offset / articleListData.articles.length) : 1
		};
	}

	return (
		<div className="content">
			{!!articleListData ? content : spinner}
			{paginationData && <Pagintaion props={paginationData} action={changeArticleRequest} />}
		</div>
	);
}

export default Content;
