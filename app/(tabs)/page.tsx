import Greeting from '../../components/Greeting';
import MessageOfTheDay from '../../components/MessageOfTheDay';
import ActivityOfDay from '../../components/ActivityOfDay';
import { getRandomMessage } from '../../data/messages';

export default function Page() {
  const initialMessage: string = getRandomMessage();
  return (
    <div className="space-y-6 sm:space-y-8">
      <Greeting />
      <MessageOfTheDay initial={initialMessage} />
      <ActivityOfDay />
    </div>
  );
}
