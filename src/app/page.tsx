"use client";
import styles from "./page.module.css";
import logo from "./assets/logo.png";
import { TextField } from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
import { login, loginWithGoogle } from "./axios";

export default function Home() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChangeEmail = (e) => {
    const content = e.target.value;
    setFormData({
      ...formData,
      email: content,
    });
  };

  const handleChangePassword = (e) => {
    const content = e.target.value;
    setFormData({
      ...formData,
      password: content,
    });
  };

  const handleSubmitLoginUser = async () => {
    try {
      const response = await login(formData);
      if (response.acess=== true) {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        window.location.href = "/mainPage"; 
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.imgArea}>
        <div className={styles.containerImg}>
          <img src={logo.src} />
        </div>
      </div>
      <div className={styles.inputArea}>
        <TextField
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          onChange={handleChangeEmail}
        />
        <TextField
          id="outlined-basic"
          label="Senha"
          variant="outlined"
          onChange={handleChangePassword}
        />
      </div>
      <div className={styles.googleAuthArea}>
        <button type="button" className={styles.loginWithGoogleBtn} onClick={loginWithGoogle}>
          Entrar com o Google
        </button>
      </div>
      <div className={styles.buttonArea}>
        <Link href="/createAccountPage">
          <Button variant="text">Criar sua conta</Button>
        </Link>
        <Button variant="contained" onClick={handleSubmitLoginUser}>
          Avançar
        </Button>
      </div>
    </main>
  );
}
