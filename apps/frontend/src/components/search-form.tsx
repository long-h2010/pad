import React, { useEffect, useRef, FormEvent } from 'react';
import { useGlobalContext } from '../context';
import { Search } from '@mui/icons-material';

const SearchForm: React.FC = () => {
    const { setSearchTerm } = useGlobalContext();
    const searchValue = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (searchValue.current) {
            searchValue.current.focus();
        }
    }, []);

    const searchCocktail = () => {
        if (searchValue.current) {
            setSearchTerm(searchValue.current.value);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <section className='section search' style={{ width: '80%', height: "45px" }}>
            <form className='search-form' onSubmit={handleSubmit}>
                <div className='form-control' style={{ width: "100%", height: "100%" }}>
                    <Search />
                    <input
                        type='text'
                        placeholder='Tìm kiếm'
                        name='name'
                        id='name'
                        ref={searchValue}
                        onChange={searchCocktail}
                    />
                </div>
            </form>
        </section>
    );
};

export default SearchForm
