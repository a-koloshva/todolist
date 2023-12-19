import React from 'react';

type ButtonPropsType = {
  name: string;
  changeFilter: () => void;
};

export const Button = (props: ButtonPropsType) => {
  return (
    <button
      onClick={() => {
        props.changeFilter();
      }}>
      {props.name}
    </button>
  );
};
