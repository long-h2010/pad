import React, { useState, useContext, ReactNode } from 'react';

const AppContext = React.createContext<AppContextType | undefined>(undefined);

interface AppContextType {
    auth_url: string;
    user_url: string;
    doc_url: string;
    chat_url: string;
    loading: boolean;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    open: boolean;
    toggleDrawer: (open: boolean) => void;
};

interface AppProviderProps {
    children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
    const auth_url = import.meta.env.VITE_APP_AUTH_URL;
    const user_url = import.meta.env.VITE_APP_USER_URL;
    const doc_url = import.meta.env.VITE_APP_DOCUMENT_URL;
    const chat_url = import.meta.env.VITE_APP_CHAT_URL;

    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);

    const toggleDrawer = (open: boolean) => {
        setOpen(open);
    };

    return (
        <AppContext.Provider value={{ auth_url, user_url, doc_url, chat_url, loading, searchTerm, setSearchTerm, open, toggleDrawer }}>
            {children}
        </AppContext.Provider>
    );
};

// make sure use
export const useGlobalContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useGlobalContext must be used within a AppProvider');
    return context;
};

export { AppContext, AppProvider }
