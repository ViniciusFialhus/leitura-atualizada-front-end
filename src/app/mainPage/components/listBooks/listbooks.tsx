"use client";
import style from "./page.module.css";
import ModalFilter from "./components/modalFilter";
import { useState, useEffect } from "react";
import { getUser, postWishlist, postLoans, deleteBooks } from "@/app/axios";

export default function ListBook({
  setProp,
  twoSetProp,
  setBookId,
  books,
}: {
  setProp?: any;
  twoSetProp: any;
  setBookId?: any;
  books: any;
}) {
  const [clickedFilter, setClickedFilter] = useState(false);
  const [whoClickedFilter, setWhoClickedFilter] = useState("");

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

  const handleAddWishList = async (index: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await postWishlist(token, index);
      if (response) {
        window.location.reload();
      }
      return;
    } catch (error) {
      console.log(Error);
    }
  };

  const handleClickDeleteBook = async (bookId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await deleteBooks(token, bookId);
      if (response) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const createLoans = async (bookId: string, userId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await postLoans(token, bookId, userId);
      if (response) {
        window.location.reload();
      }
    } catch (error) {
      console.log("Erro ao criar pedido de emprestimo", Error);
    }
  };

  return (
    <main className={style.containerListBook}>
      <div className={style.headerFilter}>
        <div className={style.containerListFilter}></div>
        {loogedUser.isAdm && (
          <span className="material-icons" onClick={() => twoSetProp(true)}>
            add_circle
          </span>
        )}
      </div>
      <section className={style.listBook}>
        {books.map((book) => {
          return (
            <>
              <div className={style.book}>
                <div className={style.bookImg}>
                  <img src={book.imgUrl}></img>
                </div>
                <hr className={style.hrVertical} />
                <div className={style.detailArea}>
                  <div>
                    <strong>Titulo:</strong>
                    {book.title}
                  </div>
                  <div>
                    <strong>Author:</strong>
                    {book.author}
                  </div>
                  <div>
                    <strong>ISBN:</strong>
                    {book.isbn}
                  </div>
                  <div>
                    <strong>Gender:</strong>
                    {book.genre}
                  </div>

                  <div className={style.descriptionBook}>
                    {book.description}
                  </div>
                  <hr className={style.hrHorizontal} />
                </div>
                <div className={style.containerFunctions}>
                  <div className={style.containerStatus}>
                    <strong>Status:</strong>
                    {book.status === "AVAILABLE"
                      ? "Em Aberto"
                      : book.status == "LOANED"
                      ? "Emprestado"
                      : ""}
                  </div>
                  {loogedUser.isAdm && (
                    <div className={style.containerAdm}>
                      <button onClick={() => handleClickDeleteBook(book.id)}>
                        Excluir Livro
                      </button>
                      <button
                        onClick={() => {
                          setProp(true);
                          setBookId(book.id);
                        }}
                      >
                        Editar Livro
                      </button>
                    </div>
                  )}
                  <div className={style.containerUser}>
                    <button onClick={() => handleAddWishList(book.id)}>
                      Adicionar a Lista de Desejo
                    </button>
                    {book.status === "AVAILABLE" && (
                      <button
                        onClick={() => createLoans(book.id, loogedUser.id)}
                      >
                        Reservar Livro
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </section>
    </main>
  );
}
