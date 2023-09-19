'use client'

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export default function Connected({ children }: { children: React.ReactNode }) {
    const [isUserConnected, setIsUserConnected] = useState(false)
    const { isConnected } = useAccount();

    useEffect(() => {
        setIsUserConnected(isConnected);
    }, [])

    if (!isUserConnected) return null;
    return (
        <>
            {children}
        </>
    );
}