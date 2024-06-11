import React, { useState, useContext, useEffect, useCallback, ReactNode } from 'react';
import axios from 'axios';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const AppContext = React.createContext<AppContextType | undefined>(undefined);

interface Document {
  id: string;
  name: string;
  image: string;
  info: string;
  glass: string;
}

interface AppContextType {
  loading: boolean;
  documents: Document[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('a');
  const [documents, setDocuments] = useState<Document[]>([]);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      console.log(data);
      const { drinks } = data;
      if (drinks) {
        const newCocktails = drinks.map((item: any) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,
          } = item;

          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setDocuments(newCocktails);
      } else {
        setDocuments([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchDocuments();
  }, [searchTerm, fetchDocuments]);

  return (
    <AppContext.Provider
      value={{ loading, documents, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a AppProvider');
  }
  return context;
};

export { AppContext, AppProvider };
