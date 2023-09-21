import uncheckBox from '../../images/checkbox-uncheck.svg'
import checkBox from '../../images/checkbox-check.svg'
import './FilterCheckbox.css'

export default function FilterCheckbox({ isCheck, changeClick  }) {
  return (
    <div onClick={changeClick} className='search__checkbox'>
      <img src={isCheck ? checkBox : uncheckBox} alt="checkbox" />
      <span className='search__check-text'>Короткометражки</span>
    </div>
  );
};

