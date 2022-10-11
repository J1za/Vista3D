import React, { useState, createContext } from "react"
const ModalContext = createContext<any>({});

const useModal = () => {
    const context = React.useContext(ModalContext)
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider")
    }
    return context
}
const ModalProvider = (props: any) => {
    const [showModal, setShowModal] = useState(false)
    const toggleModal = () => setShowModal(!showModal)
    const modals = {
        loginModal: { showModal, toggleModal }
    }
    return <ModalContext.Provider value={modals} {...props} />
}
export { ModalProvider, useModal }