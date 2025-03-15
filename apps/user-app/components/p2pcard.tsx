import { Card } from "@repo/ui/card"
import { Center } from "@repo/ui/Center"
export const P2pcard =(  {transfers}  : {transfers : {
    time : Date,
    amount : Number,
    fromUserId : Number
    toUserId : Number
}[]
}) => {
    if (transfers.length) {
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

  </Card>
}