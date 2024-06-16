import React, { useState, useContext, useEffect, useCallback, ReactNode } from 'react';
import axios from 'axios';

const AppContext = React.createContext<AppContextType | undefined>(undefined);

interface Document {
    id: string;
    name: string;
    date: Date,
    tag: Array<string>
};

interface AppContextType {
    loading: boolean;
    documents: Document[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
};

interface AppProviderProps {
    children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [documents, setDocuments] = useState<Document[]>([]);

    const fetchDocuments = useCallback(async () => {
        setLoading(true);
        try {
            axios.get(import.meta.env.VITE_APP_DOCUMENTS_URL, { headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                    const newListDocuments = res.data.map((document: any) => {
                        const { _id, name, updatedAt, tag } = document;
                        return { id: _id, name, date: updatedAt, tag };
                });
                    setDocuments(newListDocuments);
                })
                .catch(err => {
                    console.log('Error when fetch documents data: ', err);
                })
            setTimeout(() => {
                setLoading(false);
            }, 1000)
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, [searchTerm]);

    useEffect(() => {
      fetchDocuments();
    }, [searchTerm, fetchDocuments]);

    return (
        <AppContext.Provider value={{ loading, documents, searchTerm, setSearchTerm }}>
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
