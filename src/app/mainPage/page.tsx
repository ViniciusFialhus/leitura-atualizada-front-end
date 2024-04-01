"use client";
import style from "./page.module.css";
import logo from "../assets/logo.png";
import { useState, useRef, useEffect } from "react";
import ListBook from "./components/listBooks/listbooks";
import GeneralModal from "./components/generalModal/GeneralModal";
import GeneralModalGlobal from "./components/generalModalGlobal/page";

export default function MainPage() {
  const [fillOrOutlinePerson, setFillOrOutlinePerson] = useState(false);
  const [fillOrOutlineBook, setFillOrOutlineBook] = useState(false);
  const [fillOrOutlineError, setFillOrOutlineError] = useState(false);
  const [modalShowPerson, setModalShowPerson] = useState(false);
  const [modalShowBook, setModalShowBook] = useState(false);
  const [modalCreateBook, setModalCreateBook] = useState(false);

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

  return (
    <main className={style.containerMain}>
      {modalCreateBook ? (
        <GeneralModalGlobal setProp={setModalCreateBook} type={"createBook"} />
      ) : null}
      {modalShowPerson ? (
        <GeneralModalGlobal setProp={setModalShowPerson} type={"editUser"} />
      ) : null}
      {modalShowBook ? (
        <GeneralModalGlobal setProp={setModalShowBook} type={"editBook"} />
      ) : null}
      {fillOrOutlinePerson ? (
        <GeneralModal
          type={"person"}
          setProp={setModalShowPerson}
          css={{
            left: "815px",
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
            left: "777px",
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
          <select>
            <option value="title">Titulo</option>
            <option value="author">Autor</option>
            <option value="gender">Gênero</option>
          </select>
          <input type="text" />
          <span className="material-icons">search</span>
        </div>
        <div className={style.containerIcons}>
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
          <span
            className={
              fillOrOutlineError ? "material-icons" : "material-icons-outlined"
            }
            onClick={handleClickFillOrOutlineError}
          >
            notifications
          </span>
        </div>
      </header>
      <section className={style.containerListBook}>
        <ListBook setProp={setModalShowBook} twoSetProp={setModalCreateBook} />
      </section>
    </main>
  );
}
