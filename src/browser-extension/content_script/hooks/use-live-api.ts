/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MultimodalLiveAPIClientConnection,
  MultimodalLiveClient,
} from "../lib/multimodal-live-client";
import { LiveConfig } from "../lib/multimodal-live-types";
import { AudioStreamer } from "../lib/audio-streamer";
import { audioContext } from "../lib/utils";
import VolMeterWorket from "../lib/worklets/vol-meter";
import { instructions, getLangLabel } from "../../utils/config";
import * as utils from '../../common/utils'

export type UseLiveAPIResults = {
  client: MultimodalLiveClient;
  setConfig: (config: LiveConfig) => void;
  config?: LiveConfig;
  connected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  volume: number;
};

export function useLiveAPI({
  url,
  apiKey,
}: MultimodalLiveAPIClientConnection): UseLiveAPIResults {
  const client = useMemo(
    () => new MultimodalLiveClient({ url, apiKey }),
    [url, apiKey],
  );
  const audioStreamerRef = useRef<AudioStreamer | null>(null);
  const [sourceLangId, setSourceLangId] = useState('')
  const [targetLangId, setTargetLangId] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [connected, setConnected] = useState(false);
  const [config, setConfig] = useState<LiveConfig>();
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    utils.getSettings().then(settings => {
      setSourceLangId(settings.sourceLangId)
      setTargetLangId(settings.targetLangId)
    })
  }, [])

  useEffect(() => {
    if (sourceLangId && targetLangId) {
      console.log('sourceLangId && targetLangId', sourceLangId, targetLangId)
      setConfig({
        model: "models/gemini-2.0-flash-exp",
        generationConfig: {
          responseModalities: "text",
        },
        systemInstruction: {
          parts: [
            {
              text: instructions({
                sourceLangId,
                targetLangId,
                targetLangLabel: getLangLabel(targetLangId)
              })
            }
          ],
        },
        tools: [
          // there is a free-tier quota for search
          { googleSearch: {} },
          // { functionDeclarations: [declaration] },
        ],
      })
    }
  }, [sourceLangId, targetLangId])

  // register audio for streaming server -> speakers
  useEffect(() => {
    if (!audioStreamerRef.current) {
      audioContext({ id: "audio-out" }).then((audioCtx: AudioContext) => {
        audioStreamerRef.current = new AudioStreamer(audioCtx);
        audioStreamerRef.current
          .addWorklet<any>("vumeter-out", VolMeterWorket, (ev: any) => {
            setVolume(ev.data.volume);
          })
          .then(() => {
            // Successfully added worklet
          });
      });
    }
  }, [audioStreamerRef]);

  useEffect(() => {
    const onClose = () => {
      setConnected(false);
    };

    const stopAudioStreamer = () => audioStreamerRef.current?.stop();

    const onAudio = (data: ArrayBuffer) =>
      audioStreamerRef.current?.addPCM16(new Uint8Array(data));

    client
      .on("close", onClose)
      .on("interrupted", stopAudioStreamer)
      .on("audio", onAudio);

    return () => {
      client
        .off("close", onClose)
        .off("interrupted", stopAudioStreamer)
        .off("audio", onAudio);
    };
  }, [client]);

  const connect = useCallback(async () => {
    console.log(config);
    if (!config) {
      throw new Error("config has not been set");
    }
    client.disconnect();
    setIsConnecting(true)
    await client.connect(config);
    setConnected(true);
  }, [client, setConnected, config]);

  const disconnect = useCallback(async () => {
    client.disconnect();
    setConnected(false);
  }, [setConnected, client]);

  useEffect(() => {
    setIsConnecting(false)
  }, [connected])

  return {
    client,
    config,
    setConfig,
    connected,
    connect,
    isConnecting,
    disconnect,
    volume,
  };
}
