import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
const Manager = () => {
    const ref = useRef();
    const bref = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);
    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/");
        let passwords = await req.json();
        // console.log("getting the passwords " + passwords);
        setPasswordArray(passwords);
    };
    useEffect(() => {
        getPasswords();
        // let passwords = localStorage.getItem("passwords");
        // if (passwords) {
        //     setPasswordArray(JSON.parse(passwords));
        // }
    }, []);
    const showPassword = () => {
        // alert("show password");
        if (ref.current.src.includes("icons/hidden.png")) {
            ref.current.src = "icons/eye.png";
            bref.current.type = "password";
        } else {
            bref.current.type = "text";
            ref.current.src = "icons/hidden.png";
        }
    };
   

    const savePassword = async () => {
        if (
            form.site.length > 3 &&
            form.password.length > 3 &&
            form.username.length > 3
        ) {
            // localStorage.setItem(
            //     "passwords",
            //     JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
            // );
            // console.log("the form is ", form);
            // console.log("the form id is " + form.id);
            if (form.id!==undefined) {
                await fetch("http://localhost:3000/", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: form.id }),
                });
            }
          
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            await fetch("http://localhost:3000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...form, id: uuidv4() }),
            });

            // console.log([...passwordArray, form]);

            setForm({ site: "", username: "", password: "" });

            toast("Password Saved!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast("Error: Password Not Saved");
        }
    };
    const deletePassword = async (id) => {
        let check = confirm("Do you really want to delete this password?");
        if (check) {
            console.log("deleting password with id ", id);
            setPasswordArray(passwordArray.filter((item) => item.id !== id));

            // localStorage.setItem(
            //     "passwords",
            //     JSON.stringify(passwordArray.filter((item) => item.id != id))
            // );
            await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            // console.log(JSON.stringify({ id }));
            toast("Password Deleted", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };
    const editPassword = (id) => {
        console.log("editing password with id ", id);
        setForm({
            ...passwordArray.filter((item) => item.id === id)[0],   id: id   });
        setPasswordArray(passwordArray.filter((item) => item.id !== id));

        // deletePassword(id)
    };
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const copyText = (text) => {
        // alert("copied to the clipboard" + text);
        navigator.clipboard.writeText(text);
        toast("Copied to Clipboard", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    return (
        <>
            <ToastContainer />
            <div className="main  flex justify-around   xl:mx-72 md:mx-16 sm:mx-4 mx-2 min-h-[79vh]">
                <div className="form flex flex-col text-center lg:p-10 w-full p-2">
                    <h1 className="font-bold text-3xl">
                        <span className="text-green-500">&lt;</span>
                        <span className="text-black">Pass</span>
                        <span className="text-green-500">OP</span>
                        <span className="text-green-500">/&gt;</span>
                    </h1>
                    <p className="text-green-600 py-2">
                        Your own password manager
                    </p>
                    <input
                        type="text"
                        className="border-2 rounded-lg border-green-600 py-1 px-5"
                        placeholder="Enter Website URL"
                        value={form.site}
                        onChange={handleChange}
                        name="site"
                    />
                    <div className="sub-form w-full flex gap-2  py-4 flex-col md:flex-row">
                        <input
                            type="text "
                            className="border-2 rounded-lg border-green-600 w-full py-1 px-5"
                            placeholder="Enter Username"
                            value={form.username}
                            onChange={handleChange}
                            name="username"
                        />
                        <div className="forpassword relative">
                            <input
                                type="password"
                                className="border-2 rounded-lg border-green-600 w-full py-1 px-5"
                                placeholder="Enter Password"
                                value={form.password}
                                onChange={handleChange}
                                name="password"
                                ref={bref}
                            />
                            <span className="absolute right-[5px] top-[8px]">
                                <img
                                    src="icons/eye.png"
                                    alt=""
                                    className="size-[22px] cursor-pointer"
                                    onClick={showPassword}
                                    ref={ref}
                                />
                            </span>
                        </div>
                    </div>
                    <div className="btn flex justify-center">
                        <div className=" bg-green-500 w-fit py-2 px-4 rounded-full hover:bg-green-400 border-green-900 border-2">
                            <button
                                className="flex items-center gap-2 font-semibold "
                                onClick={savePassword}
                            >
                                <lord-icon
                                    src="https://cdn.lordicon.com/jgnvfzqg.json"
                                    trigger="hover"
                                ></lord-icon>
                                Save Password
                            </button>
                        </div>
                    </div>
                    <div className="passwords mt-3 w-full">
                        <h1 className="font-bold text-2xl text-left my-2">
                            Your Passwords
                        </h1>
                        {passwordArray.length === 0 && (
                            <div>No passwords to show</div>
                        )}
                        {passwordArray.length !== 0 && (
                            <table className=" w-full rounded-lg overflow-hidden mb-10">
                                <thead className="bg-green-800 text-white">
                                    <tr>
                                        <th className="py-2">Site</th>
                                        <th className="py-2">Username</th>
                                        <th className="py-2">Password</th>
                                        <th className="py-2">Options</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-green-100">
                                    {passwordArray.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className=" py-2 border border-white  sm:w-auto w-[calc(100%/5)px]">
                                                    <div className="content flex  items-center gap-2 justify-center ">
                                                        <a
                                                            href={item.site}
                                                            target="_blank"
                                                        >
                                                            {item.site}
                                                        </a>
                                                        {/* <img
                                                        src="icons/copy.png"
                                                        alt=""
                                                        className="cursor-pointer"
                                                    /> */}
                                                        {/* <lord-icon class="current-color" target="#container" trigger="hover" icon="editor#copy"></lord-icon> */}
                                                        <div
                                                            onClick={() => {
                                                                copyText(
                                                                    item.site
                                                                );
                                                            }}
                                                            className="cursor-pointer"
                                                        >
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/wzwygmng.json"
                                                                trigger="hover"
                                                                style={{
                                                                    width: "25px",
                                                                    height: "25px",
                                                                }}
                                                            ></lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className=" py-2 border border-whitesm:w-auto w-[calc(100% / 5)]">
                                                    <div className="content flex justify-center items-center gap-2">
                                                        {item.username}
                                                        <div
                                                            onClick={() => {
                                                                copyText(
                                                                    item.username
                                                                );
                                                            }}
                                                            className="cursor-pointer"
                                                        >
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/wzwygmng.json"
                                                                trigger="hover"
                                                                style={{
                                                                    width: "25px",
                                                                    height: "25px",
                                                                }}
                                                            ></lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className=" py-2 border border-whitesm:w-auto w-[calc(100% / 5)]">
                                                    <div className="content flex justify-center items-center gap-2">
                                                        {"*".repeat(
                                                            item.password.length
                                                        )}
                                                        <div
                                                            onClick={() => {
                                                                copyText(
                                                                    item.password
                                                                );
                                                            }}
                                                            className="cursor-pointer"
                                                        >
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/wzwygmng.json"
                                                                trigger="hover"
                                                                style={{
                                                                    width: "25px",
                                                                    height: "25px",
                                                                }}
                                                            ></lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className=" py-2 border border-whitesm:w-auto w-[calc(100% / 5)]">
                                                    <span
                                                        className="mx-2"
                                                        onClick={() => {
                                                            editPassword(
                                                                item.id
                                                            );
                                                        }}
                                                    >
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/gwlusjdu.json"
                                                            trigger="hover"
                                                            style={{
                                                                width: "25px",
                                                                height: "25px",
                                                            }}
                                                        ></lord-icon>
                                                    </span>
                                                    <span
                                                        className="mx-2"
                                                        onClick={() =>
                                                            deletePassword(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/skkahier.json"
                                                            trigger="hover"
                                                            style={{
                                                                width: "25px",
                                                                height: "25px",
                                                            }}
                                                        ></lord-icon>
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Manager;
