import React, { FormEvent } from 'react';
import { TextField } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

interface SearchFormProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
}

const useStyles = makeStyles()(() => {
    return {
        inputSearch: {
            width: 250,
            marginRight: '10px',
            borderRadius: '4px',
            backgroundColor: 'white',
        }
    }
});

const SearchForm: React.FC<SearchFormProps> = ({ searchValue, setSearchValue }) => {
    const { classes } = useStyles();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <form className='search-form' onSubmit={handleSubmit}>
            <TextField
                id='outlined-multiline-flexible'
                multiline
                maxRows={1}
                className={classes.inputSearch}
                placeholder='Nhập tên người dùng'
                onChange={e => { setSearchValue(e.target.value) }}
                value={searchValue}
            />
        </form>
    );
};

export default SearchForm
