"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
    return (
        <div>
            <div className="bg-white w-20 h-8 items-center rounded-xl">
                <button onClick={signOut} className="text-black ml-4 mt-1">Logout</button>
            </div>
        </div>
    )
}