import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, NavLink, Routes } from "react-router-dom";
import Welcome from "./Welcome";
import HomePanel from "./HomePanel";

function Cisco() {
    return (
        <div className="fullwindow">
            <Router>
                <Routes>
                    <Route index element={<Welcome/>} />
                    <Route path="/HomePanel/*" element={<HomePanel/>} />

                </Routes>
            </Router>
    </div>
    );
}

export default Cisco;

if (document.getElementById('cisco')) {
    ReactDOM.render(<Cisco />, document.getElementById('cisco'));
}
