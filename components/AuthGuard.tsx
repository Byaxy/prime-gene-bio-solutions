import React from "react";
import { useSession, signIn, signOut } from "next-auth/react"

export default function AuthGuard(
    { children } : { children: React.ReactNode }
) {
    const { data: session }  = useSession();

    if(session) return <>{children}</>

    return (
        <>
            <p>Please sign in</p>
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}