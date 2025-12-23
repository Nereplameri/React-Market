export default function ListEntities({ data, tableHead }) {
  let list = [];

  for (let i of data) {
    list.push(Object.values(i));
  }

  const object = Object.values(data[0]);
  return (
    <>
      <p>{console.log(list)}</p>
      <section className="container" style={{ height: "90vh" }}>
        <div className="setFlexsMiddle">
          <input
            placeholder="Ürün Adı / Barkodu giriniz"
            type="text"
            className="w-75"
          />
          <button className="btn btn-success ms-2">Onayla</button>
        </div>

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
                    <td>{n}</td>
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
