import { useEffect, useState } from "react";

export default function MainBody() {
  const [manuelRefresh, setManuelRefresh] = useState(true);
  // setManuelRefresh(!manuelRefresh)
  const [freshButtons, setFreshButtons] = useState(); //List
  const [stagedProduct, setStagedProduct] = useState();

  const [editForm, setEditForm] = useState();

  // FreshProduct için fetch
  const urlFresh =
    "http://localhost:8080/rest/api/freshProduce/list/freshProduce?pageNumber=0&pageSize=100&columnName=id&asc=true";

  useEffect(() => {
    fetch(urlFresh, {
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
        setFreshButtons(data.payload.content);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [urlFresh]);

  // Calculate price \\

  let finalPrice = 0;
  if (stagedProduct !== undefined) {
    for (let item of stagedProduct) {
      finalPrice = finalPrice + item.price * item.amount;
    }
  }

  // Genel fonksiyonlar

  function addToStagedProduct(data) {
    //data = liste

    if (stagedProduct === undefined) {
      data[0].amount = 1;
      setStagedProduct(data);
      return;
    }

    for (let i = 0; i < stagedProduct.length; i++) {
      if (stagedProduct[i].id === data[0].id) {
        let copy = stagedProduct;
        copy[i].amount += 1;
        setStagedProduct(copy);
        setManuelRefresh(!manuelRefresh);
        return;
      }
    }

    // Eğer stagedProduct 'ta bu id 'li ürün yok ise bu işlem!
    if (true) {
      data[0].amount = 1;
      setStagedProduct([...stagedProduct, ...data]);
    }
  }

  // Buton fonksiyonları

  function searchFreshItem(e) {
    e.preventDefault();

    fetch(
      `http://localhost:8080/rest/api/freshProduce/getByName/${e.target.childNodes[0].value}`,
      {
        method: "GET",
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
        setFreshButtons(data.payload);
        if (data.payload.length === 0) {
          alert("Eşleşen ürün bulunamadı");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  function refreshFreshItem() {
    fetch(urlFresh, {
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
        setFreshButtons(data.payload.content);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  function addProductWithBarcode(e) {
    e.preventDefault();

    fetch(
      `http://localhost:8080/rest/api/product/getProductByBarcode/${e.target.childNodes[0].value}`,
      {
        method: "GET",
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
        data.payload.price = data.payload.sellPrice;
        addToStagedProduct([data.payload]);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        alert("Eşleşen ürün bulunamadı");
      });

    console.log(stagedProduct);
  }

  function stageTheFreshProduct(d) {
    d.price = d.unitSellPrice;
    addToStagedProduct([d]);
    console.log("Fonksiyondan output: ", stagedProduct);
  }

  function reduceTheAmount(d) {
    if (d.amount == 1) {
      downgradeProductFromStage(d);
    }

    d.amount -= 1;
    setManuelRefresh(!manuelRefresh);

    return;
  }

  function incraseTheAmount(d) {
    d.amount += 1;
    setManuelRefresh(!manuelRefresh);
    return;
  }

  function downgradeProductFromStage(d) {
    let clone = stagedProduct;

    for (let i = 0; i < clone.length; i++) {
      if (clone[i].id == d.id) {
        clone.splice(i, 1);

        setStagedProduct(clone);
        setManuelRefresh(!manuelRefresh);
        return;
      }
    }
  }

  const handleAmountChange = (id, value) => {
    setStagedProduct((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, amount: Number(value) } : item
      )
    );
  };

  function denyButton() {
    setStagedProduct();
  }

  function confirmButton() {
    // stagedProduct
    let reduceFreshProduct = { decreases: [] };
    let reduceProduct = { decreases: [] };

    for (let item of stagedProduct) {
      if (item.unitType !== undefined) {
        // Fresh Product 'ların hepsi burada
        let jsonList = { primaryId: item.id, decreaseBy: item.amount };
        reduceFreshProduct.decreases.push(jsonList);
      } else {
        // Normal product 'ların hepsi burada.
        let jsonList = { primaryId: item.id, decreaseBy: item.amount };
        reduceProduct.decreases.push(jsonList);
      }
    }
    console.log("reduceProduct:", reduceProduct);
    console.log("reduceFreshProduct:", reduceFreshProduct);

    // Reduce from database
    if (reduceFreshProduct.decreases.length != 0) {
      fetch("http://localhost:8080/rest/api/freshProduce/reduceQuentity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reduceFreshProduct),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Reduce Complated!!!!");
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }

    if (reduceProduct.decreases.length != 0) {
      fetch("http://localhost:8080/rest/api/product/reduceQuentity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reduceProduct),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Reduce Complated!!!!");
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }

    setStagedProduct();
    alert("İşlem Başarılı");
  }

  //  Buton fonksiyonları
  if (freshButtons === undefined) {
    return <p>Yükleniyor...</p>;
  }
  return (
    <>
      <div className="container" style={{ height: "75vh" }}>
        <div className="row h-100">
          <section className="col-8 border">
            <div className="setFlexsMiddle" style={{ height: "5vh" }}>
              <form style={{ width: "100%" }} onSubmit={addProductWithBarcode}>
                <input
                  placeholder="Barkod giriniz"
                  type="text"
                  style={{ width: "70%" }}
                />
                <button className="btn btn-success ms-2" type="Submit">
                  Onayla
                </button>
              </form>
            </div>

            <div
              style={{ overflowY: "scroll", height: "70vh" }}
              className="border"
            >
              <table
                className="table table-striped mt-3"
                style={{ tableLayout: "fixed" }}
              >
                <thead>
                  <tr>
                    <th>Ürün Adedi</th>
                    <th>Ürün İsmi</th>
                    <th>Ürün Firması</th>
                    <th>Ürün Fiyatı</th>
                  </tr>
                </thead>

                {/* Staged products!! */}
                <tbody>
                  {stagedProduct &&
                    stagedProduct.length > 0 &&
                    stagedProduct.map((d) => (
                      <tr key={d.id}>
                        <td style={{ verticalAlign: "middle" }}>
                          <div>
                            <button
                              className="btn btn-danger p-1"
                              onClick={() => downgradeProductFromStage(d)}
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </button>
                            <input
                              type="text"
                              className=""
                              value={d.amount}
                              onChange={(e) =>
                                handleAmountChange(d.id, e.target.value)
                              }
                              style={{ width: "3vw" }}
                            />
                            <button
                              className="btn btn-success p-1"
                              onClick={() => incraseTheAmount(d)}
                            >
                              <i className="fa-solid fa-up-long"></i>
                            </button>
                            <button
                              className="btn btn-warning p-1"
                              onClick={() => reduceTheAmount(d)}
                            >
                              <i className="fa-solid fa-down-long"></i>
                            </button>
                          </div>
                        </td>
                        <td className="listDataWarp">{d.name}</td>
                        <td className="listDataWarp">{d.brand.name}</td>
                        <td className="listDataWarp">{d.price} tl</td>
                      </tr>
                    ))}
                </tbody>
                {/* Staged products!! */}
              </table>
            </div>
          </section>

          <aside className="col-4 border">
            <div className="setFlexsMiddle" style={{ height: "8%" }}>
              <div className="d-flex justify-content-between border">
                <form onSubmit={searchFreshItem}>
                  <input type="text" placeholder="Manav ürünü ara" />
                  <button className="btn btn-success ms-2" type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </form>
                <button
                  className="btn btn-warning ms-2"
                  onClick={refreshFreshItem}
                >
                  <i className="fa-solid fa-arrows-rotate"></i>
                </button>
              </div>
            </div>

            <div
              className="mt-2 border freshProductPage"
              style={{ height: "67vh", overflowY: "scroll" }}
            >
              <div className="row" style={{ height: "20%" }}>
                {freshButtons.map((m) => {
                  return (
                    <div className="col-4 setFlexsMiddle mt-2" key={m.id}>
                      <button
                        className="btn btn-primary h-100 w-100"
                        id={m.id}
                        onClick={() => stageTheFreshProduct(m)}
                      >
                        {m.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
      <div className="container bg-primary" style={{ height: "15vh" }}>
        <div className="row h-100">
          <div className="col-6 border"></div>

          <div className="col-6 border">
            <div className="row h-100">
              <div className="col-4 setFlexsMiddle">
                <button
                  className="btn btn-success w-100"
                  style={{ height: "80%" }}
                  onClick={confirmButton}
                >
                  <i className="fa-solid fa-check"></i>
                </button>
              </div>

              <div className="col-4 setFlexsMiddle">
                <button
                  className="btn btn-danger w-100"
                  style={{ height: "80%" }}
                  onClick={denyButton}
                >
                  <i className="fa-solid fa-x"></i>
                </button>
              </div>

              <div className="col-4">
                <div className="setFlexsMiddle w-100 h-100">
                  <p>
                    Toplam tutar <br /> {finalPrice} TL
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
