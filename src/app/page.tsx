import styles from "./page.module.css";
import logo from "./assets/logo.png";

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.imgArea}>
        <div className={styles.containerImg}>
          <img src={logo.src} />
        </div>
      </div>
      <div className={styles.inputArea}>
        <TextField id="outlined-basic" label="E-mail" variant="outlined" />
        <TextField id="outlined-basic" label="Senha" variant="outlined" />
      </div>
      <div className={styles.googleAuthArea}>
        <button type="button" className={styles.loginWithGoogleBtn}>
          Entrar com o Google
        </button>
      </div>
      <div className={styles.buttonArea}>
        <Link href="/createAccountPage">
          <Button variant="text">Criar sua conta</Button>
        </Link>

        <Button variant="contained">Avançar</Button>
      </div>
    </main>
  );
}
