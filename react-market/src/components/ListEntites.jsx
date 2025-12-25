export default function ListEntities({ data, tableHead, UIFiliter }) {
  // Objenin value 'lerini listeye döküp, iteratif hale getiriyoruz
  let list = [];
  for (let i of data) {
    list.push(Object.values(i));
  }
  // ------------- \\

  //MODAL
  // Database 'ye veri göndermek için Modal 'da gösterilecek yapıyı ayarlıyoruz.

  let dataField = Object.keys(data[0]);

  for (let forbiden of UIFiliter)
    if (dataField.includes(forbiden)) {
      let iTarget = dataField.indexOf(forbiden);
      dataField.splice(iTarget, 1);
    }

  // dataField : Modal 'da kullanacağımız field 'lerdir.
  // ------------- \\
  return (
    <>
      <section className="container" style={{ height: "90vh" }}>
        <div className="setFlexsMiddle mt-2">
          <input
            placeholder="Ürün Adı / Barkodu giriniz"
            type="text"
            style={{ width: "30%" }}
          />
          <button className="btn btn-success ms-2">Onayla</button>
          <button
            className="btn btn-warning ms-2"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#myModal"
          >
            Ekle
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
                <form>
                  {dataField.map((m) => (
                    <div className="row mt-2">
                      <div className="col-3 setFlexsMiddle">
                        <label name="Ad" className="form-label m-0">
                          {m}
                        </label>
                      </div>
                      <div className="col-9">
                        <input type="text" name="" className="form-control" />
                      </div>
                    </div>
                  ))}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-light"
                  type="button"
                  data-bs-dismiss="modal"
                >
                  İptal et
                </button>
                <button className="btn btn-primary">Kaydet</button>
              </div>
            </div>
          </div>
        </div>
        {/* Modal */}

        {/* Listede görüntülenecekler: */}
        <table className="table table-striped" style={{ tableLayout: "fixed" }}>
          <thead>
            <tr>
              <th>İşlem</th>
              {tableHead.map((n) => (
                <th>{n}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {list.map((m) => (
              <>
                <tr>
                  <td>
                    <button>Sa</button>
                  </td>
                  {m.map((n) => (
                    <td>{n}</td> //HERE!!!
                  ))}
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
