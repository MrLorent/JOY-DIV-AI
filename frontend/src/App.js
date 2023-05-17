// COMPONENTS
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
    </>
  );
}

export default App;