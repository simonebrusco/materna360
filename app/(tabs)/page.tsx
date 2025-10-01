import Greeting from '../../components/Greeting';
import MessageOfTheDay from '../../components/MessageOfTheDay';
import ActivityOfDay from '../../components/ActivityOfDay';
import { getRandomMessage } from '../../data/messages';

export default function Page() {
  const initialMessage: string = getRandomMessage();
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-10">
      <Greeting />
      <MessageOfTheDay initial={initialMessage} />
      <ActivityOfDay />
    </div>
  );
}
