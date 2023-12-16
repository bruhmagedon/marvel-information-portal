import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage, Page404, SingleComicPage } from "../pages/index";

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="/comics" element={<ComicsPage />} />
          <Route
            exact
            //отдельный комикс по определенному айди
            path="/comics/:comicId"
          />
          {/* если не загрузился ни один из роутов */}
          <Route exact path="*" element={<Page404 />} />
        </Routes>
      </div>
    </Router>
  );
};

// че можно сделать по проекту
//      описание текст в комиксах, там есть br, их нужно адаптировать
//      кликабельные ссылки комиксов в чарлисте
//      ts
//      настроить рутинг

export default App;