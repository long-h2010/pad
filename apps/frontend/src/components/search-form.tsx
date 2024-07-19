import React, { useRef, FormEvent } from "react";
import GroupStyles from "../pages/document/group/style";
import { TextField } from "@mui/material";

interface SearchFormProps {
  setSearch: (value: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ setSearch }) => {
  const { classes } = GroupStyles();
  const searchValue = useRef<HTMLInputElement>(null);

  const searchUser = () => {
    if (searchValue.current) {
      const inputElement =
        searchValue.current.querySelector<HTMLInputElement>("input");
      if (inputElement) {
        setSearch(inputElement.value);
      }
      
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <TextField
          id="outlined-multiline-flexible"
          multiline
          maxRows={1}
          className={classes.inputSearch}
          placeholder="Nhập tên người dùng"
          ref={searchValue}
          onChange={searchUser}
        />
    </form>
  );
};

export default SearchForm;
