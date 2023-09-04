'use client'

import { Button, createStyles } from '@mantine/core'
import Link from 'next/link'
import { BaseError } from 'viem'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

const useStyles = createStyles((theme) => ({
    link: {
        textDecoration: 'none',
        textDecorationColor: '#fff',
        color: '#666',
    },
}));


export function Connect() {
    const { classes } = useStyles();
    const { connector, isConnected } = useAccount()
    const { connect, connectors, error } = useConnect()
    const { disconnect } = useDisconnect()

    return (
        <div>
            <div>
                {isConnected && <>
                    <Link className={classes.link} href={'/newsale'} style={{ display: 'contents' }}>
                        <Button color="dark" size="lg">
                            Go to your store
                        </Button>
                    </Link>
                </>
                }

                {connectors
                    .filter((c) => c.ready && c.id !== connector?.id)
                    .map((c) => (
                        <Button key={c.id} color="dark" size="lg" onClick={() => { connect({ connector: c }); }}>
                            Sign in with {c.name}
                        </Button>
                    ))}
            </div>

            {error && <div>{(error as BaseError).shortMessage}</div>}
        </div >
    )
}