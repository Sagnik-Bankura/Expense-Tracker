import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className="container mx-auto px-4 sm:px-6 py-8 min-h-[80vh]">
                {children}
            </main>
            <Footer />
        </>
    );
};
export default Layout;
