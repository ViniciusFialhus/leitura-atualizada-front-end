import styles from "../page.module.css";
import logo from "../assets/logo.png";

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function createAccountPage() {
  return (
    <main>
      <main className={styles.main}>
        <div className={styles.imgArea}>
          <div className={styles.containerImg}>
            <img src={logo.src} />
          </div>
        </div>
        <div className={styles.inputArea} style={{ height: "45%" }}>
          <TextField id="outlined-basic" label="E-mail" variant="outlined" />
          <TextField id="outlined-basic" label="Senha" variant="outlined" />
          <TextField
            id="outlined-basic"
            label="Confirmar Senha"
            variant="outlined"
          />
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
          <Button variant="contained">Avançar</Button>
        </div>
      </main>
    </main>
  );
}
