import {useStore} from './store'
export const useStoreApi = () => {
    const {state,dispatch} = useStore();

    return{
        address: state.address,
        balance: state.balance,
        BRCKbalance: state.BRCKbalance,
        message: state.message,
        setBalance: (newBalance) => {
            dispatch({
                type: "SET-BALANCE",
                newBalance
            })
        }, 
        setAddress: newAddress => {
            dispatch({
                type: "NEW-ADDY",
                newAddress,
                message: "New account added successfully!"
            })
        },
        setBRCKBalance: newBRCK => {
            dispatch({
                type: "SET-BRCK",
                newBRCK
            })
        }
    }
}