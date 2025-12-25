import { useState } from "react";
import ListEntities from "../components/ListEntites";
import Navbar from "../components/Navbar";
import useFetch from "../hook/useFetch";

export default function FreshProductList() {
  // Fetch Data
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 10;

  const url = `http://localhost:8080/rest/api/freshProduce/list/freshProduce?pageNumber=${pageNumber}&pageSize=${pageSize}&columnName=id&asc=true`;
  const requestMethod = "GET";
  const jsonPath = ["payload", "content"];
  const deleteFields = ["createTime", "brand", "presented"];

  const request = useFetch(url, requestMethod, jsonPath, deleteFields);
  console.log("Fetched Data:", request);

  const pageJsonPath = ["payload", "totalElements"];
  const pageTotalElements = useFetch(url, requestMethod, pageJsonPath);

  const maxPage = Math.floor(pageTotalElements / pageSize);

  const metadata = { maxpage: maxPage, pagenumber: pageNumber };

  // ------------ \\

  const tablehead = [
    "Numara",
    "Adı",
    "Kalan Miktar",
    "Birim",
    "Alım Fiyatı",
    "Satış Fiyatı",
  ];

  const UIFiliter = ["id"];
  // -------------------------- \\

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
        tableHead={tablehead}
        UIFiliter={UIFiliter}
        buttonFuncs={buttonFuncs}
        metadata={metadata}
      />
    </>
  );
}
