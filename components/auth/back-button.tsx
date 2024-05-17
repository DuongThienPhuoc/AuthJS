'use client'

import React from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function BackButton({label, href}: { label: string, href: string }) {
    return (
        <Button variant='link' asChild className='font-normal w-full'>
            <Link href={href}>{label}</Link>
        </Button>
    );
}