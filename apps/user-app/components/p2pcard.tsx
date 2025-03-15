import { Card } from "@repo/ui/card"
import { Center } from "@repo/ui/Center"
import { clientserversession } from "../app/lib/actions/createOnrampTransaction"
import React from "react"



export const P2pcard = async(  {transfers}  : {transfers : {
    time : Date,
    amount : number,
    fromUserId : number,
    toUserId : number
}[]
}) => {
    const session = await clientserversession() ;

    if (!transfers.length) {
        return <div className="">
          <div className="">
          <Card title="Recent Transfers">  
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
           </Card>
          </div>

        </div> 
  }

  return <Card title="Recent Transaction">
       <div className="pt-2">
        {
            transfers.map((t,index) =>  {
                let content;
                if (t.fromUserId === session.user.id) {
                    content = <>
                     <div>
                    <div className="text-sm">
                        Sent INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    - Rs {t.amount}
                </div>
                    </>
                } else if (t.toUserId === session.user.id) {
                    content = <>
                     <div>
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {t.amount}
                </div>
                    </>
                }
                return (
                    <div key={index} className="border-b py-2 flex justify-between">
                        {content}
                    </div>
                );
            }

            )
        }
       </div>
  </Card>
}