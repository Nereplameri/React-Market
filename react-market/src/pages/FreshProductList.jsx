import ListEntities from "../components/ListEntites";
import Navbar from "../components/Navbar";

export default function FreshProductList() {
  const freshProductList = [
    {
      id: 5,
      name: "Elma",
      remainingQuentity: 30.75,
      unitType: "KG",
      sellPrice: 30.0,
    },
    {
      id: 6,
      name: "Çengelköy Salatalık",
      remainingQuentity: 30.5,
      unitType: "KG",
      sellPrice: 70.5,
    },
  ];

  const tablehead = ["Numara", "Adı", "Kalan Miktar", "Birim", "Satış Fiyatı"];

  return (
    <>
      <Navbar />
      <ListEntities data={freshProductList} tableHead={tablehead} />
    </>
  );
}
