import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [loginUser, setLoginUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setLoginUser(user);
        }
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem("user");
        alert("Logout Successfully");
        navigate("/login");
    };

    return (
        <header className="bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 shadow-lg sticky top-0 z-10">
            <nav className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold text-gray-800">
                        ExpenseTracker
                    </Link>
                    {loginUser && (
                        <div className="flex items-center gap-4">
                            <p className="text-gray-700 font-medium">
                                Welcome, {loginUser.name}
                            </p>
                            <button
                                onClick={logoutHandler}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};
export default Header;