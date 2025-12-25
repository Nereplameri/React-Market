import Navbar from "../components/Navbar";
import ListEntities from "../components/ListEntites";
import { useState } from "react";
import useFetch from "../hook/useFetch";

export default function BrandList() {
  // Fetch Data

  const [fetchData, setData] = useState([{}]);

  const url =
    "http://localhost:8080/rest/api/brand/list/brand?pageNumber=0&pageSize=10&columnName=id&asc=true";
  const requestMethod = "GET";
  const jsonPath = ["payload", "content"];
  const deleteFields = ["createTime", "brand", "presented"];

  const request = useFetch(url, requestMethod, jsonPath, deleteFields);
  console.log("Fetched Data:", request);

  // ------------ \\

  const listHeads = ["Numara", "Adı", "Telefon Numarası", "Email"];

  const UIFiliter = ["id"];

  if (request === null) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <>
      <Navbar />
      <ListEntities
        data={request}
        tableHead={listHeads}
        UIFiliter={UIFiliter}
      />
    </>
  );
}
