import ListEntities from "../components/ListEntites";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import useFetch from "../hook/useFetch";

export default function ProductList() {
  // Fetch Data

  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 10;

  const url = `http://localhost:8080/rest/api/product/list/product?pageNumber=${pageNumber}&pageSize=${pageSize}&columnName=id&asc=true`;

  const requestMethod = "GET";
  const jsonPath = ["payload", "content"];
  const deleteFields = ["createTime", "brand", "presented"];

  const request = useFetch(url, requestMethod, jsonPath, deleteFields);

  const pageJsonPath = ["payload", "totalElements"];
  const pageTotalElements = useFetch(url, requestMethod, pageJsonPath);

  const maxPage = Math.floor(pageTotalElements / pageSize); // 2

  const metadata = { maxpage: maxPage, pagenumber: pageNumber };
  // ------------ \\

  // UI işlemi için gönderilen veriden filitrelenecek field 'ler
  const UIFiliter = ["id", "createTime"];

  // Tablo sütunlarının isimleri
  const tableHead = [
    "Numara",
    "Adı",
    "Satış ücreti",
    "Satış Ücreti",
    "Barkod",
    "Kalan ürün",
    "STT",
  ];

  // Butonlara işlevsellik listesi:::

  function nextPage() {
    if (pageNumber != maxPage) {
      setPageNumber(pageNumber + 1);
      console.log("pageNumber:", pageNumber);
    }
  }
  function previousPage() {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
      console.log("pageNumber:", pageNumber);
    }
  }

  const buttonFuncs = { nextpage: nextPage, previouspage: previousPage };
  // ------------------ \\

  if (request === null) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <>
      <Navbar />
      <ListEntities
        data={request}
        tableHead={tableHead}
        UIFiliter={UIFiliter}
        buttonFuncs={buttonFuncs}
        metadata={metadata}
      />
    </>
  );
}
