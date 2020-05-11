import { NextPage } from 'next';
import { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';

interface PageTemplateProps {
  hideHeader?: boolean;
  className?: string;
  children: ReactNode;
}

const PageTemplate: NextPage<PageTemplateProps> = ({
  hideHeader, // 추후 사용 예정
  className, // 추후 사용 예정
  children,
}) => (
  <div className={className}>
    {!hideHeader && (
      <>
        <Header />
      </>
    )}
    {children}
    <>
      <Footer />
    </>
  </div>
);

export default React.memo(PageTemplate);
