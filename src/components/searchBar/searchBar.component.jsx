import React from 'react'
import { SearchIcon } from '../../assets';

export const SearchBarComponent = ({searchValue, setSearchValue}) => {
  const onSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  }
  return(
    <div className="h-9 w-[300px] flex-row justify-between items-center border py-1 px-3 gap-1 rounded  flex">
      <input
        placeholder="Search"
        value={searchValue}
        onChange={onSearchValueChange}
        className="text-black font-normal text-sm outline-none w-full h-5 placeholder:text-secondary-200"
      />
      <SearchIcon />
    </div>
  );
}
