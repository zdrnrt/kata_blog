import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
// import Cont

import Context from '../Context/Context';
import * as API from '../API';

function FormArticle({ props }) {
	function Tag({ value, number }) {
		return (
			<div className="row tag" data-number={number} style={{ marginBlockEnd: '20px' }}>
				<div className="col-md-5">
					<input className="form-control text-body-tertiary" defaultValue={value} disabled />
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
			let result = data || {};
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
			let result = data || {};
			if (!!result?.tagList) {
				result.tagList.push(tag);
			} else {
				result.tagList = [tag];
			}
			return result;
		});
		// TODO
		resetField('tag');
	}

	const spinner = (
		<div className="mt-3 mb-3 text-center">
			<div className="spinner-border text-primary" role="status" style={{ width: '5rem', height: '5rem' }}>
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	);

	let { articleListData, edit, match } = props;

	const { user } = useContext(Context);
	let tagList = null;
	let [article, changeArticle] = useState(null);

	// console.log('FormArticle articleListData', articleListData);
	// console.log('FormArticle edit', edit);
	// console.log('FormArticle article', article);

	if (article && article.tagList) {
		tagList = article.tagList.map((el, i) => {
			return <Tag key={i} number={i} value={el} />;
		});
	}

	const {
		register,
		formState: { errors },
		handleSubmit,
		setError,
		getValues,
		resetField,
	} = useForm();

	const onSubmit = (data) => {
		console.log('user', user, user.token);
		console.log('onSubmit data', data);
		const sendData = {
			title: data.title,
			body: data.body,
			description: data.description,
		};
		if (edit) {
			API.putArticle({
				slug: match.params.slug,
				token: user.token,
				data: sendData,
			});
		} else {
			sendData.tags = data.tagList;
			API.postArticle({
				token: user.token,
				data: sendData,
			});
		}
	};
	if (!article && articleListData) {
		changeArticle(articleListData.articles.find((el) => el.slug == match.params.slug));
	}
	if (!article && edit) {
		return spinner;
	}

	return (
		<div className="pt-5 p-4 pb-5 bg-white">
			<h1 className="mb-2 text-center fs-4">{edit ? 'Edit article' : 'Create new article'} </h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-3">
					<label htmlFor="inputTitle" className="form-label">
						Title
					</label>
					<input
						id="inputTitle"
						className={'form-control text-body-tertiary ' + (!!errors.title && 'is-invalid')}
						type="text"
						placeholder="Title"
						name="title"
						{...register('title', { required: true })}
						defaultValue={edit && article.title}
						onInput={(e) => {
							changeInput(e.target);
						}}
					/>
					{!!errors.title && <p className="d-block invalid-feedback">Title is incorrect</p>}
				</div>
				<div className="mb-3">
					<label htmlFor="inputDescription" className="form-label">
						Description
					</label>
					<input
						id="inputDescription"
						className={'form-control text-body-tertiary ' + (!!errors.description && 'is-invalid')}
						type="text"
						placeholder="Description"
						name="description"
						{...register('description', { required: true })}
						defaultValue={edit && article.description}
						onInput={(e) => {
							changeInput(e.target);
						}}
					/>
					{!!errors.title && <p className="d-block invalid-feedback">Title is incorrect</p>}
				</div>
				<div className="mb-3">
					<label htmlFor="inputBody" className="form-label">
						Text
					</label>
					<textarea
						id="inputBody"
						className={'form-control text-body-tertiary ' + (!!errors.text && 'is-invalid')}
						placeholder="Text"
						name="body"
						rows="10"
						{...register('body', { required: true })}
						defaultValue={edit && article.body}
						onInput={(e) => {
							changeInput(e.target);
						}}
					/>
					{!!errors.text && <p className="d-block invalid-feedback">Text must be not empty</p>}
				</div>
				<div className="mb-3">
					<label htmlFor="inputPasswordR" className="form-label">
						Tags
					</label>
					{tagList}
					<div className="row tag">
						<div className="col-md-5">
							<input
								className="form-control text-body-tertiary"
								placeholder="tag"
								name="tag"
								{...register('tag')}
							/>
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

export default FormArticle;
