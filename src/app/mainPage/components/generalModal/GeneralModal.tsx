import style from "../generalModal/page.module.css";
import bookDefault from "../../components/listBooks/assets/bookDefault.jpg";
import { useRef, useEffect } from "react";
export default function GeneralModal({
  css,
  cssDetail,
  type,
  setProp,
  onClose,
}: {
  css?: any;
  cssDetail?: any;
  type: any;
  setProp?: any;
  onClose?: any;
}) {
  const refPersonInside = useRef(null);
  const detailedLoans = [
    {
      userId: "user01",
      book: {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "9780743273565",
        imageUrl: "https://example.com/gatsby.jpg",
        genre: "Novel",
        description:
          "A portrait of the Jazz Age in all of its decadence and excess.",
        publishedAt: new Date("1925-04-10"),
      },
    },
    {
      userId: "user02",
      book: {
        title: "1984",
        author: "George Orwell",
        isbn: "9780451524935",
        imageUrl: "https://example.com/1984.jpg",
        genre: "Dystopian",
        description:
          "A dystopian social science fiction novel and cautionary tale.",
        publishedAt: new Date("1949-06-08"),
      },
    },
    {
      userId: "user03",
      book: {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        isbn: "9780061120084",
        imageUrl: "https://example.com/mockingbird.jpg",
        genre: "Novel",
        description:
          "A novel about the serious issues of rape and racial inequality.",
        publishedAt: new Date("1960-07-11"),
      },
    },
    {
      userId: "user04",
      book: {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        isbn: "9780316769488",
        imageUrl: "https://example.com/catcher.jpg",
        genre: "Fiction",
        description:
          "A story about adolescent alienation and loss of innocence.",
        publishedAt: new Date("1951-07-16"),
      },
    },
    {
      userId: "user05",
      book: {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        isbn: "9780679783268",
        imageUrl: "https://example.com/pride.jpg",
        genre: "Novel",
        description: "A romantic novel of manners.",
        publishedAt: new Date("1813-01-28"),
      },
    },
    {
      userId: "user06",
      book: {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        isbn: "9780547928227",
        imageUrl: "https://example.com/hobbit.jpg",
        genre: "Fantasy",
        description:
          "A children's fantasy novel and prelude to The Lord of the Rings.",
        publishedAt: new Date("1937-09-21"),
      },
    },
    {
      userId: "user07",
      book: {
        title: "Moby-Dick",
        author: "Herman Melville",
        isbn: "9781503280786",
        imageUrl: "https://example.com/mobydick.jpg",
        genre: "Novel",
        description:
          "An epic sea story of Captain Ahab's voyage in pursuit of a white whale.",
        publishedAt: new Date("1851-10-18"),
      },
    },
    {
      userId: "user08",
      book: {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        isbn: "9780544003415",
        imageUrl: "https://example.com/lotr.jpg",
        genre: "Fantasy",
        description: "An epic high fantasy novel.",
        publishedAt: new Date("1954-07-29"),
      },
    },
    {
      userId: "user09",
      book: {
        title: "Jane Eyre",
        author: "Charlotte Brontë",
        isbn: "9780142437209",
        imageUrl: "https://example.com/janeeyre.jpg",
        genre: "Novel",
        description:
          "A novel that revolutionized prose fiction by being the first to focus on its protagonist's moral and spiritual development.",
        publishedAt: new Date("1847-10-16"),
      },
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        refPersonInside.current &&
        !refPersonInside.current.contains(event.target)
      ) {
        onClose(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <main className={style.containerMain} style={css} ref={refPersonInside}>
      <div className={style.details} style={cssDetail}></div>
      {type === "person" ? (
        <div className={style.fatherContainer}>
          <button onClick={() => setProp(true)}>
            Editar Informações da Conta
          </button>
          <button>Copiar link de Desejos</button>
        </div>
      ) : type === "book" ? (
        <div className={style.fatherContainerLoans}>
          {detailedLoans.map((detailedLoans) => {
            return (
              <>
                <div className={style.containerLoans}>
                  <div className={style.containerImg}>
                    <img src={bookDefault.src} alt="book" />
                  </div>
                  <hr className={style.horizontalHr} />
                  <div className={style.containerDetails}>
                    <div>
                      <strong>Titulo:</strong>
                      {detailedLoans.book.title}
                    </div>
                    <div>
                      <strong>Author:</strong>
                      {detailedLoans.book.author}
                    </div>
                    <div>
                      <strong>Gender:</strong>
                      {detailedLoans.book.genre}
                    </div>
                    <div>
                      <strong>Status:</strong>
                      Devolução em x dias
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      ) : type === "loans" ? (
        <div className={style.fatherContainerLoans}>
          {detailedLoans.map((detailedLoans) => {
            return (
              <>
                <div className={style.containerLoans}>
                  <div className={style.containerImg}>
                    <img src={bookDefault.src} alt="book" />
                  </div>
                  <hr className={style.horizontalHr} />
                  <div className={style.containerDetails}>
                    <div>
                      <strong>Titulo:</strong>
                      {detailedLoans.book.title}
                    </div>
                    <div>
                      <strong>Author:</strong>
                      {detailedLoans.book.author}
                    </div>
                    <div>
                      <strong>Gender:</strong>
                      {detailedLoans.book.genre}
                    </div>
                    <div>
                      <strong>Status:</strong>
                      Devolução em x dias
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </main>
  );
}
