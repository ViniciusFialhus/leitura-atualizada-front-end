"use client";
import style from "../generalModal/page.module.css";
import { useRef, useEffect, useState } from "react";
import {
  getWishlist,
  deleteWishlist,
  getLoans,
  postLoans,
  putLoans,
} from "@/app/axios";
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
  const [wishlist, setWishlist] = useState([]);
  const [loansList, setLoansList] = useState([]);
  const refPersonInside = useRef(null);

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

  useEffect(() => {
    const AxiosWishList = async () => {
      try {
        const token = localStorage.getItem("token");
        const wishListAPI = await getWishlist(token);
        setWishlist(wishListAPI);
      } catch (error) {
        console.error("Erro ao buscar Wishlist:", error);
      }
    };
    AxiosWishList();
  }, []);

  const deleteWishListBook = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await deleteWishlist(token, id);
      if (response) {
        window.location.reload();
      }
    } catch (error) {
      console.log(Error);
    }
  };

  useEffect(() => {
    const AxiosLoans = async () => {
      try {
        const token = localStorage.getItem("token");
        const loansAPI = await getLoans(token);
        setLoansList(loansAPI);
      } catch (error) {
        console.log("Loans Erro, ", Error);
      }
    };
    AxiosLoans();
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

  const aprovedLoans = async (loansID: string) => {
    try {
      const token = localStorage.getItem("token");
      const jsonAcess = { status: "approved" };
      const response = await putLoans(token, jsonAcess, loansID);
      if (response) {
        window.location.reload();
      }
    } catch (error) {
      console.log("Erro ao aprovar Loan", Error);
    }
  };

  const desaprovedLoans = async (loansID: string) => {
    try {
      const token = localStorage.getItem("token");
      const jsonAcess = { status: "rejected" };
      const response = await putLoans(token, jsonAcess, loansID);
      if (response) {
        window.location.reload();
      }
    } catch (error) {
      console.log("Erro ao negar Loans", Error);
    }
  };

  function formatedData(dataISO) {
    const dataObjeto = new Date(dataISO);
    const dia = dataObjeto.getUTCDate().toString().padStart(2, "0");
    const mes = (dataObjeto.getUTCMonth() + 1).toString().padStart(2, "0");
    const ano = dataObjeto.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
  }

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
          {wishlist.length === 0 ? (
            <div className={style.containerEmptyWishlist}>
              <h1>Sua lista de desejos está vazia</h1>
            </div>
          ) : (
            wishlist.map((detailsWishList) => (
              <div key={detailsWishList.id} className={style.containerWishlist}>
                <div className={style.containerImg}>
                  <img src={detailsWishList.imgUrl} alt="book" />
                </div>
                <hr className={style.horizontalHr} />
                <div className={style.containerDetails}>
                  <div>
                    <strong>Titulo:</strong>
                    {detailsWishList.title}
                  </div>
                  <div>
                    <strong>Autor:</strong>
                    {detailsWishList.author}
                  </div>
                  <div>
                    <strong>Gênero:</strong>
                    {detailsWishList.genre}
                  </div>
                  <div>
                    <strong>Status:</strong>
                    {detailsWishList.status === "AVAILABLE"
                      ? "Em Aberto"
                      : detailsWishList.status == "LOANED"
                      ? "Emprestado"
                      : ""}
                  </div>
                  <div className={style.containerButtonGeneralModal}>
                    <button
                      onClick={() =>
                        createLoans(detailsWishList.id, loogedUser.id)
                      }
                    >
                      Reservar Livro
                    </button>
                    <button
                      onClick={() => deleteWishListBook(detailsWishList.id)}
                    >
                      Remover Livro
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : type === "loans" ? (
        <div className={style.fatherContainerLoans}>
          {loansList
            .filter((loans) => loans.status === "PENDING")
            .map((detailedLoans) => {
              return (
                <>
                  <div className={style.containerLoans}>
                    <div className={style.containerImg}>
                      <img src={detailedLoans.book.imgUrl}></img>
                    </div>
                    <div className={style.detailsArea}>
                      <div>
                        <strong>Nome do Livro:</strong>
                        {detailedLoans.book.title}
                      </div>
                      <div>
                        <strong>Usuario Solicitante:</strong>
                        {detailedLoans.user.name}
                      </div>
                      <div>
                        <strong>Data de Pedido:</strong>
                        {formatedData(detailedLoans.createdAt)}
                      </div>
                      <div className={style.buttonArea}>
                        <button onClick={() => aprovedLoans(detailedLoans.id)}>Aprovado</button>
                        <button onClick={() => desaprovedLoans(detailedLoans.id)}>
                          Negado
                        </button>
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
