import React from 'react';
import {useParams} from 'react-router-dom';

import  * as API from '../API';
import Article from '../Article';
import Pagintaion from '../Pagination';


function Content({props}) {

	const spinner = (
		<div className='mt-3 mb-3 text-center'>
			<div className="spinner-border text-primary" role="status" style={{width: '5rem', height: '5rem'}}>
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	)


	console.log('content', props);
	let { articleListData, articleRequest, changeArticleList, match, location, history, single } = props;
	// console.log(articleListData, articleRequest);


	let articleList = null;
	let paginationData = null;

	if (single) {
		let article = articleListData.articles.find((el) => el.slug == match.params.slug);
		if (article) {
			articleList = <Article data={article} single={true} />;
		} else {
			API.getArticle(match.params.slug)
				.then( (response) => {
					if (!response.error){
						<Article data={response} single={true} />;
					}
				})
		}
	} else {
		if (articleListData.articles) {
			articleList = articleListData.articles.map((el, i) => <Article key={i} data={el} single={false} />);
			if (articleListData.articlesCount > articleListData.articles.length){
				paginationData = {
					count: Math.ceil(articleListData.articlesCount / articleListData.articles.length), 
					active: (articleRequest.offset ? articleRequest.offset / articleListData.articles.length : 1)
				};
				
			}
		}
		// console.log('content', articleListData.articles);
	}
	
	return (
		<div className="content">
			{/* { !!articleList ? articleList : spinner } */}
			{ paginationData && <Pagintaion props={paginationData} /> }
		</div>
	);
}

export default Content;
