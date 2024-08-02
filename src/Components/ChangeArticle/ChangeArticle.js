import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function ChangeArticle(data) {
	console.log(data);
	const edit = false;
	const {
		register,
		formState: { errors },
		handleSubmit,
		setError,
	} = useForm();
	const onSubmit = (data) => {
		console.log(data);
	};
	return (
		<div className="p-3 bg-white">
			<h1 className="text-center">{edit ? 'Edit article' : 'Create new article'} </h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-3">
					<label htmlFor="inputTitle" className="form-label text-body-tertiary">
						Title
					</label>
					<input
						id="inputTitle"
						// value={edit && context.profile ? context.profile.username : '' }
						type="text"
						className={'form-control ' + (!!errors.title && 'is-invalid')}
						placeholder="Username"
						{...register('username', { required: true, minLength: 3, maxLength: 20 })}
					/>
					{!!errors.username && <p className="d-block invalid-feedback">Username is incorrect</p>}
				</div>
				<div className="mb-3">
					<label htmlFor="inputEmail" className="form-label text-body-tertiary">
						Email address
					</label>
					<input
						id="inputEmail"
						value={edit && context.profile ? context.profile.email : ''}
						type="email"
						className={'form-control ' + (!!errors.email && 'is-invalid')}
						placeholder="Email address"
						{...register('email', {
							required: true,
							pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							minLength: 3,
							maxLength: 20,
						})}
					/>
					{!!errors.email && <p className="d-block invalid-feedback">Email address is incorrect</p>}
				</div>
				<div className="mb-3">
					<label htmlFor="inputPassword" className="form-label text-body-tertiary">
						Password
					</label>
					<input
						type="password"
						className={'form-control ' + (!!errors.password && 'is-invalid')}
						id="inputPassword"
						placeholder="Password"
						{...register('password', { required: true, minLength: 6, maxLength: 40 })}
					/>
					{!!errors.password && <p className="d-block invalid-feedback">Password is incorrect</p>}
				</div>
				<div className="mb-3">
					<label htmlFor="inputPasswordR" className="form-label text-body-tertiary">
						Password
					</label>
					<input
						type="password"
						className={'form-control ' + (!!errors.password && 'is-invalid')}
						id="inputPasswordR"
						placeholder="Password"
						{...register('passwordR', { required: true, minLength: 6, maxLength: 40 })}
					/>
					{!!errors.password && (
						<p className="d-block invalid-feedback">
							{errors['password'].message || 'Password is incorrect'}
						</p>
					)}
				</div>
				{!edit && (
					<div className="mb-3">
						<input
							className="form-check-input"
							type="checkbox"
							{...register('check', { required: true })}
							id="inputCheck"
						/>
						<label className="form-check-label" htmlFor="inputCheck" style={{ paddingLeft: '1rem' }}>
							I agree to the processing of my personal information
						</label>
						{!!errors.check && <p className="d-block invalid-feedback">Must be checked</p>}
					</div>
				)}
				<button className="w-100 btn btn-lg btn-primary">{edit ? 'Save' : 'Create'}</button>
			</form>
			{!edit && (
				<p className="pt-2 text-center fs-8 text-body-tertiary">
					Already have an account? <Link to="/sign-in">Sign In</Link>.
				</p>
			)}
		</div>
	);
}
