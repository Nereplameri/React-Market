import FreshProductButtons from "./FreshProductButtons";
import MainProductStage from "./MainProductStage";

export default function MainBody() {
  return (
    <>
      <div className="container" style={{ height: "75vh" }}>
        <div className="row h-100">
          <section className="col-8 border">
            <div className="setFlexsMiddle" style={{ height: "5vh" }}>
              <input
                placeholder="Barkod giriniz"
                type="text"
                className="w-75"
              />
              <button className="btn btn-success ms-2">Onayla</button>
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
                    <th>Ürün Barkodu</th>
                  </tr>
                </thead>

                <tbody>
                  <MainProductStage />
                </tbody>
              </table>
            </div>
          </section>

          <aside className="col-4 border">
            <div className="setFlexsMiddle" style={{ height: "8%" }}>
              <div className="d-flex justify-content-between border">
                <input
                  type="text"
                  placeholder="Manav ürünü ara"
                  className="w-100"
                />
                <button className="btn btn-success ms-2">Onayla</button>
              </div>
            </div>

            <div
              className="mt-2 border freshProductPage"
              style={{ height: "67vh", overflowY: "scroll" }}
            >
              <div className="row" style={{ height: "20%" }}>
                <FreshProductButtons />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
