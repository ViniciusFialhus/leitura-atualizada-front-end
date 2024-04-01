"use client";
import style from "./page.module.css";
import { useEffect, useRef } from "react";

export default function ModalFilter({
  setClicked,
  nameClickedFilter,
  setNameClickedFilter,
  setSelectedStatus,
  setSelectedData,
}: {
  setClicked: any;
  nameClickedFilter: any;
  setNameClickedFilter: any;
  setSelectedStatus: any;
  setSelectedData: any;
}) {
  const modalRef = useRef(null);
  const handleClose = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setClicked(false);
      setNameClickedFilter("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, []);

  return (
    <main className={style.mainBase} ref={modalRef}>
      {nameClickedFilter === "Status" && (
        <>
          <div className={style.details}></div>
          <div className={style.containerModal}>
            <div
              className={style.inputStatusFree}
              onClick={() => setSelectedStatus("free")}
            >
              Livre
            </div>
            <div
              className={style.inputStatusAnalysis}
              onClick={() => setSelectedStatus("analysis")}
            >
              Em Analise
            </div>
            <div
              className={style.inputStatusBorrowed}
              onClick={() => setSelectedStatus("borroweb")}
            >
              Emprestado
            </div>
          </div>
        </>
      )}
      {nameClickedFilter === "Data" && (
        <>
          <div className={style.details} style={{ marginLeft: "330px" }}></div>
          <div
            className={style.containerModal}
            style={{ marginLeft: "200px", height: "130px" }}
          >
            <div
              className={style.inputStatus}
              onClick={() => setSelectedData("today")}
            >
              Hoje
            </div>
            <div
              className={style.inputStatus}
              onClick={() => setSelectedData("lastSixDays")}
            >
              Ultimos sete dias
            </div>
            <div
              className={style.inputStatus}
              onClick={() => setSelectedData("last30Days")}
            >
              Ultimos 30 dias
            </div>
            <div
              className={style.inputStatus}
              onClick={() => setSelectedData("thisYear")}
            >
              Este ano
            </div>
          </div>
        </>
      )}
      
    </main>
  );
}
