import React from 'react';
import styles from './BottomNav.module.css';
import { Page } from '../../types/types';

// Placeholder for icon components
const Icon = ({ name, className }: { name: string; className: string }) => (
  <span className={className}>{name}</span>
);

interface BottomNavProps {
  activePage: Page;
  onPageChange: (page: Page) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activePage, onPageChange }) => {
  return (
    <nav className={styles.bottomNav}>
      <button
        className={`${styles.navItem} ${activePage === 'Grid' ? styles.active : ''}`}
        onClick={() => onPageChange('Grid')}
      >
        <Icon name="📅" className={styles.icon} />
        Grid
      </button>
      <button
        className={`${styles.navItem} ${activePage === 'People' ? styles.active : ''}`}
        onClick={() => onPageChange('People')}
      >
        <Icon name="👥" className={styles.icon} />
        People
      </button>
      <button
        className={`${styles.navItem} ${activePage === 'Me' ? styles.active : ''}`}
        onClick={() => onPageChange('Me')}
      >
        <Icon name="👤" className={styles.icon} />
        My Info
      </button>
    </nav>
  );
};

export default BottomNav;
