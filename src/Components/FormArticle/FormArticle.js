import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
// import Cont

import Context from '../Context/Context';
import * as API from '../API';

export default function FormArticle({ props }) {
	function Tag({ value, number }) {
		return (
			<div className="row tag" data-number={number} style={{ marginBlockEnd: '20px' }}>
				<div className="col-md-5">
					<input className="form-control" defaultValue={value} disabled />
				</div>
				<div className="col-md-2">
					<button
						className="btn btn-outline-danger w-100"
						type="button"
						onClick={(e) => {
							removeTag(e.target.closest('.tag'));
						}}
					>
						Delete
					</button>
				</div>
			</div>
		);
	}

	function changeInput(elem) {
		changeArticle((data) => {
			let result = data;
			result[elem.name] = elem.value;
			return result;
		});
	}

	function removeTag(elem) {
		changeArticle((data) => {
			let result = data;
			result.tagList.splice(elem.dataset.number, 1);
			return result;
		});
		elem.remove();
	}

	function addTag(elem) {
		let tag = getValues('tag');
		if (tag.trim() == '') {
			return;
		}
		changeArticle((data) => {
			let result = data;
			result.tagList.push(tag);
			return result;
		});
		// TODO
		resetField('tag');
	}

	console.log(props);
	let { edit, match } = props;
	const user = useContext(Context);

	let form = {
		title: 'test',
		description: 'test descr',
		body: 'test body',
		tagList: ['asd', 'dsa'],
	};

	if (edit) {
		form = articleListData.articles.find((el) => el.slug == match.params.slug);
	}

	let [article, changeArticle] = useState(form);

	const {
		register,
		formState: { errors },
		handleSubmit,
		setError,
		getValues,
		resetField,
	} = useForm();

	// useForm({
	// 	defaultValues: async () => fetch('/api-endpoint');
	//   })

	const onSubmit = (data) => {
		console.log('onSubmit data', data);
		console.log('onSubmit article', article);
		if (data.props.edit) {
			API.postArticle({
				api_key: user.api_key,
				body: article,
			});
		} else {
			API.putArticle({
				api_key: user.api_key,
				body: article,
			});
		}
	};

	// console.log('article', article)
	let tagList = null;
	tagList = article.tagList.map((el, i) => {
		return <Tag key={i} number={i} value={el} />;
	});
	return (
		<div className="pt-5 p-4 pb-5 bg-white">
			<h1 className="text-center fs-4">{edit ? 'Edit article' : 'Create new article'} </h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-3">
					<label htmlFor="inputTitle" className="form-label text-body-tertiary">
						Title
					</label>
					<input
						id="inputTitle"
						className={'form-control ' + (!!errors.title && 'is-invalid')}
						type="text"
						placeholder="Title"
						name="title"
						{...register('title', { required: true })}
						defaultValue={article.title}
						onInput={(e) => {
							changeInput(e.target);
						}}
					/>
					{!!errors.title && <p className="d-block invalid-feedback">Title is incorrect</p>}
				</div>
				<div className="mb-3">
					<label htmlFor="inputDescription" className="form-label text-body-tertiary">
						Description
					</label>
					<input
						id="inputDescription"
						className={'form-control ' + (!!errors.description && 'is-invalid')}
						type="text"
						placeholder="Description"
						name="description"
						{...register('description', { required: true })}
						defaultValue={article.description}
						onInput={(e) => {
							changeInput(e.target);
						}}
					/>
					{!!errors.title && <p className="d-block invalid-feedback">Title is incorrect</p>}
				</div>
				<div className="mb-3">
					<label htmlFor="inputBody" className="form-label text-body-tertiary">
						Text
					</label>
					<textarea
						id="inputBody"
						className={'form-control ' + (!!errors.text && 'is-invalid')}
						placeholder="Text"
						name="body"
						rows="10"
						{...register('text', { required: true })}
						defaultValue={article.body}
						onInput={(e) => {
							changeInput(e.target);
						}}
					/>
					{!!errors.text && <p className="d-block invalid-feedback">Text must be not empty</p>}
				</div>
				<div className="mb-3">
					<label htmlFor="inputPasswordR" className="form-label text-body-tertiary">
						Tags
					</label>
					{tagList}
					<div className="row tag">
						<div className="col-md-5">
							<input className="form-control" placeholder="tag" name="tag" {...register('tag')} />
						</div>
						{/* <div className='col-md-2'><button className='btn btn-outline-danger w-100' type='button'>Delete</button></div> */}
						<div className="col-md-2">
							<button
								className="btn btn-outline-primary w-100"
								type="button"
								onClick={(e) => {
									addTag(e.target);
								}}
							>
								Add tag
							</button>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-5">
						<button
							className="w-100 btn btn-lg btn-primary"
							type="submit"
							onClick={(e) => {
								console.log(e);
								alert('send');
							}}
						>
							Send
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
