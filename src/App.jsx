import { Toaster } from "sonner";
import Header from "./components/shared/Header.jsx";
import CreateTrip from "./pages/CreateTrip.jsx";
import Home from "./pages/Home.jsx";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
    <Toaster />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-trip" element={<CreateTrip />} />
      </Routes>
    </>
  );
};

export default App;