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

import { useMemo } from "react";
import { Client as Styletron } from 'styletron-engine-atomic'
import { createUseStyles } from 'react-jss'
import { IThemedStyleProps } from '../../common/types'
import { useTheme } from '../../utils/hooks/useTheme'
import { useLoggerStore } from "../lib/store-logger";
import { isClientContentMessage, isServerContentMessage, StreamingLog } from "../lib/multimodal-live-types";

const useStyles = createUseStyles({
  'subtitleSection': (props: IThemedStyleProps) => ({
    cursor: 'move',
    color: '#fff',
    textAlign: 'center',
    paddingTop: '6px',
    paddingBottom: '6px',
    fontSize: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    minHeight: '50px',
    borderRadius: 'inherit',
  })
})

export type SubtitleSectionProps = {
  engine: Styletron
};

function SubtitleSection({
}: SubtitleSectionProps) {
  const { theme, themeType } = useTheme()
  const styles = useStyles({ theme, themeType })
  const { logs } = useLoggerStore();

  const filteredLogs = useMemo(() => {
    return logs.filter((log: StreamingLog) =>
      isClientContentMessage(log.message) || isServerContentMessage(log.message))
  }, [logs])

  const translationData = useMemo<any>(() => {
    if (filteredLogs?.length) {
      let data = null
      filteredLogs.forEach(log => {
        // @ts-ignore
        if (Array.isArray(log?.message?.serverContent?.modelTurn?.parts)) {
          // @ts-ignore
          log.message.serverContent.modelTurn.parts.forEach((part: any) => {
            if (part.text) {
              // @ts-ignore
              const text = part.text.replaceAll('```json', '')
              .replaceAll('```', '')
              // replace all newlines with spaces
              .replaceAll('\n', ' ');

              try {
                data = JSON.parse(text);
              } catch(e) {
                // console.log('e', e)
              }
            }
          })
        }
      })
      return data
    }
  }, [filteredLogs])

  return (
    <section className={styles.subtitleSection} data-tauri-drag-region >
      <div>{translationData?.source}</div>
      <div>{translationData?.dest}</div>
    </section>
  );
}

export default SubtitleSection;
