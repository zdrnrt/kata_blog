import React from 'react';
import { useForm, setError } from 'react-hook-form';
import { Link } from 'react-router-dom';

import Provider from '../../Context/Provider';
import * as API from '../../API';

export default function SignIn() {
	console.log(API);
	const {
		register,
		formState: { errors },
		handleSubmit,
		setError,
	} = useForm();
	const onSubmit = (data) => {
		console.log('onSubmit data', data);
		API.loginUser(data)
			.then((response) => {
				console.log('API.loginUser', response);
				if (response.errors) {
					setError('email', response.errors.message )
				}
			})
	};

	return (
		<div className="col-md-6 m-auto p-3 bg-white">
			<h1 className="text-center">Sign In</h1>
			<form
				onSubmit={handleSubmit(onSubmit)}
				onError={() => {
					alert('Submission has failed.');
				}}
			>
				<div className="mb-3">
					<label htmlFor="inputEmail" className="form-label text-body-tertiary">
						Email address
					</label>
					<input
						type="email"
						className={'form-control ' + (!!errors.email && 'is-invalid')}
						id="inputEmail"
						placeholder="Email address"
						// Value="testtesttest@m.ee"
						{...register('email', {
							required: true,
							pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							minLength: 3,
							maxLength: 20,
						})}
					/>
					{!!errors.email && <p className="d-block invalid-feedback">{errors.email.message || 'Email address is incorrect'}</p>}
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
						// value="123123123"
						{...register('password', { required: true, minLength: 6, maxLength: 40 })}
					/>
					{!!errors.password && <p className="d-block invalid-feedback">Password is incorrect</p>}
				</div>
				<button className="w-100 btn btn-lg btn-primary">Login</button>
			</form>
			<p className="pt-2 text-center fs-8 text-body-tertiary">
				Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
			</p>
		</div>
	);
}
