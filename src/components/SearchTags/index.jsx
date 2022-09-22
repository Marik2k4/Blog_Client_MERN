import React from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import { fetchFilteredTags } from '../../redux/slices/post';
import styles from './Search.module.scss';

const Search= () => {

  const dispatch = useDispatch();

  const [value, setValue] = React.useState(''); // введенный текст 

  const inputRef = React.useRef(null);

  const CleanFunc = () => {
    dispatch(fetchFilteredTags(''));
    setValue('');
    inputRef.current?.focus(); // наведение на input после его очищения 
  }
 
  // Отложенное выполнение функции, пока вводим текст 
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      // Отправляем на сервер то что ввели 
      dispatch(fetchFilteredTags(str));
      // console.log( inputRef.current.value )
    }, 400),
    [],  
  );

  const onChangeInput = (event) => {
    setValue(event.target.value); 
    updateSearchValue(event.target.value);
  }

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="EditableLine"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
      {/* Поле ввода */}
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput} 
        className={styles.input} 
        placeholder='Введите название тэга' 
      />
      {value && (
        // Крестик 
        <svg
          onClick={() => CleanFunc()}
          className={styles.clearIcon}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  )
}

export default Search;
