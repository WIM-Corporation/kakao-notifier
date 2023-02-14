# Publisher

- controller X
- domain X
- bullmq 의존성 필요
- consumer 는 별도의 프로세스(서버)로 처리

## Publish List

```

POST

- 실시간화상풀이
  - 메시지
    - 튜터 발행(학생 수신)
      - [ ] 튜터 입장
      - [ ] 튜터의 답변하기 시작
      - [ ] 풀이영상 답변 틍록
    - 학생 발행(튜터 수신)
      - [ ] 학생 입장
    - 시스템 발행
      - [ ] 자동종료 5분 전(답변 시작 15분 후) // 종료알람은 보내지 않음(fcm 지연 가능성 있음)
      - [ ] 자동종료
      - [ ] 상대방 비정상 종료 시
      - [ ] 비정상 종료로 부터 3분간 미접속 시
      - [ ] 튜터의 답변하기 취소 시
  - 시스템 이벤트
    - [ ] 화상풀이 시작 후 3분간 학생이 입장하지 않으면 자동종료 -> 문제가 다시 검색가능 상태로 게시됨
    - [ ] 상대방 비정상 종료 시 3분 카운터 발행 -> 3분 초과 시 자동종료 이벤트 발행 -> 문제는 사라짐
    - [ ] 자동종료 처리

- 풀이영상
  - 메시지
    - [ ] 자동종료 5분 전(답변 시작 15분 후)
    - [ ] 자동종료
    - [ ] 튜터의 답변하기 취소 시
    
```

```

LIVE

- 라이브
  - 메시지
    - [ ] 라이브 시작 10분 전(초대받은 사람)
    - [ ] 라이브 시작 및 종료(개설자를 구독한 사람, 초대받은사람)
  - 시스템 이벤트
    - [ ] 자동종료 처리

```

```

NOTIFICATION

- 알림
  - 메시지
    - [ ] 라이브 초대
    - [ ] 라이브 시작 및 종료(개설자를 구독한 사람, 초대받은사람)
    - [ ] 고객센트 1:1 문의 답변 달릴 시
    - [ ] 프리미엄 회원 종료 1일 전
    - [ ] 본사가 플랫폼 fc 가입 승인 시(가입신청한 사람이 받음)
  - 이벤트
    - [ ] 멤버 해제 시(해제 당한 사람이 받음)
    - [ ] 멤버 신청 시(튜터가 받음)
    - [ ] 멤버 신청 거절 시(신청자가 받음)
    - [ ] 튜터가 신규멤버를 그룹에 배정 시(배정받은 학생들이 받음)
    - [ ] 멤버 탈퇴 시(상대방이 받음)
```