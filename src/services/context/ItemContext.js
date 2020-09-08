import React, { useState, useEffect, createContext } from 'react';

const ItemContext = createContext({
    selectedItems: [],
    selectItem: () => { },
    clearSelectedItems: () => { },
})

const ItemProvider = ({ children, ...props }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const selectItem = (item) => setSelectedItems([...selectedItems, item]);
    const clearSelectedItems = () => setSelectedItems([]);
    return (
        <ItemContext.Provider
            value={{
                selectItem: selectItem,
                selectedItems: selectedItems,
                clearSelectedItems: clearSelectedItems
            }}
        >
            {children}
        </ItemContext.Provider>
    )
}


export { ItemContext, ItemProvider }