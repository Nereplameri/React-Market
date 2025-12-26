import { useEffect, useState } from "react";

export default function BrandListBody() {
  const [hamData, setData] = useState(); //List
  // --------------------Untainted data
  const [totalElements, setTotalElements] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 10;

  let url = `http://localhost:8080/rest/api/brand/list/brand?pageNumber=${pageNumber}&pageSize=${pageSize}&columnName=id&asc=true`;

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
    phoneNumber: "",
    email: "",
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

    url = `http://localhost:8080/rest/api/brand/getBrandName/${e.target.childNodes[0].value}`;
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
        data = data.payload;
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

    fetch("http://localhost:8080/rest/api/brand/saveBrand", {
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

  function deleteProduct(d) {
    fetch(`http://localhost:8080/rest/api/brand/deleteBrand/${d.id}`, {
      method: "DELETE",
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
      phoneNumber: d.phoneNumber ?? "",
      email: d.email ?? "",
    });
  }

  function editProductHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data2 = Object.fromEntries(formData.entries());

    fetch(`http://localhost:8080/rest/api/brand/updateBrand/${editForm.id}`, {
      method: "PUT",
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

    // fetch(`http://localhost:8080/rest/api/brand/getBrandName/${data2.brand}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("HTTP error " + response.status);
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     data2.brand = data.payload.id;

    //   })
    //   .catch((error) => {
    //     console.error("Fetch error:", error);
    //   });
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

                  {/* phoneNumber */}
                  <div className="row mt-2">
                    <div className="col-3 setFlexsMiddle">
                      <label name="phoneNumber" className="form-label m-0">
                        Telefon No
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        name="phoneNumber"
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* email */}
                  <div className="row mt-2">
                    <div className="col-3 setFlexsMiddle">
                      <label name="email" className="form-label m-0">
                        email
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        name="email"
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

                  {/* phoneNumber */}
                  <div className="row mt-2">
                    <div className="col-3 setFlexsMiddle">
                      <label name="phoneNumber" className="form-label m-0">
                        Telefon Numarası
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        name="phoneNumber"
                        className="form-control"
                        value={editForm.phoneNumber}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* email */}
                  <div className="row mt-2">
                    <div className="col-3 setFlexsMiddle">
                      <label name="email" className="form-label m-0">
                        E-mail
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        value={editForm.email}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            email: e.target.value,
                          })
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
              <th>Telefon No</th>
              <th>E-mail</th>
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
                <td>{d.phoneNumber}</td>
                <td>{d.email}</td>
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
