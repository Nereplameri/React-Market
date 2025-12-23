export default function Authenticate() {
  return (
    <>
      <div className="container" style={{ height: "5vh" }}></div>
      <div
        className="container setFlexsMiddle bg-primary"
        style={{ height: "10vh" }}
      >
        <div>
          <img
            src="src/img/Logo.png"
            alt=""
            className="img-fluid"
            style={{ height: "10vh" }}
          />
        </div>
      </div>
      <div className="container" style={{ height: "5vh" }}></div>

      <div
        className="container d-flex justify-content-center"
        style={{ height: "45vh" }}
      >
        <div className="card" style={{ padding: "0px" }}>
          <div className="card-header">
            <p>Giriş Yapın</p>
          </div>
          <div className="card-body">
            <form>
              <label for="username" className="form-label">
                Kullanıcı Adınız
              </label>
              <input type="text" name="username" className="form-control" />

              <label for="pwd" className="form-label mt-2">
                Şifreniz
              </label>
              <input type="password" name="pwd" className="form-control" />

              <button
                className="btn btn-primary"
                style={{ marginTop: "126px" }}
              >
                Giriş yap
              </button>
            </form>
          </div>
        </div>
        <div className="card" style={{ margin: "0px 20px", padding: "0px" }}>
          <div className="card-header">
            <p>Yeni hesap açın</p>
          </div>
          <div className="card-body">
            <form>
              <label for="username" className="form-label">
                Kullanıcı Adınız
              </label>
              <input type="text" name="username" className="form-control" />

              <label for="pwd" className="form-label mt-2">
                Şifreniz
              </label>
              <input type="password" name="pwd" className="form-control" />

              <label for="pwd2" className="form-label mt-2">
                Şifrenizi tekrarlayın
              </label>
              <input type="password" name="pwd2" className="form-control" />

              <button className="btn btn-primary mt-5">Hesap Oluştur</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
