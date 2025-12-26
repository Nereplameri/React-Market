import { useEffect, useState } from "react";
import MainBody from "../components/MainBody";
import MainFoot from "../components/MainFoot";
import Navbar from "../components/Navbar";
import { connect } from "../utils/Connect.js";

export default function Home() {
  const [items, setItems] = useState();

  return (
    <>
      <Navbar />
      <MainBody setItems={setItems} />
      <MainFoot />
    </>
  );
}
