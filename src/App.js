import Home from "./routes/home/home.compoent";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import SingIn from "./routes/sing-in/sing-in.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>       
        <Route path="sing-in" element={<SingIn/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
