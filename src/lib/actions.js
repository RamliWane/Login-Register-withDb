"use server";

import { redirect } from "next/navigation";
import connection from "./database";
import bcrypt from "bcryptjs";

export async function RegisterUser(formData){
    const username = formData.get("username")
    const email = formData.get("email")
    const password = bcrypt.hashSync(formData.get("password"));

    await connection.query(
        "insert into users (username, email, password) values (?, ?, ?)",
         [username, email, password]
    )
    redirect("/login")
}

export async function getUserByEmail(email) {
    const [users] = await connection.execute(
       "select * from users where email = ?",
        [email]
    )

    if(!users.length) return null

    return users[0]
}