import Greeting from '../../components/Greeting';
import MessageOfTheDay from '../../components/MessageOfTheDay';
import ActivityOfTheDay from '../../components/ActivityOfTheDay';

export default function Page() {
  return (
    <>
      <Greeting />
      <div className="h-4" />
      <MessageOfTheDay />
      <div className="h-4" />
      <ActivityOfTheDay />
    </>
  );
}
