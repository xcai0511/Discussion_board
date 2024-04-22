// ************** THIS IS YOUR APP'S ENTRY POINT. CHANGE THIS FILE AS NEEDED. **************
// ************** DEFINE YOUR REACT COMPONENTS in ./components directory **************
import React from "react";
import "./stylesheets/App.css";
import FakeStackOverflow from "./components/fakestackoverflow.js";
import { library } from '@fortawesome/fontawesome-svg-core'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

function App() {
    return (
        <FakeStackOverflow />
    );
}

export default App;
library.add(fab, fas, far)
