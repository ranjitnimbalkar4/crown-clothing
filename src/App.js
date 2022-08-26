import Home from "./routes/home/home.compoent";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>       
        <Route path="/auth" element={<Authentication/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
