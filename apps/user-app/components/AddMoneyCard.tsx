"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/Center";
import { Select } from "@repo/ui/Select";
import { useState } from "react";
import { TextInput } from "@repo/ui/TextInput";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";
import { Providers } from "../provider";

import axios from 'axios'

import { clientserversession } from "../app/lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl); // ?. If the bank is found with that name, setRedirectUrl updates with url with the url of the bank that is found.
    const [amount, setamount] = useState("") ;
    const [provider, setprovider] = useState(SUPPORTED_BANKS[0]?.name || "")
    return <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => {
           setamount(val)
        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
            setprovider(SUPPORTED_BANKS.find(x=> x.name === value)?.name || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={ async() => {
                 const session =  await clientserversession() ;
                await createOnRampTransaction(amount, provider);
                axios.post('http://localhost:3003/hdfcWebhook', {
                    token : session.user.token,
                    user_id : session.user.id,
                    amount : amount
                } )
                window.location.href = redirectUrl || "";
               
            }}>
            Add Money
            </Button>
        </div>
    </div>
</Card>
}