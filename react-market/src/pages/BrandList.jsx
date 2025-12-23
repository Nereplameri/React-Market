import Navbar from "../components/Navbar";
import ListEntities from "../components/ListEntites";

export default function BrandList() {
  const arrBrand = [
    {
      id: 2,
      name: "Eti",
      phoneNumber: "0212 526 44 44",
      email: "eti@gmail.com",
    },
    {
      id: 5,
      name: "Çaykur",
      phoneNumber: "0212 154 14 14",
      email: "caykur@gmail.com",
    },
  ];

  const listHeads = ["Numara", "Adı", "Telefon Numarası", "Email"];

  return (
    <>
      <Navbar />
      <ListEntities data={arrBrand} tableHead={listHeads} />
    </>
  );
}
