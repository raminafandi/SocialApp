import React, { useState, useEffect, createContext } from 'react';

const ItemContext = createContext({
    selectedItems: [],
    selectItem: () => { },
    dragSelectedItems: () => { },
    clearSelectedItems: () => { },
    coverImage: '',
    setCoverImage: () => { },
    text: '',
    setText: () => { },
    tags: [],
    setTags: () => { },
})

const ItemProvider = ({ children, ...props }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [tags, setTags] = useState([]);
    const [text, setText] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const selectItem = (item) => setSelectedItems([...selectedItems, item]);
    const clearSelectedItems = () => {
        setCoverImage('')
        setTags([])
        setText('')
        setSelectedItems([])
    };
    return (
        <ItemContext.Provider
            value={{
                selectItem: selectItem,
                selectedItems: selectedItems,
                dragSelectedItems: setSelectedItems,
                clearSelectedItems: clearSelectedItems,
                tags: tags,
                coverImage: coverImage,
                text: text,
                setCoverImage: setCoverImage,
                setTags: setTags,
                setText: setText,
            }}
        >
            {children}
        </ItemContext.Provider>
    )
}


export { ItemContext, ItemProvider }