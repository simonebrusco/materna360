import Greeting from '../../components/Greeting';
import MessageOfTheDay from '../../components/MessageOfTheDay';
import ActivityOfDay from '../../components/ActivityOfDay';
import { getRandomMessage } from '../../data/messages';

export default function Page() {
  const initialMessage: string = getRandomMessage();
  return (
    <>
      <Greeting />
      <div className="h-4" />
      <MessageOfTheDay initial={initialMessage} />
      <div className="h-4" />
      <ActivityOfDay />
    </>
  );
}
