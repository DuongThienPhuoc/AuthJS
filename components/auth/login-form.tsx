'use client'

import React, {useState} from "react";
import * as z from 'zod'
import CardWrapper from "@/components/auth/card-wrapper";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginSchema} from "@/schemas";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {login} from "@/actions/login";
import {useTransition} from "react";

export function LoginForm() {
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const [isPending, startTransition] = useTransition();

    const onSubmit = (value: z.infer<typeof LoginSchema>) => {
        setError('')
        setSuccess('')
        startTransition(async () => {
            const data = await login(value)
            setError(data.error)
            setSuccess(data.success)
        })
    }

    return (
        <CardWrapper headerLabel='Welcome back' backButtonLabel="Don't have a account" backButtonHref='/auth/register'
                     showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
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
                        <FormField control={form.control} name='password' render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Password
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
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}
