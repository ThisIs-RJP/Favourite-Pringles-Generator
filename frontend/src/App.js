// Module Imports
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// Styles
import './App.css';

// Component Imports
import Mobile from "./components/mobile";
import Main   from "./components/main";
import Map    from "./components/map"

function App() {
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const MobileView = () => {
    return (
        <div className="mobile-view">
          <Mobile />
        </div>
    );
};

return (
    <Router>
        {isMobile() ? (
            <MobileView />
        ) : (
            <Routes>
                <Route path="/" element={
                  <div>
                    <Main />
                  </div>
                } />
                <Route path="/map" element={
                  <div>
                    <Map />
                  </div>
                } />
                <Route path="*" element={
                    <div>
                        {/* <NotFound /> */}
                    </div>
                } />
            </Routes>
        )}
    </Router>
  )
}

export default App;
