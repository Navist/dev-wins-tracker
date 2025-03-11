"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("users/login/");
    });

    return <div>HomePage</div>;
};

export default HomePage;
