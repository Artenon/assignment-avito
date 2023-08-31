import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { MainPage } from "./pages/main-page/main-page";
import { GamePage } from "./pages/game-page/game-page";
import { AppRoute } from "./const";

function App() {
  return (
    <Container>
      <div className="App">
        <Routes>
          <Route path={AppRoute.Main} element={<MainPage />} />
          <Route path={`${AppRoute.Game}/:gameID`} element={<GamePage />} />
        </Routes>
      </div>
    </Container>
  );
}

export default App;
