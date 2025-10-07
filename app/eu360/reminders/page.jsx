import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

const RemindersPanel = dynamic(() => import('../../../components/RemindersPanel'), { ssr: false });

export default function RemindersConfigPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Preferências de Lembretes</h2>
      <Suspense fallback={null}>
        <RemindersPanel />
      </Suspense>
    </div>
  );
}
