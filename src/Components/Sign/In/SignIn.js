import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';

import * as API from '../../API';
import Context from '../../Context/Context';

export default function SignIn({ props }) {
	const context = useContext(Context);
	const {
		register,
		formState: { errors },
		handleSubmit,
		setError,
	} = useForm();

	const onSubmit = (data) => {
		console.log('onSubmit data', data, { user: data });
		API.loginUser({ user: data }).then((response) => {
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

	if (!!context.user) {
		return <Redirect to="/" />;
	}

	return (
		<div className="col-md-6 m-auto p-3 bg-white">
			<h1 className="mb-2 text-center fs-4">Sign In</h1>
			<form
				onSubmit={handleSubmit(onSubmit)}
				onError={() => {
					alert('Submission has failed.');
				}}
			>
				<div className="mb-3">
					<label htmlFor="inputEmail" className="form-label">
						Email address
					</label>
					<input
						type="email"
						className={'form-control text-body-tertiary ' + (!!errors.email && 'is-invalid')}
						id="inputEmail"
						placeholder="Email address"
						defaultValue="testtesttest@m.ee"
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
						Password
					</label>
					<input
						type="password"
						className={'form-control text-body-tertiary ' + (!!errors.password && 'is-invalid')}
						id="inputPassword"
						placeholder="Password"
						defaultValue="123123123"
						{...register('password', { required: true, minLength: 6, maxLength: 40 })}
					/>
					{!!errors.password && <p className="d-block invalid-feedback">Password is incorrect</p>}
				</div>
				<button className="w-100 btn btn-lg btn-primary">Login</button>
			</form>
			<p className="pt-2 text-center fs-8 text-body-tertiary">
				Don't have an account? <Link to="/sign-up">Sign Up</Link>.
			</p>
		</div>
	);
}
