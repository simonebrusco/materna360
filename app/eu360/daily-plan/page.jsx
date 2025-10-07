import dynamic from 'next/dynamic';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

const DailyPlanPanel = dynamic(() => import('../../../components/DailyPlanPanel'), { ssr: false });

export default function DailyPlanPage(){
  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Plano diário</h2>
      <DailyPlanPanel />
    </div>
  );
}
