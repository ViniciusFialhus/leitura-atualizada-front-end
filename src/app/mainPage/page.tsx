"use client";
import style from "./page.module.css";
import logo from "../assets/logo.png";
import { useState, useRef, useEffect } from "react";
import { getBooks } from "../axios";
import ListBook from "./components/listBooks/listbooks";
import GeneralModal from "./components/generalModal/GeneralModal";
import GeneralModalGlobal from "./components/generalModalGlobal/page";

import { getUser, loginRefresh } from "../axios";

export default function MainPage() {
  const [fillOrOutlinePerson, setFillOrOutlinePerson] = useState(false);
  const [fillOrOutlineBook, setFillOrOutlineBook] = useState(false);
  const [fillOrOutlineError, setFillOrOutlineError] = useState(false);
  const [modalShowPerson, setModalShowPerson] = useState(false);
  const [modalShowBook, setModalShowBook] = useState(false);
  const [modalCreateBook, setModalCreateBook] = useState(false);
  const [filterInput, setFilterInput] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState();
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

  const refPerson = useRef(null);

  const handleClickFillOrOutlinePerson = () => {
    if (fillOrOutlinePerson === false) {
      setFillOrOutlinePerson(true);
      setFillOrOutlineBook(false);
      setFillOrOutlineError(false);
    }
  };

  const handleClickFillOrOutlineBook = () => {
    if (fillOrOutlineBook === false) {
      setFillOrOutlineBook(true);
      setFillOrOutlinePerson(false);
      setFillOrOutlineError(false);
    }
  };

  const handleClickFillOrOutlineError = () => {
    if (fillOrOutlineError === false) {
      setFillOrOutlineBook(false);
      setFillOrOutlinePerson(false);
      setFillOrOutlineError(true);
    }
  };

  const filteredBooks = books.filter((book) => {
    const bookField = book[filterInput].toString().toLowerCase();
    return bookField.includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (refPerson.current && !refPerson.current.contains(event.target)) {
        setFillOrOutlinePerson(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
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
    const axiosGetBooks = async () => {
      try {
        const booksAPI = await getBooks();
        setBooks(booksAPI);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    };

    axiosGetBooks();
  }, []);

  useEffect(() => {
    const refreshToken = async () => {
      const token = localStorage.getItem("refreshToken");
      if (token) {
        await loginRefresh(token);
      }
    };
    refreshToken();
    const interval = setInterval(refreshToken, 240000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className={style.containerMain}>
      {modalCreateBook ? (
        <GeneralModalGlobal setProp={setModalCreateBook} type={"createBook"} />
      ) : null}
      {modalShowPerson ? (
        <GeneralModalGlobal setProp={setModalShowPerson} type={"editUser"} />
      ) : null}
      {modalShowBook ? (
        <GeneralModalGlobal
          setProp={setModalShowBook}
          type={"editBook"}
          bookId={bookId}
        />
      ) : null}
      {fillOrOutlinePerson ? (
        <GeneralModal
          type={"person"}
          setProp={setModalShowPerson}
          css={{
            left: loogedUser.isAdm ? "815px" : "853px",
          }}
        />
      ) : null}
      {fillOrOutlineError ? (
        <GeneralModal
          type={"loans"}
          setProp={setModalShowPerson}
          css={{
            left: "855px",
            height: "200px",
            bottom: "350px",
            width: "300px",
          }}
          cssDetail={{ bottom: "200px" }}
          onClose={setFillOrOutlineError}
        />
      ) : null}
      {fillOrOutlineBook ? (
        <GeneralModal
          css={{
            left: loogedUser.isAdm ? "777px" : "825px",
            height: "200px",
            bottom: "350px",
            width: "300px",
          }}
          cssDetail={{ bottom: "200px" }}
          type={"book"}
          onClose={setFillOrOutlineBook}
        />
      ) : null}
      <header className={style.headerArea}>
        <div className={style.containerLogo}>
          <img src={logo.src} alt="logo" />
        </div>
        <div className={style.containerSearch}>
          <select onChange={(e) => setFilterInput(e.target.value)}>
            <option value="title">Titulo</option>
            <option value="author">Autor</option>
            <option value="gender">Gênero</option>
          </select>
          <input type="text" onChange={(e) => setSearchTerm(e.target.value)} />
          <span className="material-icons">search</span>
        </div>
        <div
          className={style.containerIcons}
          style={{
            justifyContent: loogedUser.isAdm ? "space-around" : "space-evenly",
          }}
        >
          <span
            className={
              fillOrOutlinePerson ? "material-icons" : "material-icons-outlined"
            }
            onClick={handleClickFillOrOutlinePerson}
            ref={refPerson}
          >
            account_circle
          </span>
          <span
            className={
              fillOrOutlineBook ? "material-icons" : "material-icons-outlined"
            }
            onClick={handleClickFillOrOutlineBook}
          >
            book
          </span>
          {loogedUser.isAdm && (
            <span
              className={
                fillOrOutlineError
                  ? "material-icons"
                  : "material-icons-outlined"
              }
              onClick={handleClickFillOrOutlineError}
            >
              notifications
            </span>
          )}
        </div>
      </header>
      <section className={style.containerListBook}>
        <ListBook
          setProp={setModalShowBook}
          twoSetProp={setModalCreateBook}
          setBookId={setBookId}
          books={filteredBooks}
        />
      </section>
    </main>
  );
}
