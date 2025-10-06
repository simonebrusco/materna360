import PremiumDownloadsList from '../../components/PremiumDownloadsList';
import DownloadsHistory from '../../components/DownloadsHistory';
import DownloadsToasts from '../../components/DownloadsToasts';

export default function RecursosPage(){
  return (
    <>
      <PremiumDownloadsList />
      <DownloadsHistory />
      <DownloadsToasts />
    </>
  );
}
