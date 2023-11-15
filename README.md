# 정산하자

모임에서 발생한 지출을 손쉽게 정리하고, 모임 내부에서 정산 과정을 간편화하기 위한 애플리케이션

## 개발 계기

1. 불편한 정산 프로세스: 기존에는 모임에서 발생한 지출을 정산할 때 다수의 계산이 필요했으며, 이를 효율적으로 수행하기 어려웠다. 특히, 테이블 별 비용, 차수별 참가 인원, 음주 여부 등 다양한 요인을 고려해야 하는 경우 더욱 복잡했다.
2. 기존 애플리케이션의 한계: 일부 기존 서비스는 차수별 참가 인원과 같은 추가 정보를 포함한 간단한 정산을 제공하지만, 각 테이블이나 개인의 음주 여부에 따른 상세한 정산을 지원하지 않는 아쉬움이 있다.

## 개발 목적

1. 간편한 정산: '정산하자' 애플리케이션을 사용하면 액셀 사용이나 다수의 계산 과정 없이 참가자, 테이블, 차수 등과 관련된 상세 정보를 입력하고, 각 지출 항목에 대한 비용을 기록할 수 있습니다.
2. 자동 계산: 애플리케이션은 입력된 정보를 기반으로 자동으로 정산을 수행하며, 어떤 참가자가 얼마를 지불해야 하는지 계산해 줍니다.
3. 이력 추적: 각 모임의 정산 이력을 추적하고, 과거 모임의 정산 결과를 다시 확인할 수 있습니다.
4. 사용자 친화성: 사용자 인터페이스는 직관적이며, 사용자가 지출과 관련된 정보를 효과적으로 입력하고 확인할 수 있도록 설계되었습니다.

## 기술

- [x] React: 상태와 view의 관계를 선언적으로 작성할 수 있다.
- [x] Emotion: atomic design pattern 적용 -> 컴포넌트 단위의 UI를 구현하는 데 효율적이다.
- [x] TypeScript: JavaScript의 자율성을 제한하여 런타임 에러를 방지하고, 유지보수 및 가독성을 향상시킬 수 있다.
- [x] react-router-dom: SPA에서의 라우팅을 구현하기 위해 사용.
- Jotai vs Zustand 고민중...
  - Jotai는 atom을 이용한 Bottom-up 방식으로, 작은 상태들을 대량으로 읽거나 쓰는 작업에 용이하다고 함
  - Zustand는 store를 이용한 Top-down 방식으로, 여러개의 스토어를 도메인 단위로 쪼개서 쉽게 관리할 수 있다고 함
- Tanstack Query: 데이터 패칭과 캐싱 구현 및 에러처리를 보다 쉽고 빠르게 하기 위해 사용.
- MSW: 클라이언트의 api 요청을 백엔드 구현 없이 실제 api 요청 프로세스와 유사하게 동작하도록 구현할 수 있다.
- [x] Vite: SPA 빌드
- Vercel: 배포 자동화 툴로 인터페이스가 매우 간단하고 github과 연동이 가능하여 손쉽게 배포할 수 있다.
- [x] ESLint: 일관성 있는 코드 작성을 위해 사용
- [x] Prettier: 일관성 있는 코드 작성을 위해 사용

## 디자인

<img width="872" alt="스크린샷 2023-11-15 오후 7 47 03" src="https://github.com/parkseonup/invoice/assets/76897813/d11cc292-e5c4-4321-9b5e-0572b690b440">

## 참고 문서

- Atomic design pattern
  - [카카오엔터 - 아토믹 디자인을 활용한 디자인 시스템 도입기](https://fe-developers.kakaoent.com/2022/220505-how-page-part-use-atomic-design-system/)
  - [요즘IT - Atomic Design Pattern의 Best Practice 여정기](https://yozm.wishket.com/magazine/detail/1531/)
  - [truelog - 매번 찾아오는 컴포넌트에 대한 고민](https://leetrue-log.vercel.app/react-component-gomin)
- 합성 컴포넌트
  - [카카오엔터 - 합성 컴포넌트로 재사용성 극대화하기](https://fe-developers.kakaoent.com/2022/220731-composition-component/)
  - [공책프로젝트 - 합성 컴포넌트로 재사용성 높이기](https://gong-check.github.io/dev-blog/FE/%EC%BD%94%EC%B9%B4%EC%BD%9C%EB%9D%BC/composition-component/composition-component/)
- 상태관리
  - [우아한형제들 - Store에서 비동기 통신 분리하기 (feat. React Query) - 부제: 우리는 스토어를 스토어답게 쓰고 있나요?](https://techblog.woowahan.com/6339/)
- Jotai
  - [kakao style - 프론트엔드 상태 관리에 대한 여정](https://devblog.kakaostyle.com/ko/2022-01-13-1-frontend-state-management/)
  - [화해 - Atomic state management - Jotai](https://blog.hwahae.co.kr/all/tech/6099)
- Zustand
  - [Toast UI - React 상태 관리 라이브러리 Zustand의 코드를 파헤쳐보자](https://ui.toast.com/posts/ko_20210812)
- 개발기
  - [우아한형제들 - 병아리 개발자의 첫 웹뷰 개발기: 파일럿 프로젝트](https://techblog.woowahan.com/10774/)
- ESLint
  - [Raddit - Do you use Eslint-config-Airbnb? If so, why? If not, why?](https://www.reddit.com/r/node/comments/14jh6hz/do_you_use_eslintconfigairbnb_if_so_why_if_not_why/?rdt=51921)
  - [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#airbnb-javascript-style-guide-)
