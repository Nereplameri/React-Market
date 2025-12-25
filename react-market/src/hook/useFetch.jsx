import { useEffect, useState } from "react";

export default function useFetch(
  url,
  requestMethod,
  jsonPath,
  deleteFields = [],
  requestBody = {}
) {
  const [fetchData, setData] = useState(null);

  function routToJsonPath(data) {
    for (let i of jsonPath) {
      data = data[i];
    }
    return data;
  }

  function jsonDeleteField(data) {
    for (let items of data) {
      for (let taboo of deleteFields) {
        delete items[taboo];
      }
    }
    return data;
  }

  useEffect(() => {
    fetch(url, {
      method: requestMethod,
      headers: {
        "Content-Type": "application/json",
      },
      ...(requestMethod !== "GET" && { body: JSON.stringify(requestBody) }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        // JSON içi yolu bulmakta kullanılıyor. Yapabiliyorsan temiz kod için fonksiyona al.

        data = routToJsonPath(data);
        data = jsonDeleteField(data);

        setData(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [url]);
  return fetchData;
}
