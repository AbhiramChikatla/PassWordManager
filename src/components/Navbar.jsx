import React from "react";

const Navbar = () => {
    return (
        <nav className="bg-slate-800 flex justify-around items-center p-5 text-white">
            <div className="logo">
                <h1 className="font-bold text-2xl">
                <span className="text-green-500">&lt;</span>
                    <span className="text-white">Pass</span>
                    <span className="text-green-500">OP</span>
                    <span className="text-green-500">/&gt;</span>
                </h1>
            </div>
            {/* <ul className="flex gap-9">
                <li className="hover:font-semibold">Home</li>
                <li className="hover:font-semibold">About us</li>
                <li className="hover:font-semibold">Contact Us</li>
                <li className="hover:font-semibold">Help</li>
            </ul> */}
           <button className="logos bg-green-800 flex items-center justify-center px-2 py-1 rounded-full gap-2 ring-1 ring-white">
            <img src="icons/git.png" alt="" className="invert" />
            <span className="font-bold">
                GitHub
            </span>
           </button>
        </nav>
    );
};

export default Navbar;
