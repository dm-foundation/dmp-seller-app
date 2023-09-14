'use client'

import { useContext, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { ContextType } from '@/context/contextTypes';
import { MyContext } from '@/context/myContext';
import get from '@/api/api';

export default function Connected({ children }: { children: React.ReactNode }) {
    const { address, isConnected } = useAccount()
    const [isUserConnected, setIsUserConnected] = useState(false)

    const { ctx, updateCtx } = useContext(MyContext) as ContextType;
    const setLoginWalletAddress = (walletAddress: string | undefined) => {
        ctx.ethAddress = walletAddress?.toString() as string;
        updateCtx(ctx);
    }

    async function fetchStoreInfo() {
        try {
            const walletData = await get(`/wallet-address/${address}`);
            ctx.ethAddress = walletData.ethAddress;
            ctx.storeId = walletData.storeId;

            const storeData = await get(`/store/${ctx.storeId}`);
            ctx.storeName = storeData.name;
            ctx.storeEmail = storeData.email;

            updateCtx(ctx);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        setIsUserConnected(isConnected);
        setLoginWalletAddress(address);
        fetchStoreInfo();
    }, [])

    if (!isUserConnected) return null;
    return (
        <>
            {children}
        </>
    );
}