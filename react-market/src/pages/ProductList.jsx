import ListEntities from "../components/ListEntites";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import useFetch from "../hook/useFetch";
import ProductListBody from "../components/ProductListBody";

export default function ProductList() {
  // // Fetch Data
  // const [fetchData, setData] = useState(0);

  // const [pageNumber, setPageNumber] = useState(0);
  // const pageSize = 10;

  // const url = `http://localhost:8080/rest/api/product/list/product?pageNumber=${pageNumber}&pageSize=${pageSize}&columnName=id&asc=true`;

  // const requestMethod = "GET";
  // const jsonPath = ["payload", "content"];
  // const deleteFields = ["createTime", "brand", "presented"];

  // const request = useFetch(url, requestMethod, jsonPath, deleteFields);

  // useEffect(() => {
  //   fetch(url, {
  //     method: requestMethod,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("HTTP error " + response.status);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       data = data.payload.content;

  //       for (let items of data) {
  //         delete items["brand"];
  //       }

  //       setData(data);
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error("Fetch error:", error);
  //     });
  // }, []);

  // const pageJsonPath = ["payload", "totalElements"];
  // const pageTotalElements = useFetch(url, requestMethod, pageJsonPath);

  // const maxPage = Math.floor(pageTotalElements / pageSize); // 2

  // const metadata = { maxpage: maxPage, pagenumber: pageNumber };
  // // ------------ \\

  // // Butonlara işlevsellik listesi:::

  // function nextPage() {
  //   if (pageNumber != maxPage) {
  //     setPageNumber(pageNumber + 1);
  //     console.log("pageNumber:", pageNumber);
  //   }
  // }
  // function previousPage() {
  //   if (pageNumber > 0) {
  //     setPageNumber(pageNumber - 1);
  //     console.log("pageNumber:", pageNumber);
  //   }
  // }

  // const buttonFuncs = { nextpage: nextPage, previouspage: previousPage };
  // // ------------------ \\

  // if (request === null) {
  //   return <p>Yükleniyor...</p>;
  // }

  return (
    <>
      <Navbar />
      <ProductListBody />
      {/* <ListEntities
        data={request}
        tableHead={tableHead}
        UIFiliter={UIFiliter}
        buttonFuncs={buttonFuncs}
        metadata={metadata}
      /> */}
    </>
  );
}
