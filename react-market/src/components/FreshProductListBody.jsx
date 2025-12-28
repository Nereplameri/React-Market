import { useEffect, useState } from "react";

export default function FreshProductListBody() {
  const [hamData, setData] = useState(); //List
  // --------------------Untainted data
  const [totalElements, setTotalElements] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 10;

  let url = `http://localhost:8080/rest/api/freshProduce/list/freshProduce?pageNumber=${pageNumber}&pageSize=${pageSize}&columnName=id&asc=true`;

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setTotalElements(data.payload.totalElements);

        setData(data.payload.content);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [url]);

  //  --------------------Untainted data

  const maxPage = Math.floor(totalElements / pageSize);

  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    quantity: "",
    unitType: "",
    unitPurchasePrice: "",
    unitSellPrice: "",
    brand: "",
  });

  // --------------------Buton Fonksiyonları

  function nextPage() {
    if (pageNumber != maxPage) {
      setPageNumber(pageNumber + 1);
    }
  }

  function previousPage() {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  }

  function clearSearch() {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setTotalElements(data.payload.totalElements);

        setData(data.payload.content);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  function searchByBarcode(e) {
    e.preventDefault();

    url = `http://localhost:8080/rest/api/freshProduce/getByName/${e.target.childNodes[0].value}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        data = data.payload;
        if (data.length === 0) {
          alert("Eşleşen içerik bulunamadı");
        }
        if (Object.prototype.toString.call(data) === "[object Object]") {
          data = [data];
        }
        setData(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  function addProductHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data2 = Object.fromEntries(formData.entries());

    data2.quantity = parseFloat(data2.quantity);
    data2.unitPurchasePrice = parseFloat(data2.unitPurchasePrice);
    data2.unitSellPrice = parseFloat(data2.unitSellPrice);

    data2.brand = parseInt(data2.brand);

    fetch("http://localhost:8080/rest/api/freshProduce/saveFreshProduce", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data2),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        e.target.reset();
        alert("İşlem Başarılı");
        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("HTTP error " + response.status);
            }
            return response.json();
          })
          .then((data) => {
            setTotalElements(data.payload.totalElements);

            setData(data.payload.content);
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        alert("Eksik alanlar bulunmakta");
      });
  }

  function deleteProduct(d) {
    fetch(
      `http://localhost:8080/rest/api/freshProduce/deleteFreshProduce/${d.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("HTTP error " + response.status);
            }
            return response.json();
          })
          .then((data) => {
            setTotalElements(data.payload.totalElements);

            setData(data.payload.content);
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  function editProduct(d) {
    setEditForm({
      id: d.id ?? "",
      name: d.name ?? "",
      quantity: d.quantity ?? "",
      unitType: d.unitType ?? "",
      unitPurchasePrice: d.unitPurchasePrice ?? "",
      unitSellPrice: d.unitSellPrice ?? "",
      brand: d.brand?.name ?? "",
    });
  }

  function editProductHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data2 = Object.fromEntries(formData.entries());

    data2.quantity = parseFloat(data2.quantity);
    data2.unitPurchasePrice = parseFloat(data2.unitPurchasePrice);
    data2.unitSellPrice = parseFloat(data2.unitSellPrice);

    console.log("DEBUGG:", data2);

    fetch(`http://localhost:8080/rest/api/brand/getBrandName/${data2.brand}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        data2.brand = data.payload.id;

        fetch(
          `http://localhost:8080/rest/api/freshProduce/updateFreshProduce/${editForm.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data2),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("HTTP error " + response.status);
            }
            return response.json();
          })
          .then((data) => {
            e.target.reset();
            fetch(url, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("HTTP error " + response.status);
                }
                return response.json();
              })
              .then((data) => {
                setTotalElements(data.payload.totalElements);

                setData(data.payload.content);
              })
              .catch((error) => {
                console.error("Fetch error:", error);
              });
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }
  // --------------------Buton Fonksiyonları

  if (hamData === undefined) {
    return <p>Yükleniyor...</p>;
  }
  console.log("HamData:", hamData);

  return (
    <>
      {/* Barkod ve butonlar */}
      <section className="container" style={{ height: "90vh" }}>
        <div className="setFlexsMiddle mt-2">
          <form onSubmit={searchByBarcode} style={{ width: "70%" }}>
            <input
              placeholder="Ürün Adı / Barkodu giriniz"
              type="text"
              style={{ width: "80%" }}
            />

            <button className="btn btn-success ms-2">Onayla</button>
          </form>

          <button
            className="btn btn-warning ms-2"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#myModal"
          >
            Ekle
          </button>
          <button className="btn btn-light ms-2" onClick={clearSearch}>
            Temizle
          </button>
        </div>

        {/* Modal */}
        <div className="modal" id="myModal" data-bs-backdrop="static">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Düzenleme Modu</h2>
                <button
                  className="btn-close"
                  type="button"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={addProductHandler}>
                  {/* Ad */}
                  <div className="row mt-2">
                    <div className="col-3 setFlexsMiddle">
                      <label name="name" className="form-label m-0">
                        Ad
                      </label>
                    </div>
                    <div className="col-9">
                      <input type="text" name="name" className="form-control" />
                    </div>
                  </div>

                  {/* quantity */}
                  <div className="row mt-2">
                    <div className="col-3 setFlexsMiddle">
                      <label name="quantity" className="form-label m-0">
                        Miktarı
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        name="quantity"
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* unitType */}
                  <div className="row mt-2">
                    <div className="col-3 setFlexsMiddle">
                      <label name="unitType" className="form-label m-0">
                        Birimi
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        name="unitType"
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* unitPurchasePrice */}
                  <div className="row mt-2">
                    <div className="col-3 setFlexsMiddle">
                      <label
                        name="unitPurchasePrice"
                        className="form-label m-0"
                      >
                        Birim satın alma miktarı
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        name="unitPurchasePrice"
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* unitSellPrice */}
                  <div className="row mt-2">
                    <div className="col-3 setFlexsMiddle">
                      <label name="unitSellPrice" className="form-label m-0">
                        Birim satma fiyatı
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        name="unitSellPrice"
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* Firma No */}
                  <div className="row mt-2">
                    <div className="col-3 setFlexsMiddle">
                      <label name="brand" className="form-label m-0">
                        Firma No
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        name="brand"
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* Butonlar */}
                  <div className="mt-4">
                    <button
                      className="btn btn-light"
                      type="button"
                      data-bs-dismiss="modal"
                    >
                      İptal et
                    </button>
                    <button className="btn btn-primary ms-5">Kaydet</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Modal */}

        {/* Modal 2 */}
        <div className="modal" id="editModal" data-bs-backdrop="static">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Düzenleme Modu</h2>
                <button
                  className="btn-close"
                  type="button"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={editProductHandler}>
                  {/* Ad */}
                  <div className="row mt-2">
                    <div className="col-3 setFlexsMiddle">
                      <label name="name" className="form-label m-0">
                        Ad
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* Satın alma ücreti */}
                  <div className="row mt-2">
                    <div className="col-3 setFlexsMiddle">
                      <label name="quantity" className="form-label m-0">
                        Miktarı
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        name="quantity"
                        className="form-control"
                        value={editForm.quantity}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            quantity: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* unitType */}
                  <div className="row mt-2">
                    <div className="col-3 setFlexsMiddle">
                      <label name="unitType" className="form-label m-0">
                        Birim fiyatı
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        name="unitType"
                        className="form-control"
                        value={editForm.unitType}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            unitType: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* unitPurchasePrice */}
                  <div className="row mt-2">
                    <div className="col-3 setFlexsMiddle">
                      <label
                        name="unitPurchasePrice"
                        className="form-label m-0"
                      >
                        Birim satın alma fiyatı
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        name="unitPurchasePrice"
                        className="form-control"
                        value={editForm.unitPurchasePrice}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            unitPurchasePrice: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Kalan ürün */}
                  <div className="row mt-2">
                    <div className="col-3 setFlexsMiddle">
                      <label name="unitSellPrice" className="form-label m-0">
                        Birim satma fiyatı
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        name="unitSellPrice"
                        className="form-control"
                        value={editForm.unitSellPrice}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            unitSellPrice: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Firma Adı */}
                  <div className="row mt-2">
                    <div className="col-3 setFlexsMiddle">
                      <label name="brand" className="form-label m-0">
                        Firma Adı
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        name="brand"
                        className="form-control"
                        value={editForm.brand}
                        onChange={(e) =>
                          setEditForm({ ...editForm, brand: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* Butonlar */}
                  <div className="mt-4">
                    <button
                      className="btn btn-light"
                      type="button"
                      data-bs-dismiss="modal"
                    >
                      İptal et
                    </button>
                    <button className="btn btn-primary ms-5">Kaydet</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Modal 2 */}

        {/* Listede görüntülenecekler: */}
        <table className="table table-striped" style={{ tableLayout: "fixed" }}>
          <thead>
            <tr>
              <th>İşlem</th>
              <th>ID</th>
              <th>Adı</th>
              <th>Miktar</th>
              <th>Birim</th>
              <th>Birim alma fiyatı</th>
              <th>Birim Satma fiyatı</th>
              <th>Firma Adı</th>
            </tr>
          </thead>

          <tbody>
            {hamData.map((d) => (
              <tr key={d.id}>
                <td>
                  <button
                    onClick={() => deleteProduct(d)}
                    className="btn btn-danger"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                    onClick={() => editProduct(d)}
                    className="btn btn-warning ms-3"
                  >
                    <i className="fa-solid fa-recycle"></i>
                  </button>
                </td>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.quantity}</td>
                <td>{d.unitType}</td>
                <td>{d.unitPurchasePrice}</td>
                <td>{d.unitSellPrice}</td>
                <td>{d.brand.name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pageable sistemi */}
        <div className="container" style={{ height: "8vh" }}>
          <div className="row setFlexsMiddle">
            <button
              className="col-1 border setFlexsMiddle"
              style={{ height: "50px", width: "50px" }}
              onClick={previousPage}
            >
              <i className="fa-solid fa-left-long"></i>
            </button>

            <div
              className="col-1 border setFlexsMiddle"
              style={{ height: "50px" }}
            >
              <p>
                {pageNumber + 1} / {maxPage + 1}
              </p>
            </div>

            <button
              className="col-1 border setFlexsMiddle"
              style={{ height: "50px", width: "50px" }}
              onClick={nextPage}
            >
              <i className="fa-solid fa-right-long"></i>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
