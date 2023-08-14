import React, {useState, useEffect, useContext} from 'react';

const OrderContext = React.createContext("");

export function useOrder() {
    return useContext(OrderContext);
}

export function OrderProvider(props){
    const [orderPlaced, setOrderPlaced] = useState(false);

    const orderContextValue = {
        orderPlaced,
        setOrderPlaced
    };

    return(
        <OrderContext.Provider value={orderContextValue}>{props.children}</OrderContext.Provider>
    )
};