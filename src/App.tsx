import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/main-page/main-page";
import { AppRoute } from "./const";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={AppRoute.Main} element={<MainPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
