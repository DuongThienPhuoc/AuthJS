import {poppins} from "@/lib/fonts";
import {cn} from "@/lib/utils";

export default function Header({label}: { label: string }) {
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <h1 className={cn('text-3xl font-semibold', poppins.className)}>Auth</h1>
            <p className='text-muted-foreground text-sm'>{label}</p>
        </div>
    );
}
