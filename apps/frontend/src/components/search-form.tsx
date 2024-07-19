import React, { useEffect, useRef, FormEvent, useState } from "react";
import { Input } from "@mui/joy";
import GroupStyles from "../pages/document/group/style";

interface SearchFormProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ search, setSearch }) => {
  const { classes } = GroupStyles();
  const searchValue = useRef<HTMLInputElement>(null);

  const searchUser = () => {
    if (searchValue.current) {
      const inputElement =
        searchValue.current.querySelector<HTMLInputElement>("input");
      if (inputElement) {
        console.log(inputElement.value);
        setSearch(inputElement.value);
      }
      
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <Input
        className={classes.inputSearch}
        variant="outlined"
        placeholder="Nhập tên người dùng"
        ref={searchValue}
        onChange={searchUser}
      />
    </form>
  );
};

export default SearchForm;
