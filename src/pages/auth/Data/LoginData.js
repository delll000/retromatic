const loginData = [
  {
    type: "title",
    text: "Inicia sesión en Retromatic",
  },
  {
    type: "text",
    text: [
      {
        variant: "p",
        className: "text-muted mb-0",
        before: "",
        content: "Ingresa tus credenciales para continuar",
        after: "",
      },
    ],
  },
  {
    type: "inputs",
    inputs: [
      {
        name: "correo",
        label: "Correo electrónico",
        type: "email",
        placeholder: "tuemail@ejemplo.com",
      },
      {
        name: "contrasena",
        label: "Contraseña",
        type: "password",
        placeholder: "Tu contraseña",
      },
    ],
  },
  {
    type: "button",
    text: "Iniciar sesión",
    variant: "primary",
  },
  {
    type: "text",
    text: [
      {
        variant: "small",
        className: "text-muted",
        before: "¿No tienes cuenta? ",
        content: "create-user-link",
        after: "",
      },
    ],
  },
];

export default loginData;
