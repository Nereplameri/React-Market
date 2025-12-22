export default function MainFoot() {
  return (
    <>
      <div className="container bg-primary" style={{ height: "15vh" }}>
        <div className="row h-100">
          <div className="col-6 border">Change Consumer</div>

          <div className="col-6 border">
            <div className="row h-100">
              <div className="col-4 setFlexsMiddle">
                <button
                  claclassNamess="btn btn-success w-100"
                  style={{ height: "80%" }}
                >
                  <i className="fa-solid fa-check"></i>
                </button>
              </div>

              <div className="col-4 setFlexsMiddle">
                <button
                  clasclassNames="btn btn-danger w-100"
                  style={{ height: "80%" }}
                >
                  <i className="fa-solid fa-x"></i>
                </button>
              </div>

              <div className="col-4">
                <div className="setFlexsMiddle w-100 h-100">
                  <p>Toplam tutar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
