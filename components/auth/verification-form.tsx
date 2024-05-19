'use client'

import CardWrapper from "@/components/auth/card-wrapper";
import {BeatLoader} from "react-spinners";
import {useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {verification} from "@/actions/verification";
import {FormSuccess} from "@/components/form-success";
import {FormError} from "@/components/form-error";

export default function NewVerificationForm() {
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [loading, setLoading] = useState<boolean>(true);
    const searchParam = useSearchParams();
    const token = searchParam.get('token');

    const verify = useCallback(async () => {
        if (token) {
            return await verification(token);
        }
    }, [token]);

    useEffect(() => {
        verify().then((status) => {
            setError(status?.error);
            setSuccess(status?.success)
            setLoading(false)
        }).catch(() => {
            setError('An error occurred')
        });
    }, [verify]);

    return (
        <CardWrapper headerLabel='Verification Email' backButtonHref='/auth/login' backButtonLabel='Back To Login'>
            <div className='flex w-full justify-center items-center'>
                <BeatLoader size={15} loading={loading}/>
                <FormSuccess message={success}/>
                <FormError message={error}/>
            </div>
        </CardWrapper>
    );
}
