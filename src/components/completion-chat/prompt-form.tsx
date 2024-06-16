"use client";

import * as React from "react";

import { ChatDispatchContext } from "@/app/agents/completion/ChatContext";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import { nanoid } from "@/lib/utils";
import { callCompletionAgent } from "@/services/callCompletionAgent";
import { useRouter } from "next/navigation";

export function PromptForm({
  input,
  setInput,
}: {
  input: string;
  setInput: (value: string) => void;
}) {
  const router = useRouter();
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const dispatch = React.useContext(ChatDispatchContext);

  return (
    <form
      ref={formRef}
      onSubmit={async (e: any) => {
        const humanMessageId = nanoid();
        const value = input.trim();
        try {
          e.preventDefault();

          setInput("");
          if (!value) return;

          dispatch({
            type: "ADD_MESSAGE",
            payload: {
              id: humanMessageId,
              content: value,
              role: "human",
              error: null,
            },
          });

          dispatch({
            type: "SET_COMPLETION_LOADING",
            payload: true,
          });

          const resp = await callCompletionAgent(value);
          const body = await resp.json();

          dispatch({
            type: "SET_COMPLETION_LOADING",
            payload: false,
          });

          dispatch({
            type: "ADD_MESSAGE",
            payload: {
              id: nanoid(),
              content: body.completion,
              role: "ai",
              error: null,
            },
          });
        } catch (error) {
          dispatch({
            type: "SET_COMPLETION_LOADING",
            payload: false,
          });
          dispatch({
            type: "EDIT_MESSAGE",
            payload: {
              id: humanMessageId,
              error: error,
            },
          });
          console.error(error);
        }
      }}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background">
        <textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </form>
  );
}
