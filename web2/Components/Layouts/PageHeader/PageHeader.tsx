import { FC } from 'react';


interface PageHeaderProps {
  title: string;
  subtitle?: string;
  textAlign?: 'left' | 'center';
  showBreadcrumb?: boolean;
  size?: 's' | 'm' | 'l' | 'xl';
}

const PADDING_SIZES: { [name: string]: string } = {
  s: 'px-3 px-md-7 pb-4',
  m: 'px-3 px-md-7 pb-5',
  l: 'px-3 px-md-7 pb-7',
  xl: 'px-3 px-md-7 pb-8'
};

const TITLE_MARGINS: { [name: string]: string } = {
  s: 'mb-2',
  m: 'mb-3 mt-4',
  l: 'mb-3 mt-5',
  xl: 'mb-3 mt-5'
};

const getPaddingClass = (size: string): string => {
  return PADDING_SIZES[size];
};

const getTitleMargins = (size: string): string => {
  return TITLE_MARGINS[size];
};

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  subtitle,
  textAlign = 'center',
  size = 's'
}) => {
  const alignClass = textAlign === 'left' ? 'align-items-start' : 'align-items-center';

  return (
    <header className={`row d-flex flex-column bg-gradient text-black ${getPaddingClass(size)}`}>
      <div className={`mt-4 d-flex flex-column ${alignClass}`}>
        <h1 className={`${getTitleMargins(size)} fw-bold`}>{title}</h1>
        <p className='mb-0'>{subtitle}</p>
      </div>
    </header>
  );
};
