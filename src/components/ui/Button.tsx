import React from 'react';

export default function Button({
  btnStyle,
  children,
}: {
  btnStyle: string;
  children: React.ReactNode;
}) {
  return <button className={`${btnStyle} py-5 px-14 rounded`}>{children}</button>;
}
