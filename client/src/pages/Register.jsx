/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { User, Lock, Mail } from "lucide-react";

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) return alert("Please fill all fields");
        try {
            setLoading(true);
            await axios.post("/api/v1/users/register", { name, email, password });
            setLoading(false);
            alert("Registration Successful! Please login.");
            navigate("/login");
        } catch (error) {
            setLoading(false);
            alert("Something went wrong. Please try again.");
        }
    };

    useEffect(() => {
        if (localStorage.getItem("user")) navigate("/");
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            {loading && <Spinner />}
            <div className="w-full max-w-sm bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 p-8 shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Register</h2>
                <form onSubmit={submitHandler}>
                    <div className="relative mb-6">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 p-3 bg-white/50 border border-white/40 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/80" placeholder="Name" required />
                    </div>
                    <div className="relative mb-6">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 p-3 bg-white/50 border border-white/40 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/80" placeholder="Email" required />
                    </div>
                    <div className="relative mb-6">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 p-3 bg-white/50 border border-white/40 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/80" placeholder="Password" required />
                    </div>
                    <button type="submit" className="w-full bg-white text-gray-800 font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105 hover:bg-gray-100 shadow-lg">
                        Register
                    </button>
                    <p className="text-center mt-6 text-gray-700">
                        Already have an account? <Link to="/login" className="font-bold text-gray-800 hover:text-black">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};
export default Register;