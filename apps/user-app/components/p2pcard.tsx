import { Card } from "@repo/ui/card"
import { Center } from "@repo/ui/Center"
import { clientserversession } from "../app/lib/actions/createOnrampTransaction"
import React from "react"


export const P2pcard = async ({ transfers }: { 
    transfers?: { 
      time: string | Date; // Handle both string and Date types
      amount: number;
      fromUserId: number; // Corrected type
      toUserId: number;
    }[] 
  }) => {
    const session = await clientserversession();
  
    if (!transfers || transfers.length === 0) { // Added check for undefined
      return (
        <div className="">
          <Card title="Recent Transfers">
            <div className="text-center pb-8 pt-8">
              No Recent transactions
            </div>
          </Card>
        </div>
      );
    }
  
    return (
      <Card title="Recent Transaction">
        <div className="">
          {transfers.map((t, index) => {
            let content;
            const formattedTime = new Date(t.time).toDateString(); // Ensure proper date formatting
  
            if (t.fromUserId === Number(session.user.id)) {
                content = (
                    <>
                        <div>
                            <div className="text-sm">Sent INR</div>
                            <div className="text-slate-600 text-xs">{formattedTime}</div>
                        </div>
                        <div className="flex flex-col justify-center">- Rs {t.amount}</div>
                    </>
                );
            } else  {
                content = (
                    <>
                        <div>
                            <div className="text-sm">Received INR</div>
                            <div className="text-slate-600 text-xs">{formattedTime}</div>
                        </div>
                        <div className="flex flex-col justify-center">+ Rs {t.amount}</div>
                    </>
                );
            } 

            return (
              <div key={index} className=" flex justify-between">
                {content}
              </div>
            );
          })}
        </div>
      </Card>
    );
  };