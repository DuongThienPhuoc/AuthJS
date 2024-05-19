'use client'

import {FcGoogle} from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa'
import {Button} from "@/components/ui/button";
import {loginWithProvider} from "@/actions/login";

export default function Social() {
    return (
        <div className='flex items-center w-full gap-2'>
            <Button size='lg' className='w-full' variant='outline' onClick={async () => {
                await loginWithProvider('google')
            }
            }>
                <FcGoogle className='h-5 w-5'/>
            </Button>

            <Button size='lg' className='w-full' variant='outline' onClick={async () => {
                await loginWithProvider("github");
            }}>
                <FaGithub className='h-5 w-5'/>
            </Button>
        </div>
    );
}
