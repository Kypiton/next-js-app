import React from 'react';

export default function Button({
  btnStyle,
  children,
  onClick,
}: {
  btnStyle: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button className={btnStyle} onClick={onClick}>
      {children}
    </button>
  );
}
