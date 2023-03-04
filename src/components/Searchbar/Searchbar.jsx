import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;
    const query = form.elements.query.value;

    onSubmit(query);
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <AiOutlineSearch size={20} />
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
        </SearchFormBtn>

        <SearchFormInput
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
