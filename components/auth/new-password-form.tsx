'use client'

import React, {useState} from "react";
import * as z from 'zod'
import CardWrapper from "@/components/auth/card-wrapper";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ChangePasswordSchema} from "@/schemas";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {useTransition} from "react";
import {useSearchParams} from "next/navigation";
import {changePassword} from '@/actions/reset-password'

export function NewPasswordForm() {
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const form = useForm<z.infer<typeof ChangePasswordSchema>>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            password: ''
        }
    });
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const token = searchParams.get('token')
    const onSubmit = (value: z.infer<typeof ChangePasswordSchema>) => {
        setError('')
        setSuccess('')
        startTransition(async () => {
            if (token) {
                const {error, success} = await changePassword(value, token)
                if (error) {
                    setError(error)
                }
                if (success) {
                    setSuccess(success)
                }
            }
        })
    }

    return (
        <CardWrapper headerLabel='Forgot Password' backButtonLabel="Back To Login" backButtonHref='/auth/login'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit((value) => {
                    onSubmit(value)
                })}
                      className='space-y-6'
                >
                    <div className='space-y-4'>
                        <FormField control={form.control} name='password' render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    New Password
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} type='password'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button type='submit' className='w-full' disabled={isPending}>
                        Change Password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}
