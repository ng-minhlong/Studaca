import type { DictationPractice, ShadowingPractice } from "../types";

// ─── Dictation mock ───────────────────────────────────────────────────────────

export const mockDictation: DictationPractice = {
  id_practice: "dictation-001",
  type: "dictation",
  layout: "dictation_layout",
  title: "IELTS Listening Dictation — Part 1",
  description:
    "Listen to each sentence and type exactly what you hear. Spelling and punctuation count.",
  language: "English",
  level: "B2",
  duration_minutes: 20,
  sentences: [
    {
      id: "d-s-01",
      number: 1,
      audio_link: "/audio/dictation-01.mp3",
      transcript: "The conference will be held on the fifteenth of March.",
      hint: "A date is mentioned.",
    },
    {
      id: "d-s-02",
      number: 2,
      audio_link: "/audio/dictation-02.mp3",
      transcript: "Please fill in the registration form before the deadline.",
      hint: "An instruction about a form.",
    },
    {
      id: "d-s-03",
      number: 3,
      audio_link: "/audio/dictation-03.mp3",
      transcript:
        "The maximum number of participants allowed is thirty-five.",
      hint: "A number is mentioned.",
    },
    {
      id: "d-s-04",
      number: 4,
      audio_link: "/audio/dictation-04.mp3",
      transcript:
        "You will need to bring a valid form of identification with you.",
    },
    {
      id: "d-s-05",
      number: 5,
      audio_link: "/audio/dictation-05.mp3",
      transcript:
        "The library opens at nine o'clock and closes at six in the evening.",
      hint: "Opening and closing times.",
    },
    {
      id: "d-s-06",
      number: 6,
      audio_link: "/audio/dictation-06.mp3",
      transcript:
        "Candidates are reminded that electronic devices must be switched off.",
    },
    {
      id: "d-s-07",
      number: 7,
      audio_link: "/audio/dictation-07.mp3",
      transcript: "The total fee for the course is two hundred and fifty dollars.",
      hint: "A monetary amount.",
    },
    {
      id: "d-s-08",
      number: 8,
      audio_link: "/audio/dictation-08.mp3",
      transcript:
        "She asked whether it was possible to reschedule the appointment.",
    },
  ],
};

// ─── Shadowing mock ───────────────────────────────────────────────────────────

export const mockShadowing: ShadowingPractice = {
  id_practice: "shadowing-001",
  type: "shadowing",
  layout: "shadowing_layout",
  title: "Business English Shadowing — Meeting Phrases",
  description:
    "Listen to each segment, then shadow (speak aloud at the same time or immediately after). Focus on rhythm, stress, and intonation.",
  language: "English",
  level: "B2 / C1",
  duration_minutes: 15,
  segments: [
    {
      id: "sh-01",
      number: 1,
      audio_link: "/audio/shadow-01.mp3",
      transcript:
        "I'd like to start by welcoming everyone to today's meeting.",
      translation: "Tôi muốn bắt đầu bằng cách chào mừng tất cả mọi người đến cuộc họp hôm nay.",
      duration_seconds: 4,
    },
    {
      id: "sh-02",
      number: 2,
      audio_link: "/audio/shadow-02.mp3",
      transcript: "Could you elaborate a bit more on that point, please?",
      translation: "Bạn có thể nói thêm về điểm đó không?",
      duration_seconds: 3,
    },
    {
      id: "sh-03",
      number: 3,
      audio_link: "/audio/shadow-03.mp3",
      transcript:
        "Let me just summarise what we've agreed so far before we move on.",
      translation:
        "Hãy để tôi tóm tắt những gì chúng ta đã đồng ý trước khi tiếp tục.",
      duration_seconds: 5,
    },
    {
      id: "sh-04",
      number: 4,
      audio_link: "/audio/shadow-04.mp3",
      transcript:
        "I appreciate your perspective, but I'd like to offer a different view.",
      translation: "Tôi trân trọng quan điểm của bạn, nhưng tôi muốn đưa ra một góc nhìn khác.",
      duration_seconds: 5,
    },
    {
      id: "sh-05",
      number: 5,
      audio_link: "/audio/shadow-05.mp3",
      transcript: "Shall we take a five-minute break before the next agenda item?",
      translation: "Chúng ta có nên nghỉ năm phút trước mục tiếp theo trong chương trình không?",
      duration_seconds: 4,
    },
    {
      id: "sh-06",
      number: 6,
      audio_link: "/audio/shadow-06.mp3",
      transcript:
        "To wrap up, we'll circulate the minutes to everyone by end of day.",
      translation:
        "Để kết thúc, chúng tôi sẽ gửi biên bản cuộc họp cho tất cả mọi người trước cuối ngày.",
      duration_seconds: 5,
    },
  ],
};
