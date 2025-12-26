import useFetch from "../hook/useFetch";

export default function FreshProductButtons(setItems) {
  const url =
    "http://localhost:8080/rest/api/freshProduce/list/freshProduce?pageNumber=0&pageSize=100&columnName=id&asc=true";
  const jsonPath = ["payload", "content"];

  const freshProductItemList = useFetch(url, "GET", jsonPath);

  console.log(freshProductItemList);

  if (freshProductItemList === null) {
    return <p>Yükleniyor...</p>;
  }
  return (
    <>
      {freshProductItemList.map((m) => {
        return (
          <div className="col-4 setFlexsMiddle mt-2">
            <button className="btn btn-primary h-100 w-100" id={m.id}>
              {m.name}
            </button>
          </div>
        );
      })}
    </>
  );
}
