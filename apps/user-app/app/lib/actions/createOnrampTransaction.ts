"use server"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { AuthOptions } from "next-auth"

export async function createOnRampTransaction(amount : number, provider : string) {
    
}
