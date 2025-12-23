import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ mode }) => {
  const isLogin = mode === "login";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return <></>;
};

export default AuthForm;
