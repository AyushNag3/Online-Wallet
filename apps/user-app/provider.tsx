"use client"
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";

export const Providers = ({children}: {children: React.ReactNode}) => {
    return ( <>
        <SessionProvider> 
           {children}     
        </SessionProvider>
        </>
    )
    
}
 // To be able to use useSession first you'll need to expose the session context, 
 // SessionProvider at the top level of your application
// Since, SessionProvider is a part of react lib, it can be used in client comp and not in server. 
// Hence it is exported and imported in server comp. eg : layout.tsx