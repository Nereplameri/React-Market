import { useState } from "react";
import ListEntities from "../components/ListEntites";
import Navbar from "../components/Navbar";
import useFetch from "../hook/useFetch";

export default function FreshProductList() {
  // Fetch Data

  const [fetchData, setData] = useState([{}]);

  const url =
    "http://localhost:8080/rest/api/freshProduce/list/freshProduce?pageNumber=0&pageSize=10&columnName=id&asc=true";
  const requestMethod = "GET";
  const jsonPath = ["payload", "content"];
  const deleteFields = ["createTime", "brand", "presented"];

  const request = useFetch(url, requestMethod, jsonPath, deleteFields);
  console.log("Fetched Data:", request);

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
      />
    </>
  );
}
