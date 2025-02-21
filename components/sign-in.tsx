"use client"
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  async function signin() {
     await signIn.email({
      email, password, callbackURL: "/dashboard", rememberMe, fetchOptions: {
        onRequest: () => {
          setLoading(true)
        },
        onSuccess: () => {
          setLoading(false)
        },
        onError:()=>{
          setLoading(false)
        }
      }
    });
  }
  return (
    <>

      <form className="card-body" >
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
        <div className="flex gap-3">
          <input

            type="checkbox"
            id="remember"
            onClick={() => {
              setRememberMe(!rememberMe);
            }}
          />
          <label htmlFor="remember">Remember me</label>

        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={signin} disabled={loading}> {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            "Login"
          )}</button>
        </div>
      </form>
    </>

  );
}