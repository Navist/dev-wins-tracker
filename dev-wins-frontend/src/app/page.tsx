import Link from "next/link";
import React from "react";
import NavBar from "./components/NavBar";

const page = () => {
    return (
        <main>
            <NavBar />
            <Link href="/wins">Wins</Link>
        </main>
    );
};

export default page;
