"use client";
import React from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
    const router = useRouter();

    router.push("/dashboard");

    return <div>Page of Homes</div>;
};

export default HomePage;
