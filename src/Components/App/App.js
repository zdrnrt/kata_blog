import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, useParams } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';

import Header from '../Header/Header';
import Content from '../Content';
import Provider from '../Context/Provider';
import SignIn from '../Sign/In/SignIn';
import SignUp from '../Sign/Up/SignUp';
import * as API from '../API';
import FormArticle from '../FormArticle';

function App() {
	const articleList = {
		articles: [
			{
				slug: 'qwe-m2bba4',
				title: 'Some article title',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
				body: 'Est Ampyciden pater patent\nAmor saxa inpiger\nLorem markdownum Stygias neque is referam fudi, breve per. Et Achaica tamen: nescia ista occupat, illum se ad potest humum et.\n\nQua deos has fontibus\nRecens nec ferro responsaque dedere armenti opes momorderat pisce, vitataque et fugisse. Et iamque incipiens, qua huius suo omnes ne pendentia citus pedum.\n\nQuamvis pronuba\nUlli labore facta. Io cervis non nosterque nullae, vides: aethere Delphice subit, tamen Romane ob cubilia Rhodopen calentes librata! Nihil populorum flava, inrita? Sit hic nunc, hoc formae Esse illo? Umeris eram similis, crudelem de est relicto ingemuit finiat Pelia uno cernunt Venus draconem, hic, Methymnaeae.\n\n  1. Clamoribus haesit tenentem iube Haec munera\n  2. Vincla venae\n  3. Paris includere etiam tamen\n  4. Superi te putria imagine Deianira\n  5. Tremore hoste Esse sed perstat capillis siqua',
				createdAt: '2024-07-31T10:17:33.746Z',
				updatedAt: '2024-07-31T16:53:45.500Z',
				tagList: ['qwe', 'zxc', 'xcvcxv', '123'],
				favorited: false,
				favoritesCount: 1,
				author: {
					username: 'stariybot',
					bio: 'qweqwe',
					image: 'https://gravatar.com/avatar/5a7ae15d296a363b42225d0cc2705fff?s=400&d=robohash&r=x',
					following: false,
				},
			},
			{
				slug: '123-44aldr',
				title: '123',
				description: '123',
				body: '# SOMETHING',
				createdAt: '2024-07-31T09:59:53.091Z',
				updatedAt: '2024-07-31T14:37:56.775Z',
				tagList: ['3113'],
				favorited: false,
				favoritesCount: 1,
				author: {
					username: 'easy',
					image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
					following: false,
				},
			},
			{
				slug: '1231123123-nkh8t1',
				title: '1231123123',
				description: '1saD',
				body: 'AQSDfa',
				createdAt: '2024-07-31T07:49:33.910Z',
				updatedAt: '2024-07-31T07:49:37.108Z',
				tagList: [],
				favorited: false,
				favoritesCount: 1,
				author: {
					username: '123123',
					image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
					following: false,
				},
			},
			{
				slug: 'asdasdasd-w4g7ie',
				title: 'asdasdasd',
				description: 'asdasdasdas',
				body: 'asdasd',
				createdAt: '2024-07-30T12:42:51.289Z',
				updatedAt: '2024-07-31T14:49:26.808Z',
				tagList: ['dasdasdads'],
				favorited: false,
				favoritesCount: 2,
				author: {
					username: 'test682',
					image: 'https://i0.wp.com/cojo.ru/wp-content/uploads/2022/12/pepe-retroveiv-3.webp?ssl=1',
					following: false,
				},
			},
			{
				slug: 'some-article-title-ub8ehr',
				title: 'Some article title',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris  nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris  nisi ut aliquip ex ea commodo consequat.  ',
				body: '# Est Ampyciden pater patent\n## Amor saxa inpiger\nLorem markdownum Stygias neque is referam fudi, breve per. Et Achaica tamen: nescia ista occupat, illum se ad potest humum et.\n\n## Qua deos has fontibus\nRecens nec ferro responsaque dedere armenti opes momorderat pisce, vitataque et fugisse. Et iamque incipiens, qua huius suo omnes ne pendentia citus pedum.\n\n## Quamvis pronuba\nUlli labore facta. Io cervis non nosterque nullae, vides: aethere Delphice subit, tamen Romane ob cubilia Rhodopen calentes librata! Nihil populorum flava, inrita? Sit hic nunc, hoc formae Esse illo? Umeris eram similis, crudelem de est relicto ingemuit finiat Pelia uno cernunt Venus draconem, hic, Methymnaeae.\n\n -list 1. Clamoribus haesit tenentem iube Haec munera\n -list 2. Vincla venae\n -list 3. Paris includere etiam tamen\n -list 4. Superi te putria imagine Deianira\n -list 5. Tremore hoste Esse sed perstat capillis siqua',
				createdAt: '2024-07-30T07:24:17.736Z',
				updatedAt: '2024-07-31T10:05:29.449Z',
				tagList: ['test article', 'test markDown'],
				favorited: false,
				favoritesCount: 3,
				author: {
					username: 'misterminister',
					image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
					following: false,
				},
			},
			{
				slug: '-n66v7k',
				title: '   ',
				description: '  ',
				body: 'мсив',
				createdAt: '2024-07-30T06:37:19.364Z',
				updatedAt: '2024-07-31T07:48:56.715Z',
				tagList: [],
				favorited: false,
				favoritesCount: 1,
				author: {
					username: 'tester',
					image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
					following: false,
				},
			},
			{
				slug: '214141244124124124-5dgmtp',
				title: '214141244124124124',
				description: '12412421412124124124',
				body: '124124214124',
				createdAt: '2024-07-28T20:00:45.653Z',
				updatedAt: '2024-07-31T07:49:18.234Z',
				tagList: ['12421421'],
				favorited: false,
				favoritesCount: 5,
				author: {
					username: 'zora11111',
					bio: 'I work at State Farm.',
					image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
					following: false,
				},
			},
			{
				slug: 'derzhimsya-rebyata-twzrut',
				title: 'держимся ребята',
				description: 'мы сможем',
				body: '![Изображение](https://mail.google.com/mail/u/0/?ui=2&ik=9a96bd1152&attid=0.0&permmsgid=msg-f:1805825514114912831&th=190f94bcc728123f&view=fimg&disp=thd&attbid=ANGjdJ9Ci3rdEfonTLJvKcFZICtKuFE4WsG2NqtAe-0lhdTssHjoxNFQCG4XFCkm276gVxq_EOCAk0CG5cUYruWbTGMQ5dZaGH97YVn7B3wm9J-hFqB0dWhykuE5rmM&ats=2524608000000&sz=w1920-h878 "Картинка")',
				createdAt: '2024-07-28T12:24:53.522Z',
				updatedAt: '2024-07-31T07:48:58.797Z',
				tagList: ['#мырусски', '#снамибох'],
				favorited: false,
				favoritesCount: 6,
				author: {
					username: 'usertestapi',
					image: 'https://news.store.rambler.ru/img/672e5f7081bbc3d9746ee83dd6230ff0?img-format=auto&img-1-resize=height:400,fit:max&img-2-filter=sharpen',
					following: false,
				},
			},
			{
				slug: 'markdown-tzoxw7',
				title: 'markdown',
				description: 'Проверка разметки',
				body: '**жирный**  \n__жирный__\n\n~~зачеркнутый~~\n\nКор*рек*тно, кор**рек**тно, кор***рек***тно\n\nНекор_рек_тно, некор__рек__тно, некор___рек___тно\n\n<u>Подчёркнутый текст</u>\n\n- [x] Отмеченный пункт\n- [ ] Неотмеченный пункт\n\n![Изображение](https://media.tenor.com/e_MHf5Uye-oAAAAe/%D0%BA%D0%BE%D1%82-%D0%BC%D0%B5%D0%BC.png "Картинка")\n\n```javascript\nlet x = 12;\nlet y = 6;\nconsole.log(x + y);\n```\n\n',
				createdAt: '2024-07-28T11:07:01.767Z',
				updatedAt: '2024-07-31T07:49:00.894Z',
				tagList: ['#test'],
				favorited: false,
				favoritesCount: 6,
				author: {
					username: 'usertestapi',
					image: 'https://news.store.rambler.ru/img/672e5f7081bbc3d9746ee83dd6230ff0?img-format=auto&img-1-resize=height:400,fit:max&img-2-filter=sharpen',
					following: false,
				},
			},
			{
				slug: 'lol-wk2eoh',
				title: 'lol',
				description: 'lol',
				body: 'atata',
				createdAt: '2024-07-28T10:48:41.063Z',
				updatedAt: '2024-07-31T07:49:01.856Z',
				tagList: ['loltag', ''],
				favorited: false,
				favoritesCount: 4,
				author: {
					username: 'lol',
					image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
					following: false,
				},
			},
			{
				slug: 'test-ys7omp',
				title: 'test',
				description: 'Short description',
				body: 'test',
				createdAt: '2024-07-28T10:19:04.302Z',
				updatedAt: '2024-07-31T07:49:03.144Z',
				tagList: [],
				favorited: false,
				favoritesCount: 5,
				author: {
					username: 'ratata',
					image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.wikipedia.org%2Fwiki%2F%25D0%2593%25D0%25B8%25D0%25B3%25D0%25B0%25D1%2587%25D0%25B0%25D0%25B4&psig=AOvVaw0qGtUa-z_wTzT4lou1-TBV&ust=1722248302975000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOCyxoPByYcDFQAAAAAdAAAAABAE',
					following: false,
				},
			},
			{
				slug: 'arthurchik-cjfqvz',
				title: 'arthurchik',
				description: 'Ответ',
				body: 'Спасибо, помогло!',
				createdAt: '2024-07-28T08:40:07.296Z',
				updatedAt: '2024-07-28T12:01:35.034Z',
				tagList: ['ответ'],
				favorited: false,
				favoritesCount: 1,
				author: {
					username: 'domadetronix',
					image: 'https://avatars.githubusercontent.com/u/99541511?v=4',
					following: false,
				},
			},
			{
				slug: 'domadetronix2003-p54w42',
				title: 'domadetronix2003',
				description: 'ответ',
				body: 'store:  \ninitialState = {  \n articleDeleted: null  \n}  \nextraReducers: {  \n(builder)  \n.addCase(fetchArticleDeleted.fulfilled, (state) => {  \nstate.articleDeleted = "deleted"  \n})  \n}  \nApp:  \nconst {articleDeleted} = useSelector(state => state.article)  \nuseEffect(() => {  \nif(articleDeleted === "deleted") {  \n dispatch(fetchGetArticles())  \n}  \n }, [dispatch, articleDeleted])\nлогика такая, по завершению запроса на удаление статьи меняешь статус на "deleted", а потом делаешь новый запрос на получение статей если статус поменялся, лично  я сделал так, может кто-то по другому\n',
				createdAt: '2024-07-27T23:40:03.309Z',
				updatedAt: '2024-07-28T23:24:05.572Z',
				tagList: [''],
				favorited: false,
				favoritesCount: 1,
				author: {
					username: 'arthurchik',
					image: 'https://i.pinimg.com/736x/cb/d0/16/cbd01660cc393b70bcc9411e0f9b3336.jpg',
					following: false,
				},
			},
			{
				slug: 'title-4jqyrb',
				title: 'HELP',
				description: 'Вопрос, господа',
				body: 'Подскажите, как удаляете статью с главной страницы? У меня нужно перезагрузить её дополнительно, иначе не хочет(',
				createdAt: '2024-07-27T22:58:42.904Z',
				updatedAt: '2024-07-31T07:49:05.910Z',
				tagList: [],
				favorited: false,
				favoritesCount: 4,
				author: {
					username: 'domadetronix',
					image: 'https://avatars.githubusercontent.com/u/99541511?v=4',
					following: false,
				},
			},
			{
				slug: 'naruto-53856e',
				title: 'Наруто',
				description: 'Станет',
				body: '# Хокаге',
				createdAt: '2024-07-27T21:38:48.330Z',
				updatedAt: '2024-07-31T07:49:07.909Z',
				tagList: ['Удзумаки'],
				favorited: false,
				favoritesCount: 6,
				author: {
					username: 'arthurchik',
					image: 'https://i.pinimg.com/736x/cb/d0/16/cbd01660cc393b70bcc9411e0f9b3336.jpg',
					following: false,
				},
			},
			{
				slug: 'ds-x08727',
				title: 'ds',
				description: 'sd',
				body: 'sd',
				createdAt: '2024-07-27T21:26:36.133Z',
				updatedAt: '2024-07-31T07:49:09.575Z',
				tagList: ['sd', 'ds'],
				favorited: false,
				favoritesCount: 1,
				author: {
					username: 'alafl',
					image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
					following: false,
				},
			},
			{
				slug: 'nu-izi-reshilos-v-odnu-strochku-kx0ec5',
				title: 'Ну изи, решилось в одну строчку',
				description: 'Ну тут очевидно',
				body: '2,5 дня я думал и медитировал, а написал на час\nv4',
				createdAt: '2024-07-27T16:28:12.771Z',
				updatedAt: '2024-07-28T11:35:17.022Z',
				tagList: ['JS', 'не бейте'],
				favorited: false,
				favoritesCount: 3,
				author: {
					username: 'domadetronix',
					image: 'https://avatars.githubusercontent.com/u/99541511?v=4',
					following: false,
				},
			},
			{
				slug: 'asd-rf7wmr',
				title: 'asd',
				description: 'asd',
				body: 'asd',
				createdAt: '2024-07-27T15:04:00.120Z',
				updatedAt: '2024-07-27T21:19:37.011Z',
				tagList: [],
				favorited: false,
				favoritesCount: 0,
				author: {
					username: 'fuckfuck',
					image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
					following: false,
				},
			},
			{
				slug: '123-bbxfsz',
				title: '123',
				description: '123',
				body: '123',
				createdAt: '2024-07-27T14:11:25.747Z',
				updatedAt: '2024-07-27T14:11:25.747Z',
				tagList: ['1'],
				favorited: false,
				favoritesCount: 0,
				author: {
					username: 'baha123',
					image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
					following: false,
				},
			},
			{
				slug: 'asdasda-jion5t',
				title: '!!!!!!',
				description: 'dadada',
				body: 'dadadad',
				createdAt: '2024-07-27T12:43:03.977Z',
				updatedAt: '2024-07-27T14:09:36.263Z',
				tagList: ['adadad'],
				favorited: false,
				favoritesCount: 2,
				author: {
					username: 'test682',
					image: 'https://i0.wp.com/cojo.ru/wp-content/uploads/2022/12/pepe-retroveiv-3.webp?ssl=1',
					following: false,
				},
			},
		],
		articlesCount: 544,
	};
	let [articleRequest, changeArticleRequest] = useState({
		offset: 0,
		limit: 20,
	});
	let [articleListData, changeArticleList] = useState(null);
	// let [articleListData, changeArticleList] = useState(null);
	let requestString = [];
	for (let param in articleRequest) {
		requestString.push(`${param}=${articleRequest[param]}`);
	}

	useEffect(() => {
	  // console.log(requestString.join('&'));
	  API.getArticleList(requestString.join('&'))
	    .then( (response) => {
	    //   console.log(response, !response.error);
	      if (!response.error){
	        changeArticleList(response);
	      } else {
	        console.log('API.getArticleList', error);
	      }
	    })
	  }, [articleRequest]);

	return (
		<Provider>
			<Router>
				<div className="app">
					<Header />
					<main className="app__main">
						<div className="container">
							<div className="col-md-9 m-auto pt-5 pb-5">
								<Route
									path="/articles/:slug"
									exact={true}
									render={({ match, location, history }) => (
										<Content
											props={{
												articleListData,
												articleRequest,
												match,
												location,
												history,
												single: true,
											}}
										/>
									)}
								></Route>
								<Route
									path={['/', '/articles', '/articles/number/:number']}
									exact={true}
									render={({ match, location, history }) => (
										<Content
											props={{
												articleListData,
												articleRequest,
												match,
												location,
												history,
												single: false,
												changeArticleRequest,
											}}
										/>
									)}
								></Route>
								<Route path="/sign-in" exact={true}>
									<SignIn />
								</Route>
								<Route
									path="/sign-up"
									exact={true}
									render={({ match }) => <SignUp props={{ match }} />}
								></Route>
								<Route
									path="/profile"
									exact={true}
									render={({ match }) => <SignUp props={{ match }} />}
								></Route>
								<Route
									path="/new-article"
									exact={true}
									render={({ match, location, history }) => (
										<FormArticle
											props={{
												articleListData,
												articleRequest,
												match,
												location,
												history,
												edit: false,
											}}
										/>
									)}
								></Route>
								<Route
									path="/article/:slug/edit"
									exact={true}
									render={({ match, location, history }) => (
										<FormArticle
											props={{
												articleListData,
												articleRequest,
												match,
												location,
												history,
												edit: true,
											}}
										/>
									)}
								></Route>
							</div>
						</div>
					</main>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
