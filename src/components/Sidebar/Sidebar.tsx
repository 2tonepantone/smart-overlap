import React from 'react';
import styles from './Sidebar.module.css';
import { Page } from '../../types/types';

// Placeholder for icon components
const Icon = ({ name, className }: { name: string; className: string }) => (
  <span className={className}>{name}</span>
);

interface SidebarProps {
  activePage: Page;
  onPageChange: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onPageChange }) => {
  // In Vite, files in the `public` directory are served from the root.
  // We reference it directly with an absolute path string.
  const logoUrl = '/favicon.svg';

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logoUrl} alt="Logo" className={styles.logoIcon} />
        <span className={styles.logoText}>Overlap</span>
      </div>
      <nav className={styles.nav}>
        <button
          className={`${styles.navItem} ${activePage === 'Grid' ? styles.active : ''}`}
          onClick={() => onPageChange('Grid')}
        >
          <Icon name="📅" className={styles.icon} />
          <span>Overlap Grid</span>
        </button>
        <button
          className={`${styles.navItem} ${activePage === 'People' ? styles.active : ''}`}
          onClick={() => onPageChange('People')}
        >
          <Icon name="👥" className={styles.icon} />
          <span>People & Groups</span>
        </button>
        <button
          className={`${styles.navItem} ${activePage === 'Me' ? styles.active : ''}`}
          onClick={() => onPageChange('Me')}
        >
          <Icon name="👤" className={styles.icon} />
          <span>My Availability</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
