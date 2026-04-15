# Glowlyze

화장품 성분표를 촬영하면 AI가 성분을 분석하고, 피부 타입별 적합성을 알려주는 React Native 앱입니다.

<p align="center">
  <img src="./simulator.gif" width="300" alt="Glowlyze 데모" />
</p>

## Features

- **성분 분석** — 화장품 성분표 사진을 찍으면 Gemini AI가 전체 성분을 추출하고 주의 성분을 알려줍니다.
- **피부 타입별 적합성** — 건성 / 지성 / 복합성 / 민감성 피부에 대한 적합 여부를 한눈에 확인할 수 있습니다.
- **피부 프로필 설정** — 내 피부 타입을 저장하면 분석 결과를 맞춤형으로 제공합니다.
- **분석 히스토리** — 이전에 분석한 제품 내역을 저장하고 다시 확인할 수 있습니다.

## Tech Stack

- [Expo](https://expo.dev) (React Native)
- [Expo Router](https://expo.github.io/router) — 파일 기반 라우팅
- [Google Gemini API](https://ai.google.dev) (`gemini-2.5-flash-lite`) — 이미지 기반 성분 분석
- AsyncStorage — 히스토리 및 프로필 로컬 저장

## Getting Started

### 1. 패키지 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 Gemini API 키를 입력합니다.

```
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

### 3. 앱 실행

```bash
npx expo start
```

iOS 시뮬레이터, Android 에뮬레이터, 또는 Expo Go 앱으로 실행할 수 있습니다.
