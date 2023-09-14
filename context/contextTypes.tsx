export interface IContext {
    storeId: number;
    storeName: string;
    storeEmail: string;
    ethAddress: string;
}

export type ContextType = {
    ctx: IContext;
    updateCtx: (ctx: IContext) => IContext;
};