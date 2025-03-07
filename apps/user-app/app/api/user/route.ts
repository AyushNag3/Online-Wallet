import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";

export const GET = async () => {
    const session = await getServerSession(authOptions); // In a server component, this is used and the content is passed as a parameter.
    if (session.user) {
        return NextResponse.json({
            message : "You are logged in",
            user: session.user
        })
    }
    console.log("You are not logged in")
    return NextResponse.json({
        message: "You are not logged in"
    }, {
        status: 403
    })
}