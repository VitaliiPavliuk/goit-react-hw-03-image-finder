import PropTypes from 'prop-types';
import { LoadMoreBtnStyled } from './Button.styled';

export const LoadMoreBtn = ({ handleLoadMore }) => {
  return (
    <LoadMoreBtnStyled onClick={handleLoadMore}>Load More</LoadMoreBtnStyled>
  );
};

LoadMoreBtn.propTypes = { handleLoadMore: PropTypes.func.isRequired };
