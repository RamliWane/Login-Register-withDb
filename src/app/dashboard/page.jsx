import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Logout from "../component/Logout";

export default async function DashboardPage() {

    const session = await getServerSession(authOptions);

    const user = session?.user;

    return (
        <main className="">
            <div className="flex flex-col justify-center items-center h-screen gap-4">
                <h1 className="text-2xl text-white">You can logout Here, {user?.username}</h1>
                <Logout />
            </div>
        </main>
    )
}