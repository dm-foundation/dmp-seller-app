import Login from './login';
import { useAccount } from "wagmi";
import NewSale from './newsale';
import { useState, useEffect } from 'react'
import { Text } from '@mantine/core';

export default function Index() {
  const { isConnected } = useAccount()
  const [isUserConnected, setIsUserConnected] = useState(false)

  useEffect(() => {
    if (isConnected)
      setIsUserConnected(true)
  }, [])

  return (
    <>
      {isConnected ? <NewSale /> : <Login />}
    </>
  );
}
