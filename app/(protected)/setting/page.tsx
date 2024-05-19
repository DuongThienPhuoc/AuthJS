import {auth, signOut} from "@/auth";
import {Button} from "@/components/ui/button";
import {DEFAULT_LOGIN_REDIRECT} from "@/route";

export default async function SettingPage() {
    const session = await auth()
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <h1>Protect Screen</h1>
            <form action={async () => {
                'use server'
                await signOut({redirectTo: DEFAULT_LOGIN_REDIRECT})
            }}>
                <Button type='submit'>Sign out</Button>
            </form>
        </div>
    );
}
