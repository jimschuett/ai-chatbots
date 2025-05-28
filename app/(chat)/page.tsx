import { cookies } from 'next/headers';

import { Chat } from '@/components/chat';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';

export default async function Page() {
  const id = generateUUID();

  // ✅ FIX: cookies() is async — add await
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
        autoResume={false}
      />
      <DataStreamHandler id={id} />
    </>
  );
}
