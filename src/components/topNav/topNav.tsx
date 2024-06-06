import styles from './topNav.module.css';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Toolbar } from '@mui/material';

export default function TopNav() {
  const tabLinks = [
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Resume',
      href: '/resume',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
  ];

  return (
    <AppBar
      position="static"
      className={(styles.appBar)}
    >
      <Toolbar>
        <Link href="/" className={styles.appBarHeading}>
          Casey Eickhoff
        </Link>
        <Box sx={{ flexGrow: 1 }} className={styles.navLinksBox}>
          {tabLinks.map((link) => (
            <Link href={link.href} key={link.label} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
