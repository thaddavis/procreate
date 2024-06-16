"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/agents/rag/ChatSessionContext";
import { chatReducer, initialState } from "@/app/agents/rag/ChatSessionReducer";
import { Chat as RagChat } from "@/components/rag-chat/chat";
import { nanoid } from "@/lib/utils";
import { useReducer } from "react";

export default function Page() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);

  const sessionId = nanoid(8);

  return (
    <>
      <ChatContext.Provider value={chat}>
        <ChatDispatchContext.Provider value={dispatch}>
          <RagChat />
        </ChatDispatchContext.Provider>
      </ChatContext.Provider>
    </>
  );
}
