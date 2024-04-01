"use client";
import style from "./page.module.css";
import ModalFilter from "./components/modalFilter";
import { useState } from "react";
import bookDefault from "./assets/bookDefault.jpg";

export default function ListBook({ setProp, twoSetProp }: { setProp?: any,  twoSetProp:any }) {
  const [clickedFilter, setClickedFilter] = useState(false);
  const [whoClickedFilter, setWhoClickedFilter] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("none");
  const [selectedData, setSelectedData] = useState("none");

  const handleClickWhoClickedStatus = () => {
    if (!clickedFilter && whoClickedFilter === "") {
      setClickedFilter(true);
      setWhoClickedFilter("Status");
    }
  };

  const handleClickWhoClickedData = () => {
    if (!clickedFilter && whoClickedFilter === "") {
      setClickedFilter(true);
      setWhoClickedFilter("Data");
    }
  };

  const books = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "9780743273565",
      imageUrl: "https://example.com/gatsby.jpg",
      genre: "Novel",
      description:
        "A portrait of the Jazz Age in all of its decadence and excess.",
      publishedAt: "1925-04-10",
    },
    {
      title: "1984",
      author: "George Orwell",
      isbn: "9780451524935",
      imageUrl: "https://example.com/1984.jpg",
      genre: "Dystopian",
      description:
        "A dystopian social science fiction novel and cautionary tale.",
      publishedAt: "1949-06-08",
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "9780061120084",
      imageUrl: "https://example.com/mockingbird.jpg",
      genre: "Novel",
      description:
        "A novel about the serious issues of rape and racial inequality.",
      publishedAt: "1960-07-11",
    },
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      isbn: "9780316769488",
      imageUrl: "https://example.com/catcher.jpg",
      genre: "Fiction",
      description: "A story about adolescent alienation and loss of innocence.",
      publishedAt: "1951-07-16",
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      isbn: "9780679783268",
      imageUrl: "https://example.com/pride.jpg",
      genre: "Novel",
      description: "A romantic novel of manners.",
      publishedAt: "1813-01-28",
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      isbn: "9780547928227",
      imageUrl: "https://example.com/hobbit.jpg",
      genre: "Fantasy",
      description:
        "A children's fantasy novel and prelude to The Lord of the Rings.",
      publishedAt: "1937-09-21",
    },
    {
      title: "Moby-Dick",
      author: "Herman Melville",
      isbn: "9781503280786",
      imageUrl: "https://example.com/mobydick.jpg",
      genre: "Novel",
      description:
        "An epic sea story of Captain Ahab's voyage in pursuit of a white whale.",
      publishedAt: "1851-10-18",
    },
    {
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      isbn: "9780544003415",
      imageUrl: "https://example.com/lotr.jpg",
      genre: "Fantasy",
      description: "An epic high fantasy novel.",
      publishedAt: "1954-07-29",
    },
    {
      title: "Jane Eyre",
      author: "Charlotte Brontë",
      isbn: "9780142437209",
      imageUrl: "https://example.com/janeeyre.jpg",
      genre: "Novel",
      description:
        "A novel that revolutionized prose fiction by being the first to focus on its protagonist's moral and spiritual development.",
      publishedAt: "1847-10-16",
    },
    {
      title: "The Adventures of Huckleberry Finn",
      author: "Mark Twain",
      isbn: "9780486280615",
      imageUrl: "https://example.com/huckfinn.jpg",
      genre: "Fiction",
      description:
        "A novel about a boy's journey down the Mississippi River with an escaped slave.",
      publishedAt: "1884-12-10",
    },
  ];

  return (
    <main className={style.containerListBook}>
      <div className={style.headerFilter}>
        <div className={style.containerListFilter}>
          <div
            className={
              selectedStatus === "none"
                ? style.inputStatus
                : selectedStatus === "free"
                ? style.inputStatusFree
                : selectedStatus === "analysis"
                ? style.inputStatusAnalysis
                : selectedStatus === "borroweb"
                ? style.inputStatusBorrowed
                : ""
            }
            onClick={handleClickWhoClickedStatus}
          >
            <div>
              {selectedStatus === "none"
                ? "Status de Emprestimo"
                : selectedStatus === "free"
                ? "Livre"
                : selectedStatus === "analysis"
                ? "Em Analise"
                : selectedStatus === "borroweb"
                ? "Emprestado"
                : ""}
            </div>
            <span
              className="material-icons"
              style={selectedStatus === "none" ? {} : { display: "none" }}
            >
              arrow_drop_down
            </span>
          </div>
          <div
            className={style.inputStatus}
            onClick={handleClickWhoClickedData}
          >
            <div>
              {selectedData === "none"
                ? "Modificação"
                : selectedData === "today"
                ? "Hoje"
                : selectedData === "lastSixDays"
                ? "Ultimos Seis Dias"
                : selectedData === "last30Days"
                ? "Ultimos 30 Dias"
                : selectedData === "thisYear"
                ? "Este Ano"
                : ""}
            </div>
            <span className="material-icons">arrow_drop_down</span>
          </div>
        </div>
        <span className="material-icons" onClick={() =>twoSetProp(true)}>add_circle</span>
      </div>
      <ModalFilter
        setClicked={setClickedFilter}
        nameClickedFilter={whoClickedFilter}
        setNameClickedFilter={setWhoClickedFilter}
        setSelectedStatus={setSelectedStatus}
        setSelectedData={setSelectedData}
      />
      <section className={style.listBook}>
        {books.map((book) => {
          return (
            <>
              <div className={style.book}>
                <div className={style.bookImg}>
                  <img src={bookDefault.src}></img>
                  <div>{book.publishedAt}</div>
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
                  <hr
                    className={style.hrHorizontal}
                    style={{ width: "100%" }}
                  />
                  <div className={style.containerAdm}>
                    <button>Excluir Livro</button>
                    <button onClick={() => setProp(true)}>Editar Livro</button>
                  </div>
                  <div className={style.containerUser}>
                    <button>Reservar Livro</button>
                  </div>
                  <hr
                    className={style.hrHorizontal}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </>
          );
        })}
      </section>
    </main>
  );
}
