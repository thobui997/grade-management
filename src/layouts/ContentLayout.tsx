type ContentLayoutProps = {
  children: React.ReactNode;
};

const contentStyle: React.CSSProperties = {
  padding: 24,
  background: '#fff',
  borderRadius: '8px',
  overflow: 'auto',
  flex: 1,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
};

const ContentLayout = ({ children }: ContentLayoutProps) => {
  return <div style={contentStyle}>{children}</div>;
};

export default ContentLayout;
