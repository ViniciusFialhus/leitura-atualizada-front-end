"use client";
import { TextField } from "@mui/material";
import style from "./page.module.css";
import Button from "@mui/material/Button";
import {
  getUser,
  putUser,
  getBooksForID,
  putBooks,
  postBooks,
} from "@/app/axios";
import { useState, useEffect } from "react";

export default function GeneralModalGlobal({
  setProp,
  type,
  bookId,
}: {
  setProp?: any;
  type?: "editUser" | "editBook" | "createBook";
  bookId?: any;
}) {
  const [selectedBook, setSelectedBook] = useState({});
  const [updateBook, setUpdateBook] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    isbn: "",
    imgUrl: "",
    status: "",
    publishedAt: "",
    createdAt: "",
    updatedAt: "",
  });
  const [createBook, setCreateBook] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    isbn: "",
    imgUrl: "",
    status: "",
    publishedAt: "",
    createdAt: "",
    updatedAt: "",
  });
  const [loogedUser, setLoogedUser] = useState({
    id: "",
    name: "",
    email: "",
    isAdm: false,
    password: "",
    username: "",
    createdAt: "",
    updatedAt: "",
    shareableHash: "",
    refreshToken: "",
  });

  const [updateLoogedUser, setUpdateLoogedUser] = useState({
    id: "",
    name: "",
    email: "",
    isAdm: false,
    password: "",
    username: "",
    createdAt: "",
    updatedAt: "",
    shareableHash: "",
    refreshToken: "",
  });

  const handleChangeOneTestField = (e: any) => {
    const content = e.target.value;
    e.preventDefault();
    if (type === "editUser") {
      setUpdateLoogedUser({
        ...updateLoogedUser,
        name: content,
      });
    } else if (type === "editBook") {
      setUpdateBook({
        ...updateBook,
        title: content,
      });
      console.log(e);
    } else if (type === "createBook") {
      setCreateBook({
        ...createBook,
        title: content,
      });
    }
  };

  const handleChangeTwoTestField = (e) => {
    const content = e.target.value;
    if (type === "editUser") {
      setUpdateLoogedUser({
        ...updateLoogedUser,
        email: content,
      });
    } else if (type === "editBook") {
      setUpdateBook({
        ...updateBook,
        author: content,
      });
    } else if (type === "createBook") {
      setCreateBook({
        ...createBook,
        author: content,
      });
    }
  };

  const handleChangeTreeTestField = (e) => {
    const content = e.target.value;
    if (type === "editUser") {
      setUpdateLoogedUser({
        ...updateLoogedUser,
        username: content,
      });
    } else if (type === "editBook") {
      setUpdateBook({
        ...updateBook,
        genre: content,
      });
    } else if (type === "createBook") {
      setCreateBook({
        ...createBook,
        genre: content,
      });
    }
  };

  const handleChangeFourTestField = (e) => {
    const content = e.target.value;
    if (type === "editUser") {
      setUpdateLoogedUser({
        ...updateLoogedUser,
        password: content,
      });
    } else if (type === "editBook") {
      setUpdateBook({
        ...updateBook,
        description: content,
      });
    } else if (type === "createBook") {
      setCreateBook({
        ...createBook,
        description: content,
      });
    }
  };

  const handleChangeISBNBookCreate = (e) => {
    const content = e.target.value;
    setCreateBook({
      ...createBook,
      isbn: content,
    });
  };

  const handleChangeDataBookCreate = (e) => {
    const content = e.target.value;
    setCreateBook({
      ...createBook,
      publishedAt: content,
    });
  };

  const handleChangeImgUrlBookCreate = (e) => {
    const content = e.target.value;
    setCreateBook({
      ...createBook,
      imgUrl: content,
    });
  };

  const handleSubmitUpdateUser = async () => {
    try {
      if (loogedUser.password === updateLoogedUser.password) {
        const token = localStorage.getItem("token");
        const response =  await putUser(token, updateLoogedUser);
        if (response) {
          window.location.reload();
        }
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitUpdateBook = async (bookId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await putBooks(token, bookId, updateBook);
      if (response) {
        window.location.reload();
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitCreateBook = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await postBooks(token, createBook);
      if (response) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const axiosGetBooksForID = async () => {
      try {
        const token = localStorage.getItem("token");
        const booksAPI = await getBooksForID(token, bookId);
        setSelectedBook(booksAPI);
      } catch (error) {
        console.error("Erro ao buscar livros por ID:", error);
      }
    };

    axiosGetBooksForID();
  }, []);

  useEffect(() => {
    const AxiosGetUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const UserAPI = await getUser(token);
        setLoogedUser(UserAPI);
      } catch (error) {
        console.error("Erro ao buscar User:", error);
      }
    };
    AxiosGetUser();
  }, []);

  useEffect(() => {
    setUpdateBook({
      id: selectedBook.id,
      title: selectedBook.title,
      author: selectedBook.author,
      genre: selectedBook.genre,
      description: selectedBook.description,
      isbn: selectedBook.isbn,
      imgUrl: selectedBook.imgUrl,
      status: selectedBook.status,
      publishedAt: selectedBook.publishedAt,
      createdAt: selectedBook.createdAt,
      updatedAt: selectedBook.updatedAt,
    });
  }, [selectedBook]);

  return (
    <main className={style.containerMain}>
      <div
        className={`${style.containerForm} ${
          type === "createBook" ? style.containerFormCreateBook : ""
        }`}
      >
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
            defaultValue={
              type === "editUser"
                ? loogedUser.name
                : type === "editBook"
                ? updateBook.title
                : ""
            }
            variant="outlined"
            onChange={handleChangeOneTestField}
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
            defaultValue={
              type === "editUser"
                ? loogedUser.email
                : type === "editBook"
                ? updateBook.author
                : ""
            }
            variant="outlined"
            onChange={handleChangeTwoTestField}
          />
          <TextField
            id="outlined-basic"
            label={
              type === "editUser"
                ? "Username"
                : type === "editBook"
                ? "Genéro"
                : type === "createBook"
                ? "Genéro"
                : ""
            }
            defaultValue={
              type === "editUser"
                ? loogedUser.username
                : type === "editBook"
                ? updateBook.genre
                : ""
            }
            variant="outlined"
            onChange={handleChangeTreeTestField}
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
            defaultValue={
              type === "editUser"
                ? ""
                : type === "editBook"
                ? updateBook.description
                : ""
            }
            variant="outlined"
            onChange={handleChangeFourTestField}
          />
          {type === "createBook" && (
            <>
              <TextField
                id="outlined-isbn"
                label="ISBN"
                defaultValue=""
                variant="outlined"
                onChange={(e) => handleChangeISBNBookCreate(e)}
              />
              <TextField
                id="outlined-isbn"
                label="Data de Publicação"
                defaultValue=""
                variant="outlined"
                onChange={(e) => handleChangeDataBookCreate(e)}
              />
              <TextField
                id="outlined-isbn"
                label="URL da Imagem "
                defaultValue=""
                variant="outlined"
                onChange={(e) => handleChangeImgUrlBookCreate(e)}
              />
            </>
          )}
        </div>
        <div className={style.buttonArea}>
          <Button
            variant="contained"
            onClick={() => {
              if (type === "editUser") {
                handleSubmitUpdateUser();
              } else if (type === "editBook") {
                handleSubmitUpdateBook(bookId);
              } else if (type === "createBook") {
                handleSubmitCreateBook();
              } else {
                console.log("Tipo não reconhecido");
              }
            }}
          >
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
