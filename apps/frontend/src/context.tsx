import React, { useState, useContext, ReactNode } from 'react';

const AppContext = React.createContext<AppContextType | undefined>(undefined);

interface AppContextType {
    auth_url: string;
    user_url: string;
    doc_url: string;
    chat_url: string;
    cloud_url: string;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    openDrawer: boolean;
    setOpenDrawer: (open: boolean) => void;
    error: string;
    setError: (error: string) => void;
    showAlert: boolean;
    setShowAlert: (alert: boolean) => void;
    alertMessage: string;
    setAlertMessage: (message: string) => void;
};

interface AppProviderProps {
    children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
    const auth_url = import.meta.env.VITE_APP_AUTH_URL;
    const user_url = import.meta.env.VITE_APP_USER_URL;
    const doc_url = import.meta.env.VITE_APP_DOCUMENT_URL;
    const chat_url = import.meta.env.VITE_APP_CHAT_URL;
    const cloud_url = import.meta.env.VITE_APP_CLOUD_URL;

    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [openDrawer, setOpenDrawer] = useState(false);
    const [error, setError] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    return (
        <AppContext.Provider 
            value={{ 
                auth_url, 
                user_url, 
                doc_url, 
                chat_url, 
                cloud_url,
                loading, 
                setLoading, 
                searchTerm, 
                setSearchTerm, 
                openDrawer, 
                setOpenDrawer,
                error,
                setError, 
                showAlert, 
                setShowAlert, 
                alertMessage, 
                setAlertMessage 
            }}
        >
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
