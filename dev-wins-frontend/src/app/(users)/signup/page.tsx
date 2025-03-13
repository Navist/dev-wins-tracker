import React from "react";
import GenericButton from "@/app/components/GenericButton";

export default function SignUpPage() {
    function handleCreateSubmit() {}

    return (
        <div className="flex items-center justify-center h-screen">
            <form className="grid grid-cols-1">
                <label>
                    Username
                    <input type="text" name="username" />
                </label>
                <label>Email</label>
                <label>Password</label>
                <input type="submit" value="Submit" />
            </form>
            {/* <GenericButton label="Sign Up" /> */}
        </div>
    );
}
