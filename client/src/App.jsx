import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import PhonePreordersPage from './pages/PhonePreordersPage/PhonePreordersPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import PhonesList from './components/PhonesList/PhonesList.jsx';
import PhoneForm from './components/PhoneForm/PhoneForm.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/phones" element={<PhonesList />} />

      <Route path="/phones/new" element={<PhoneForm />} />

      <Route path="/phones/:id/preorders" element={<PhonePreordersPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
