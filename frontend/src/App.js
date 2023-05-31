// COMPONENTS
import Footer from "./components/Footer";
import Header from "./components/Header"
import Router from "./router";

const App = () => {

  /*======== RENDERER ========*/
  return (
    <>
      {/* HEADER */}
      <Header/>

      {/* MAIN */}
      <Router />

      {/* FOOTER */}
      <Footer/>
    </>
  );
}

export default App;