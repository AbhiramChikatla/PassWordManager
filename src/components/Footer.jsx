import React from "react";

const Footer = () => {
    return (
        <div className="flex items-center gap-2 flex-col   justify-center text-white bg-slate-800 w-full">
            <div className="logo">
                <h1 className="font-bold text-2xl">
                    <span className="text-green-500">&lt;</span>
                    <span className="text-green">Pass</span>
                    <span className="text-green-500">OP</span>
                    <span className="text-green-500">/&gt;</span>
                </h1>
            </div>
            <div className="flex gap-1 font-semibold items-center">
                Created with <img src="icons/heart.png" alt="" />
                by Dimensions 
            </div>
        </div>
    );
};

export default Footer;
