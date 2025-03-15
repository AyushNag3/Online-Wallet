import { Button } from "./button";
import { HiDocumentCurrencyRupee } from "react-icons/hi2";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="flex justify-between border-b border-slate-400 px-4">
        <div className="text-5xl flex flex-col justify-center pl-6">
            <HiDocumentCurrencyRupee/>
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}