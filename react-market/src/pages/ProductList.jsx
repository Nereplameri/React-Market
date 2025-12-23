import ListEntities from "../components/ListEntites";
import Navbar from "../components/Navbar";

export default function ProductList() {
  // Saf data
  const prodcts = [
    {
      id: 8,
      name: "Eti Lifalif Granola Kuru Vişneli, Kakao Parçacıklı, Fındıklı 200 g",
      sellPrice: 134.0,
      isPresented: "true",
      barcode: "8690526014609",
      remainingQuentity: 20,
      brandId: 2,
    },
    {
      id: 9,
      name: "Eti Gong Mısır ve Pirinç Patlağı 64 G",
      sellPrice: 10.0,
      isPresented: "true",
      barcode: "8690526084671",
      remainingQuentity: 20,
      brandId: 2,
    },
  ];

  // UI işlemi için gönderilen veriden filitrelenecek field 'ler
  const UIFiliter = ["id"];

  // Tablo sütunlarının isimleri
  const tableHead = [
    "Numara",
    "Adı",
    "Satış ücreti",
    "Satışta mı",
    "Barkod",
    "Kalan ürün",
    "Marka ID",
  ];

  return (
    <>
      <Navbar />
      <ListEntities
        data={prodcts}
        tableHead={tableHead}
        UIFiliter={UIFiliter}
      />
    </>
  );
}
