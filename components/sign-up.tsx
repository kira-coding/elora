"use client";
import { useState } from "react";
import { signUp } from "@/lib/auth-client";

import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function SignUp() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");

	const router = useRouter();
	const [loading, setLoading] = useState(false);


	const signup = async () => {
		await signUp.email({
			email,
			password,
			name: `${firstName} ${lastName}`,
			image: "",
			fetchOptions: {
				
				onResponse: () => {
					setLoading(false);
				},
				onRequest: () => {
					setLoading(true);
				},
				onError: (ctx) => {
					console.log(ctx);
				},
				onSuccess: async () => {
					router.push(".");
				},
			},
		});
	}

	return (
		<>
			<form className="card-body">
				<div className="flex flex-col">
					<div className="form-control" >
						<label className="label">
							<span className="label-text">First Name</span>
						</label>
						<input type="text" placeholder="First name" id="first_name" required
							onChange={(e) => {
								setFirstName(e.target.value);
							}}
							value={firstName} className="input input-bordered" />
					</div>
					<div className="form-control" >
						<label className="label">
							<span className="label-text">Last Name</span>
						</label>
						<input type="text" placeholder="Last name" id="last_name" required
							onChange={(e) => {
								setLastName(e.target.value);
							}}
							value={lastName} className="input input-bordered" />
					</div>
				</div>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Email</span>
					</label>
					<input type="email" placeholder="email" id="email" required
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						value={email} className="input input-bordered" />
				</div>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Password</span>
					</label>
					<input type="password" autoComplete="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)} id="password" placeholder="password" className="input input-bordered" required />

				</div>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Confirm Password</span>
					</label>
					<input type="password" 
						value={passwordConfirmation}
						onChange={(e) => setPasswordConfirmation(e.target.value)} id="confirmPassword" placeholder="type your password again" className="input input-bordered" required />

				</div>
				<div className="form-control mt-6">
					<button className="btn btn-primary" onClick={signup} disabled={loading}> {loading ? (
						<Loader2 size={16} className="animate-spin" />
					) : (
						"Add Administrator"
					)}</button>
				</div>
			</form>

		</>
	);
}

