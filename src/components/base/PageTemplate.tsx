// import Header from './Header';
// import FloatingHeader from './FloatingHeader';

import { NextPage } from 'next';
import { ReactNode } from 'react';

// const PageTemplateBlock = styled.div``;

interface PageTemplateProps {
  // hideHeader?: boolean;
  style?: React.CSSProperties;
  className?: string;
  children: ReactNode;
}

const PageTemplate: NextPage<PageTemplateProps> = ({
  // hideHeader,
  style,
  className,
  children,
}) => (
  <div style={style} className={className}>
    {/* {!hideHeader && ( */}
    <>
      {/* <Header /> */}
      {/* <FloatingHeader /> */}
      test 안녕하세요!
    </>
    {/* )} */}
    {children}
  </div>
);

export default React.memo(PageTemplate);
