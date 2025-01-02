import React, { useState, useContext, ReactNode } from 'react';

const AppContext = React.createContext<AppContextType | undefined>(undefined);

interface AppContextType {
    auth_url: string;
    user_url: string;
    doc_url: string;
    chat_url: string;
    cloud_url: string;
    notification_url: string;
    history_url: string;
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
    alertInfor: string[];
    setAlertInfor: (infor: string[]) => void;
    usersOnline: string[];
    setUsersOnline: (users: string[]) => void;
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
    const notification_url = import.meta.env.VITE_APP_NOTIFICATION_URL;
    const history_url = import.meta.env.VITE_APP_HISTORY_URL;

    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [openDrawer, setOpenDrawer] = useState(false);
    const [error, setError] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertInfor, setAlertInfor] = useState<string[]>(['', '']);
    const [usersOnline, setUsersOnline] = useState<string[]>([]);

    return (
        <AppContext.Provider 
            value={{
                auth_url, user_url, doc_url, chat_url, 
                cloud_url, notification_url, history_url,
                loading, setLoading, 
                searchTerm, setSearchTerm, 
                openDrawer, setOpenDrawer,
                error, setError, 
                showAlert, setShowAlert, 
                alertInfor, setAlertInfor,
                usersOnline, setUsersOnline,
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
