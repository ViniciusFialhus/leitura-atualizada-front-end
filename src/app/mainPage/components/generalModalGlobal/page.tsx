"use client";
import style from "./page.module.css";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

export default function GeneralModalGlobal({
  setProp,
  type,
}: {
  setProp?: any;
  type?: "editUser" | "editBook" | "createBook";
}) {
  return (
    <main className={style.containerMain}>
      <div className={style.containerForm}>
        <div className={style.titleArea}>
          <h1>
            {type === "editUser"
              ? "Edição de Usuario"
              : type === "editBook"
              ? "Edição de Livro"
              : type === "createBook"
              ? "Criação de Livro"
              : ""}
          </h1>
          <span className="material-icons" onClick={() => setProp(false)}>
            close
          </span>
        </div>
        <div className={style.inputArea}>
          <TextField
            id="outlined-basic"
            label={
              type === "editUser"
                ? "Nome do Usuario"
                : type === "editBook"
                ? "Nome do Livro"
                : type === "createBook"
                ? "Nome do Livro"
                : ""
            }
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label={
              type === "editUser"
                ? "E-mail"
                : type === "editBook"
                ? "Autor"
                : type === "createBook"
                ? "Autor"
                : ""
            }
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label={
              type === "editUser"
                ? "Senha"
                : type === "editBook"
                ? "Genéro"
                : type === "createBook"
                ? "Genéro"
                : ""
            }
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label={
              type === "editUser"
                ? "Confirmar Senha"
                : type === "editBook"
                ? "Descrição"
                : type === "createBook"
                ? "Descrição"
                : ""
            }
            variant="outlined"
          />
        </div>
        <div className={style.buttonArea}>
          <Button variant="contained">
            {type === "editUser"
              ? "Editar"
              : type === "editBook"
              ? "Editar"
              : type === "createBook"
              ? "Criar"
              : ""}
          </Button>
        </div>
      </div>
    </main>
  );
}
