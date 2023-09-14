import * as React from 'react';
import { IContext, ContextType } from './contextTypes'
import { createContext } from 'react';

export const MyContext = createContext<ContextType | null>(null);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [ctx, setCtx] = React.useState<IContext>({} as IContext);

    const updateCtx = (ctx: IContext) => {
        setCtx(ctx);
        return ctx;
    }

    return (
        <MyContext.Provider value={{ ctx, updateCtx }}>
            {children}
        </MyContext.Provider>
    );
}

export default ContextProvider;
