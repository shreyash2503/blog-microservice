import Navbar from "@/components/home/navbar"
import { Divider } from "@/components/settings/Divider"
import { UserSettings } from "@/components/settings/UserSettings"
import { Separator } from "@/components/ui/separator"

export default function Settings() {
    return (
        <>
        <div className="flex flex-col items-center justify-center">

            <Divider text="User settings" />
            <UserSettings />
            
        </div>
        </>

    )

}