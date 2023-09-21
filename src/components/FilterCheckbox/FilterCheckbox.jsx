import './FilterCheckbox.css'
import uncheckBox from '../../images/checkbox-uncheck.svg'
import checkBox from '../../images/checkbox-check.svg'

export default function FilterCheckbox({ isCheck, changeShot  }) {
  return (
    <div onClick={changeShot} className='search__checkbox'>
      <img src={isCheck ? checkBox : uncheckBox} alt="checkbox" />
      <span className='search__check-text'>Короткометражки</span>
    </div>
  );
};

