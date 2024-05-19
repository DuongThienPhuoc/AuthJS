import CardWrapper from "@/components/auth/card-wrapper";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";

export default function ErrorCard() {
    return (
        <CardWrapper headerLabel="Something went wrong" backButtonLabel='Back to Login' backButtonHref='/auth/login'>
            <div className='w-full items-center flex justify-center'>
                <ExclamationTriangleIcon className='text-destructive h-10 w-10'/>
            </div>
        </CardWrapper>
    );
}
