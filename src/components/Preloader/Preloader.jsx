import React from 'react';
import './Preloader.css';

const Preloader = ({ name }) => {
  return (
    <div className={`
      preloader
      ${name === 'btn'
      || name === 'smlbtn'
      ? 'preloader_type_btn'
      : ''
      }
    `}
    >
      <div className={`
        preloader__container
        ${name === 'btn'
        ? 'preloader__container_type_btn'
        : name === 'smlbtn'
        ? 'preloader__container_type_smlbtn'
        : ''
        }
      `}
      >
        <span className={`
          preloader__round
          ${name === 'btn'
          ? 'preloader__round_type_btn'
          : name === 'smlbtn'
          ? 'preloader__round_type_smlbtn'
          : ''
          }
        `}
        />
      </div>
    </div>
  );
};

export default Preloader;
