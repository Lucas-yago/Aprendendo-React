import './style.css';

export const SearchBar = ({ searchValue, handleChange }) => {

  return (
    <input
      onChange={handleChange}
      value={searchValue}
      type="search"
      placeholder="Buscar por..."
    />
  )

}