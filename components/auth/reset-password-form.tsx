'use client'

import React, {useState} from "react";
import * as z from 'zod'
import CardWrapper from "@/components/auth/card-wrapper";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ForgotPasswordSchema} from "@/schemas";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {useTransition} from "react";
import {resetPassword} from '@/actions/reset-password'

export function ResetPasswordForm() {
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: ''
        }
    });

    const [isPending, startTransition] = useTransition();

    const onSubmit = (value: z.infer<typeof ForgotPasswordSchema>) => {
        setError('')
        setSuccess('')
        startTransition(async () => {
            const {error, success} = await resetPassword(value)
            if (error) {
                setError(error)
            }
            if (success) {
                setSuccess(success)
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
                        <FormField control={form.control} name='email' render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='johndoe@example.com'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button type='submit' className='w-full' disabled={isPending}>
                        Send
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}
