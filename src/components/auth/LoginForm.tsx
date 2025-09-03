"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (res.ok) {
      // Store user data in auth context
      login(data.user);
      // Redirect to home page on successful login
      router.push("/home");
    } else {
      setMessage(data.message || data.error);
    }
  }

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-2">
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
        <button className="bg-green-500 text-white p-2 rounded">Login</button>
      </form>
      <a href="/signup">
        <button className="bg-blue-500 text-white m-2 p-2 rounded">
          Create an account
        </button>
      </a>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
