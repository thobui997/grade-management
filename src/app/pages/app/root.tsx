import { AppLayout } from '@app/components/layouts';

export const ErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};

const AppRoot = () => {
  return <AppLayout />;
};

export default AppRoot;
