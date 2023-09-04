'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export function Connected({ children }: { children: React.ReactNode }) {
    const { isConnected } = useAccount()
    const [isUserConnected, setIsUserConnected] = useState(false)

    useEffect(() => {
        setIsUserConnected(isConnected)
    }, [])

    if (!isUserConnected) return null;
    return (
        <>
            {children}
        </>
    );
}