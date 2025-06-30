import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import BottomNav from '../BottomNav/BottomNav';
import styles from './Layout.module.css';
import { Page } from '../../types/types';

interface LayoutProps {
  children: React.ReactNode;
  activePage: Page;
  onPageChange: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  activePage,
  onPageChange,
}) => {
  return (
    <div className={styles.layout}>
      <Sidebar activePage={activePage} onPageChange={onPageChange} />
      <BottomNav activePage={activePage} onPageChange={onPageChange} />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
