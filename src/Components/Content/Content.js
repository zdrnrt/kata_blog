import React from 'react';

import Article from '../Article';

function Content(props) {
	console.log('content', props.props);
	let { articleListData, articleRequest, match, single } = props.props;
	// console.log(articleListData, articleRequest);
	let articleList = null;
	if (props.props.single) {
		// console.log('single', single);
		// console.log('match', match.params.slug);
		let article = articleListData.articles.find((el) => el.slug == match.params.slug);
		if (articleList) {
			articleList = <Article data={article} single={true} />;
		} else {
		}
		// console.log('article', article);
	} else {
		// console.log('not single', !!single);
		if (articleListData.articles) {
			articleList = articleListData.articles.map((el, i) => <Article key={i} data={el} single={false} />);
		}
	}

	return <div className="content">{articleList}</div>;
}

export default Content;
