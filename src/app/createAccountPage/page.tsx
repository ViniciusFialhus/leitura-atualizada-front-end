"use client";
import styles from "../page.module.css";
import logo from "../assets/logo.png";
import { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import { registerUser } from "../axios";

export default function createAccountPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isAdm: false,
    password: "",
    username: "",
  });

  const handleChangeName = (e) => {
    const content = e.target.value;
    setFormData({
      ...formData,
      name: content,
    });
  };

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

  const handleChangeUsername = (e) => {
    const content = e.target.value;
    setFormData({
      ...formData,
      username: content,
    });
  };

  const handleSubmitCreateUser = async () => {
    try {
      const response = await registerUser(formData)
      if (response === true) { 
        window.location.href = '/'; 
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <main className={styles.main}>
        <div className={styles.imgArea}>
          <div className={styles.containerImg}>
            <img src={logo.src} />
          </div>
        </div>
        <div className={styles.inputArea} style={{ height: "45%" }}>
        <TextField
            id="outlined-basic"
            label="Nome Completo"
            variant="outlined"
            onChange={handleChangeName}
          />
          <TextField
            id="outlined-basic"
            label="Nome de Usuario"
            variant="outlined"
            onChange={handleChangeUsername}
          />
          <TextField
            id="outlined-basic"
            label="E-mail"
            variant="outlined"
            onChange={handleChangeEmail}
          />
          <TextField id="outlined-basic" label="Senha" variant="outlined" onChange={handleChangePassword}/>
        </div>
        <div className={styles.googleAuthArea}>
          <button type="button" className={styles.loginWithGoogleBtn}>
            Crie sua conta com o Google
          </button>
        </div>
        <div
          className={styles.buttonArea}
          style={{ marginTop: "0px", marginBottom: "15px" }}
        >
          <Link href="/">
            <Button variant="text">Logar-se</Button>
          </Link>
          <Button variant="contained" onClick={handleSubmitCreateUser}>Avançar</Button>
        </div>
      </main>
    </main>
  );
}
