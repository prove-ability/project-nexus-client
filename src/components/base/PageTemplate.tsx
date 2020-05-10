import { NextPage } from 'next';
import { ReactNode } from 'react';

import Header from './Header';

interface PageTemplateProps {
  hideHeader?: boolean;
  style?: React.CSSProperties;
  className?: string;
  children: ReactNode;
}

const PageTemplate: NextPage<PageTemplateProps> = ({
  hideHeader,
  style,
  className,
  children,
}) => (
  <div style={style} className={className}>
    {!hideHeader && (
      <>
        <Header />
      </>
    )}
    {children}
  </div>
);

export default React.memo(PageTemplate);
