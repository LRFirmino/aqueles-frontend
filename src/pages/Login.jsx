import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importe o seu hook de autenticação

export default function Login() {
  const [mode, setMode] = useState("login"); // login | register
  const [email, setEmail] = useState(""); // Alterei o nome para clareza
  const [password, setPassword] = useState("");
  
  const { login } = useAuth(); // Acessa a função login do contexto
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const endpoint =
      mode === "login"
        ? "https://aqueles-backend-498097150469.us-central1.run.app/auth/login"
        : "https://aqueles-backend-498097150469.us-central1.run.app/auth/register";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: email, password }),
      });

      if (!response.ok) {
        throw new Error("Erro de autenticação");
      }

      const data = await response.json();

      // 1. Salva o token no contexto global e localStorage
      // Assumindo que seu backend retorna algo como { token: "..." }
      if (data.token) {
        login(data.token);
        
        // 2. Só navega após o estado de login ser processado
        navigate("/");
      } else {
        alert("Token não recebido do servidor");
      }

    } catch (err) {
      console.error(err);
      alert("Erro ao autenticar: " + err.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-96 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-semibold text-center">
          {mode === "login" ? "Login" : "Cadastro"}
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-blue-500 text-white p-2 rounded font-semibold hover:bg-blue-600 transition-colors">
          {mode === "login" ? "Entrar" : "Criar conta"}
        </button>

        <p className="text-sm text-center text-gray-600">
          {mode === "login" ? (
            <>
              Não tem conta?{" "}
              <button
                type="button"
                className="text-blue-500 underline"
                onClick={() => setMode("register")}
              >
                Cadastre-se
              </button>
            </>
          ) : (
            <>
              Já tem conta?{" "}
              <button
                type="button"
                className="text-blue-500 underline"
                onClick={() => setMode("login")}
              >
                Faça login
              </button>
            </>
          )}
        </p>
      </form>
    </div>
  );
}