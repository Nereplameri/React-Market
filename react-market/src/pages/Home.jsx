import { useEffect, useState } from "react";
import MainBody from "../components/MainBody";
import MainFoot from "../components/MainFoot";
import Navbar from "../components/Navbar";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "Krok",
        password: "123",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API response:", data);
        setMovies(data.result); // backend yapına göre
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []); // <-- sadece 1 kere çalışır

  console.log("movies state:", movies);
  return (
    <>
      <Navbar />
      <MainBody />
      <MainFoot />
    </>
  );
}
