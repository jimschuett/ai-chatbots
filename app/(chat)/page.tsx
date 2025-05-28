import { cookies } from 'next/headers';

import { Chat } from '@/components/chat';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';

export default async function Page() {
  const id = generateUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('chat-model');
  const modelId = modelIdFromCookie?.value ?? DEFAULT_CHAT_MODEL;

  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        initialChatModel={modelId}
        initialVisibilityType="private"
        isReadonly={false}
        session={{
          user: {
            id: 'guest',
            type: 'guest',
            name: 'Guest',
            email: 'guest@example.com',
          },
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // expires in 1 day
        }}
        autoResume={false}
      />
      <DataStreamHandler id={id} />
    </>
  );
}
