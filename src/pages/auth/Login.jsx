import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Forms from "../../components/templates/LoginForm";
import loginData from "./Data/LoginData";

const API_URL = "https://backend-retromatic.onrender.com/v1/api";

const Login = () => {
  const [form, setForm] = useState({ correo: "", contrasena: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.correo || !form.contrasena) {
      alert("Completa todos los campos");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: form.correo,
          contrasenna: form.contrasena,
        }),
      });

      if (!response.ok) {
        const msg = await response.text();
        alert(msg || "Credenciales incorrectas");
        setLoading(false);
        return;
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));

      navigate("/");

    } catch (error) {
      alert("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const formDataWithHandlers = loginData.map((item, index) => {
    if (item.type === "inputs") {
      return {
        ...item,
        inputs: item.inputs.map((input) => ({
          ...input,
          value: form[input.name] || "",
          onChange: handleChange,
        })),
      };
    }

    if (item.type === "button") {
      return {
        ...item,
        key: index,
        onClick: handleSubmit,
        disabled: loading,
        text: loading ? "Iniciando..." : item.text,
      };
    }

    if (item.type === "text" && item.text[0]?.content === "create-user-link") {
      return {
        ...item,
        key: index,
        text: [
          {
            ...item.text[0],
            content: (
              <Link to="/register" className="text-decoration-underline">
                Crear usuario
              </Link>
            ),
          },
        ],
      };
    }

    return { ...item, key: index };
  });

  return (
    <main className="bg-transparent d-flex align-items-center justify-content-center min-vh-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow w-100"
        style={{ maxWidth: "420px" }}
      >
        <Forms content={formDataWithHandlers} />
      </form>
    </main>
  );
};

export default Login;
