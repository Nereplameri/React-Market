import ListEntities from "../components/ListEntites";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import useFetch from "../hook/useFetch";

export default function ProductList() {
  // Fetch Data

  const [fetchData, setData] = useState([{}]);

  const url =
    "http://localhost:8080/rest/api/product/list/product?pageNumber=0&pageSize=10&columnName=id&asc=true";
  const requestMethod = "GET";
  const jsonPath = ["payload", "content"];
  const deleteFields = ["createTime", "brand", "presented"];

  const request = useFetch(url, requestMethod, jsonPath, deleteFields);
  console.log("Fetched Data:", request);

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
      />
    </>
  );
}
