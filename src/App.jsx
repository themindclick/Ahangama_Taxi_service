import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/Layout/ScrollToTop';

import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import FleetPage from './pages/FleetPage';
import About from './pages/About';
import Booking from './components/booking';
import Services from './pages/Services';

// import Home from './pages/Home';
// import Fleet from './pages/Fleet';
// import About from './pages/About';
// import Appointment from './pages/Appointment';
// import Privacy from './pages/Privacy';

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/services" element={<Services />} />

          {/* <Route path="about" element={<About />} />
          <Route path="book" element={<Appointment />} />
          <Route path="privacy" element={<Privacy />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;