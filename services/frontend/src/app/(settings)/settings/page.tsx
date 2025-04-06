import { getUser } from "@/actions/login-action"
import Navbar from "@/components/home/navbar"
import { Divider } from "@/components/settings/Divider"
import { UserSettings } from "@/components/settings/UserSettings"
import { Separator } from "@/components/ui/separator"

export default async function Settings() {
    const response = await getUser();
    return (
        <>
        <div className="flex flex-col items-center justify-center">

            <Divider text="User settings" />
            <UserSettings firstname={response.firstname} lastname={response.lastname} email={response.username} />
            <Divider text="Buy Subscription" />
            
        </div>
        </>

    )

}