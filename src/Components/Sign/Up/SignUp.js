import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';

import * as API from '../../API';
import Context from '../../Context/Context';

export default function SignUp({ props }) {
	const context = useContext(Context);
	console.log(context.user);
	if (context.user && props.match.path != '/profile') {
		return <Redirect to="/" />;
	}
	if (!context.user && props.match.path == '/profile') {
		return <Redirect to="/sign-in" />;
	}

	const {
		register,
		formState: { errors },
		handleSubmit,
		setError,
	} = useForm();

	const onSubmit = (data) => {
		console.log('onSubmit', data);
		if (!context.user && data.password !== data.passwordR) {
			setError('password', { type: 'custom', message: 'Passwords must match' });
			return;
		}
		const checkURL = (link) => {
			try {
				return new URL(link);
			} catch {
				return false;
			}
		};
		if (data.image && !checkURL(data.image)) {
			setError('image', { type: 'custom', message: 'Url is incorrect' });
		}
		API[context.user ? 'updateUser' : 'registerUser']({ user: data }, context.user?.token).then((response) => {
			console.log('API.loginUser', response);
			if (response.errors) {
				for (let elem in response.errors) {
					setError(elem, { message: `${elem}: ${response.errors[elem]}` });
				}
				if (response.errors['email or password']) {
					setError('email', { message: response.errors['email or password'] });
					setError('password', { message: response.errors['email or password'] });
				}
			} else {
				context.changeUser(response.user);
			}
		});
	};
	return (
		<div className="col-md-6 m-auto p-3 bg-white">
			<h1 className="mb-2 text-center fs-4">{context.user ? 'Edit Profile' : 'Create new account'} </h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-3">
					<label htmlFor="inputUser" className="form-label">
						Username
					</label>
					<input
						id="inputUser"
						defaultValue={context.user && (context.user.username || '')}
						type="text"
						className={'form-control text-body-tertiary ' + (!!errors.username && 'is-invalid')}
						placeholder="Username"
						{...register('username', { required: true, minLength: 3, maxLength: 20 })}
					/>
					{!!errors.username && <p className="d-block invalid-feedback">Username is incorrect</p>}
				</div>
				<div className="mb-3">
					<label htmlFor="inputEmail" className="form-label">
						Email address
					</label>
					<input
						id="inputEmail"
						defaultValue={context.user && (context.user.email || '')}
						type="email"
						className={'form-control text-body-tertiary ' + (!!errors.email && 'is-invalid')}
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
					<label htmlFor="inputPassword" className="form-label">
						{context.user ? 'New password' : 'Password'}
					</label>
					<input
						type="password"
						className={'form-control text-body-tertiary ' + (!!errors.password && 'is-invalid')}
						id="inputPassword"
						placeholder="Password"
						{...register('password', { required: !context.user, minLength: 6, maxLength: 40 })}
					/>
					{!!errors.password && <p className="d-block invalid-feedback">Password is incorrect</p>}
				</div>
				{!context.user && (
					<div className="mb-3">
						<label htmlFor="inputPasswordR" className="form-label">
							Repeat Password
						</label>
						<input
							type="password"
							className={'form-control text-body-tertiary ' + (!!errors.password && 'is-invalid')}
							id="inputPasswordR"
							placeholder="Password"
							{...register('passwordR', { required: !context.user, minLength: 6, maxLength: 40 })}
						/>
						{!!errors.password && (
							<p className="d-block invalid-feedback">
								{errors['password'].message || 'Password is incorrect'}
							</p>
						)}
					</div>
				)}
				{context.user && (
					<div className="mb-3">
						<label htmlFor="inputImage" className="form-label">
							Avatar image (url)
						</label>
						<input
							id="inputImage"
							defaultValue={context.user && (context.user?.image || '')}
							type="text"
							className={'form-control text-body-tertiary ' + (!!errors.image && 'is-invalid')}
							placeholder="Image url"
							{...register('image', {
								minLength: 3,
							})}
						/>
						{!!errors.image && <p className="d-block invalid-feedback">Image url is incorrect</p>}
					</div>
				)}
				{!context.user && (
					<div className="mb-3">
						<input
							className="form-check-input text-body-tertiary "
							type="checkbox"
							{...register('check', { required: true })}
							id="inputCheck"
						/>
						<label
							className="form-check-label text-body-tertiary"
							htmlFor="inputCheck"
							style={{ paddingLeft: '1rem' }}
						>
							I agree to the processing of my personal information
						</label>
						{!!errors.check && <p className="d-block invalid-feedback">Must be checked</p>}
					</div>
				)}
				<button className="w-100 btn btn-lg btn-primary">{context.user ? 'Save' : 'Create'}</button>
			</form>
			{!context.user && (
				<p className="pt-2 text-center fs-8 text-body-tertiary">
					Already have an account? <Link to="/sign-in">Sign In</Link>.
				</p>
			)}
		</div>
	);
}
