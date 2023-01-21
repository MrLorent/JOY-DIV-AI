// COMPONENTS
import { useEffect, useRef } from "react";
import Header from "./components/header"

const App = () => {
  /*====== ATTRIBUTS ======*/
  const loaded = useRef(false);

  /*======== HOOK ========*/
  useEffect(()=>{
    if(loaded.current) return;

    fetch("http://127.0.0.1:5000/parse_word").then(
      res => res.json()
    ).then(
      data => console.log(data)
    );

    loaded.current = true;
  }, []);

  /*======== RENDERER ========*/
  return (
    <>
      {/* HEADER */}
      <Header/>

      {/* MAIN */}
      <main className="w-full h-full pt-[var(--header-height)]">
        <section id="main" className="w-full h-full p-5">

        </section>
      </main>
    </>
  );
}

export default App;