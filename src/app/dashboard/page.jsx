import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Logout from "../component/Logout";

export default async function DashboardPage() {

    const session = await getServerSession(authOptions);
    console.log(session);

    const user = session?.user;

    return (
        <main className="">
            <div className="flex flex-col justify-center items-center h-screen gap-4">
                <h1 className="text-2xl text-white">You can logout Here, {user?.email}</h1>
                <Logout />
            </div>
        </main>
    )
}