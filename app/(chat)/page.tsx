import { cookies } from 'next/headers';

import { Chat } from '@/components/chat';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';

export default async function Page() {
  // 🔥 SKIP auth check
  // const session = await auth();
  // if (!session) {
  //   redirect('/api/auth/guest');
  // }

  const id = generateUUID();

  const cookieStore = cookies();
  const modelIdFromCookie = cookieStore.get('chat-model');

  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        initialChatModel={modelIdFromCookie?.value ?? DEFAULT_CHAT_MODEL}
        initialVisibilityType="private"
        isReadonly={false}
        // 🔥 REMOVE session prop
        // session={session}
        autoResume={false}
      />
      <DataStreamHandler id={id} />
    </>
  );
}
