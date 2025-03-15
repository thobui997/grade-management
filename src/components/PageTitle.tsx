import { memo } from 'react';

type PageTitleProps = {
  title: string;
};

const titleStyle: React.CSSProperties = {
  fontSize: '26px',
  fontWeight: 600,
  lineHeight: '32px',
  textTransform: 'capitalize'
};

const PageTitle = ({ title }: PageTitleProps) => {
  return <h2 style={titleStyle}>{title}</h2>;
};

export default memo(PageTitle);
