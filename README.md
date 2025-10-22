# MODN AI - 상품 상세페이지 생성 프로젝트

Next.js 15 + React 19 기반의 AI 기반 상품 상세페이지 자동 생성 프로젝트입니다.

## 주요 기능

🎤 **음성 입력 기능**

- 웹 브라우저에서 마이크를 통한 실시간 음성 녹음
- Whisper API를 활용한 음성-텍스트 변환
- 재사용 가능한 컴포넌트 구조

📸 **이미지 업로드 기능**

- 다중 이미지 업로드 지원
- 카테고리별 이미지 관리 (상품 상세, 생산 현장, 판매자, 사용 사진)
- 서버를 통한 안전한 업로드

## 시작하기

### 1. 환경 변수 설정

`.env.local` 파일을 생성하고 백엔드 URL을 설정하세요:

```env
DURUMO_BACKEND_BASE=https://your-actual-backend-url.com
```

> **참고**: API Route에서만 사용하는 환경변수이므로 `NEXT_PUBLIC_` 접두사가 필요 없습니다.

### 2. 패키지 설치

```bash
pnpm install
```

### 3. 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 프로젝트 구조

```
src/
├── app/
│   ├── api/
│   │   └── whisper/
│   │       └── route.ts          # Whisper API 프록시
│   ├── voice-input/
│   │   └── page.tsx              # 음성 입력 데모 페이지
│   ├── layout.tsx
│   └── page.tsx                  # 홈 페이지
├── components/
│   └── VoiceInputButton.tsx      # 재사용 가능한 음성 입력 버튼
├── hooks/
│   └── useVoiceRecording.ts      # 음성 녹음 커스텀 hook
└── utils/
    ├── whisperApi.ts             # Whisper API 유틸리티
    └── cn.ts                     # 클래스명 결합 유틸리티
```

## 사용 방법

### VoiceInputButton 컴포넌트 사용

어디서든 음성 입력 버튼을 추가할 수 있습니다:

```tsx
import { VoiceInputButton } from "@/components/VoiceInputButton";
import { useState } from "react";

function MyComponent() {
  const [text, setText] = useState("");

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <VoiceInputButton
        onTranscriptionComplete={(newText) => setText(text + newText)}
        onError={(error) => alert(error)}
        size="md"
      />
    </div>
  );
}
```

### useVoiceRecording Hook 사용

더 세밀한 제어가 필요한 경우 커스텀 hook을 직접 사용할 수 있습니다:

```tsx
import { useVoiceRecording } from "@/hooks/useVoiceRecording";

function CustomComponent() {
  const { isRecording, isLoading, toggleRecording } = useVoiceRecording({
    onTranscriptionComplete: (text) => console.log("변환된 텍스트:", text),
    onError: (error) => console.error("오류:", error),
  });

  return (
    <button onClick={toggleRecording}>
      {isRecording ? "녹음 중지" : "녹음 시작"}
    </button>
  );
}
```

## 기술 스택

- **프레임워크**: Next.js 15 (App Router)
- **UI 라이브러리**: React 19
- **스타일링**: TailwindCSS 4
- **타입스크립트**: TypeScript 5
- **패키지 매니저**: pnpm

## API 엔드포인트

### POST /api/whisper

오디오 파일을 받아 텍스트로 변환합니다.

**Request:**

- Content-Type: `multipart/form-data`
- Body: `audioData` (audio file)

**Response:**

```json
{
  "result": "변환된 텍스트"
}
```

## 브라우저 호환성

- Chrome/Edge 60+
- Firefox 55+
- Safari 11+

**참고**: 음성 녹음 기능은 HTTPS 또는 localhost에서만 작동합니다.

## 라이선스

MIT
