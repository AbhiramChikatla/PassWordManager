import "./App.css";
import Footer from "./components/Footer";
import Manager from "./components/Manager";
import Navbar from "./components/Navbar";
function App() {
    return (
        <div className=" bg-green-50 min-h-screen">
            {/* <div class="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>{" "} */}
            <Navbar />
                <Manager />
            <Footer />
        </div>
    );
}

export default App;
