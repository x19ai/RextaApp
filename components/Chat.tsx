"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { ComponentRef, useRef } from "react";

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);

  // optional: use configId from environment variable
  const configId = process.env['NEXT_PUBLIC_HUME_CONFIG_ID'];
  
  return (
    <div className="relative flex flex-col h-[calc(100vh-6rem)] max-h-[800px] min-h-[500px] w-full">
      <VoiceProvider
        auth={{ type: "accessToken", value: accessToken }}
        configId={configId}
        onMessage={() => {
          if (timeout.current) {
            window.clearTimeout(timeout.current);
          }
        }}
      >
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative">
            <Messages ref={ref} />
          </div>
          <Controls />
          <StartCall />
        </div>
      </VoiceProvider>
    </div>
  );
}