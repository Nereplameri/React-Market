import { Alert } from "bootstrap";
import { useNavigate } from "react-router";

export default function Authenticate() {
  // Buton fonksiyonları
  const navigate = useNavigate();

  function registerHandle(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data2 = Object.fromEntries(formData.entries());

    if (data2.pwd == "" || data2.pwd2 == "" || data2.username == "") {
      alert("Şifre alanını ve kullanıcı adını doldurun");
      return;
    }

    if (data2.pwd !== data2.pwd2) {
      alert("Şifreler aynı değil");
      return;
    }

    const requestJson = { username: data2.username, password: data2.pwd };

    // Register fetch
    if (true) {
      fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestJson),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Reqgister işlemi başarılı!!!!");
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }
  }

  function loginHandle(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data2 = Object.fromEntries(formData.entries());

    console.log(data2);

    const requestJson = { username: data2.username, password: data2.pwd };

    // Request to server
    if (true) {
      fetch("http://localhost:8080/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestJson),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Login Başarılı!", data);
          navigate("/");
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          alert("Hesap bilgileri yanlış");
        });
    }
  }
  // Buton fonksiyonları =====================================

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
            <form onSubmit={loginHandle}>
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
            <form onSubmit={registerHandle}>
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
