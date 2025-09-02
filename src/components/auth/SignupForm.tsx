"use client";
import { useState } from "react";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    setMessage(data.message || data.error);
  }

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl mb-4">Signup</h1>
      <form onSubmit={handleSignup} className="flex flex-col gap-2">
        <input
          className="border p-2 rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded">Sign Up</button>
      </form>
      <a href="/login">
        <button className="bg-green-500 text-white m-2 p-2 rounded">
          Back to login
        </button>
      </a>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
