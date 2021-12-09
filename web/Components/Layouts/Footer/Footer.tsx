import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer
      key={'footer'}
      style={{ zIndex: 10 }}
      className='footer border-top pt-5 p-4 container-fluid bg-primary-dark'>
      <p className='mt-4 py-3 text-center text-dark'>
          Raquel Sauras Salas, <b>2021</b>
      </p>
    </footer>
  );
};
