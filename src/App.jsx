import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/Layout/ScrollToTop';
import { GoogleMapsProvider } from './context/GoogleMapsContext';

import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import FleetPage from './pages/FleetPage';
import About from './pages/About';
import Booking from './components/booking';
import Services from './pages/Services';

function App() {
  return (
    <GoogleMapsProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/fleet" element={<FleetPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/services" element={<Services />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleMapsProvider>
  );
}

export default App;