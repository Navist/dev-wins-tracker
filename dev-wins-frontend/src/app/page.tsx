"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "./utils/auth";

const HomePage = () => {
    const router = useRouter();

    if (!isAuthenticated()) {
        router.push("/login");
    } else {
        router.push("/dashboard");
    }

    return <div>Page of Homes</div>;
};

export default HomePage;
