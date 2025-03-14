"use server"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { AuthOptions } from "next-auth"
import { authOptions } from "../auth"

export async function clientserversession() {
    const session = await getServerSession(authOptions)
    return session 
}

export async function createOnRampTransaction(amount : string, provider : string) {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    const token = (Math.random()*1000).toString()
    await prisma.onRampTransaction.create({
        data : {
            provider : provider,
            status : "Processing",
            startTime : new Date(),
            token : token ,
            userId : Number(session.user.id),
            amount : Number(amount)
        }
    })
    return {
        message : "Done"
    }
}
