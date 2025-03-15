
import { SendCard } from "../../../components/SendCard"
import { clientserversession } from "../../lib/actions/createOnrampTransaction";
import prisma from "@repo/db/client";
import { P2pcard } from "../../../components/p2pcard";
import { BalanceCard } from "../../../components/BalanceCard";
import { getBalance } from "../transfer/page";


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

  return transfers.map((t: { timestamp: Date; amount: number; fromUserId: number; toUserId: number; },index: any) => ({
    key : index,
    time: t.timestamp,
    amount: t.amount,
    fromUserId : t.fromUserId,
    toUserId : t.toUserId
}))


}
export default async function() {
    const transfer = await getp2p() ;  // transfer is an obj too
    const balance = await getBalance() ; // object is returned named balance

 return <div className="w-screen">
     <div className="text-4xl text-[#6a51a6] pt-8 mb-16 font-bold">
            Transfer
        </div>
  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 p-2 ">
    <div className="col-span-1 ">
    <SendCard />
    </div>
    <div className="col-span-1 ">
        <BalanceCard amount={balance.amount} locked={0} />
          <div className="pt-4">
          <P2pcard transfers = {transfer}></P2pcard>
             </div>
    </div>
 
 </div>
 </div>
}