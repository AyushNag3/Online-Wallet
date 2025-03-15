
import { SendCard } from "../../../components/SendCard"
import { clientserversession } from "../../lib/actions/createOnrampTransaction";
import prisma from "@repo/db/client";


async function getp2p() {
     const session = await clientserversession() ;
     const userId = Number(session.user.id); // Get the user ID from the session
   //@ts-ignore
const transfers = await prisma.p2ptransfer.findMany({
    where: {
        OR: [
            { fromUserId: userId }, // Check if the user is the sender
            { toUserId: userId }    // Check if the user is the receiver
        ]
    }
})
  return transfers.map((t: { timestamp: any; amount: Number; fromUserId: Number; toUserId: Number; },index: any) => ({
    key : index,
    time: t.timestamp,
    amount: t.amount,
    fromUserId : t.fromUserId,
    toUserId : t.toUserId
}))


}
export default function() {
 return <div className="w-screen">
     <SendCard/>
 </div>
}