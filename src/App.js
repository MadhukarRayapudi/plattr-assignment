import { BrowserRouter, Routes, Route } from "react-router-dom";

import ReviewsPage from "./Components/ReviewsPage"
console.log(ReviewsPage)

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/reviews" element={<ReviewsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
