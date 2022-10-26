import React, { ChangeEvent, useRef } from 'react'
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../redux/slices/filterSlice';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeSearch = React.useCallback(debounce((str: string) => {
    dispatch(setSearch(str));
  }, 500), []);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChangeSearch(e.target.value);
  }

  return (
    <div className={styles.search}>
      <input ref={inputRef} placeholder='Поиск пиццы...' value={value} onChange={(e)=>onChangeInput(e)} />
    </div>
  )
}

export default Search
