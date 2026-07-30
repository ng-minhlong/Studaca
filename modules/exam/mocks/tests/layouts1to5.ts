import type {
  Layout1Test,
  Layout2Test,
  Layout3Test,
  Layout4Test,
  Layout5Test,
} from "../../types";

// ─── IELTS Reading ────────────────────────────────────────────────────────────

export const mockIeltsReading: Layout1Test = {
  id_test: "ielts-reading-001",
  type: "ielts-reading",
  layout: "layout_1",
  title: "IELTS Academic Reading Practice",
  duration_minutes: 60,
  parts: [
    {
      id: "rp1",
      title: "Passage 1 – The Urban Heat Island Effect",
      paragraph: `Urban areas experience significantly higher temperatures than surrounding rural regions, a phenomenon known as the Urban Heat Island (UHI) effect. This occurs primarily because buildings, roads, and other infrastructure absorb and re-emit the sun's heat more than natural landscapes. Dark surfaces such as asphalt and rooftops absorb solar radiation during the day and release it slowly at night, keeping cities warmer around the clock.

Vegetation plays a crucial counterbalancing role. Trees and plants release moisture through transpiration, cooling the air around them. Cities with ample green spaces such as parks, street trees, and green roofs consistently show lower peak temperatures. Studies in Singapore and Melbourne have demonstrated that increasing urban tree canopy by as little as 10% can reduce daytime temperatures by up to 2°C.

Human activities also contribute substantially. Industrial operations, vehicle exhaust, and even home air conditioning units release heat into the atmosphere. The energy demands of dense populations create a self-reinforcing cycle: as temperatures rise, people use more air conditioning, which in turn releases more heat outdoors.

Urban planners now advocate for several mitigation strategies. These include mandating reflective or "cool" roofing materials, expanding public parks, creating urban forests, and designing wind corridors that allow fresh air to circulate through city centres. Some cities have also introduced permeable paving to allow rainwater to permeate the ground, reducing surface runoff and enabling cooling through evaporation.`,
      questionRanges: [
        {
          label: "Questions 1–3: Complete the sentences. Use NO MORE THAN TWO WORDS.",
          type_question: "completion",
          questions: [
            {
              id: "rq1",
              number: 1,
              type_question: "completion",
              question:
                "Dark surfaces such as asphalt absorb solar radiation and release it slowly, keeping cities ___ day and night.",
              correct_answer: "warmer",
            },
            {
              id: "rq2",
              number: 2,
              type_question: "completion",
              question:
                "Plants cool the air through a process called ___.",
              correct_answer: "transpiration",
            },
            {
              id: "rq3",
              number: 3,
              type_question: "completion",
              question:
                "Permeable paving reduces surface runoff and enables cooling through ___.",
              correct_answer: "evaporation",
            },
          ],
        },
        {
          label: "Questions 4–6: Multiple Choice",
          type_question: "multiple-choice",
          questions: [
            {
              id: "rq4",
              number: 4,
              type_question: "multiple-choice",
              question:
                "According to the passage, what percentage increase in tree canopy can reduce daytime temperatures by 2°C?",
              answers_option: [
                { key: "A", label: "5%" },
                { key: "B", label: "10%" },
                { key: "C", label: "15%" },
                { key: "D", label: "20%" },
              ],
              correct_answer: "B",
            },
            {
              id: "rq5",
              number: 5,
              type_question: "multiple-choice",
              question: "Why does air conditioning worsen the UHI effect?",
              answers_option: [
                { key: "A", label: "It consumes too much electricity." },
                { key: "B", label: "It releases heat outdoors." },
                { key: "C", label: "It damages vegetation." },
                { key: "D", label: "It increases rainfall." },
              ],
              correct_answer: "B",
            },
            {
              id: "rq6",
              number: 6,
              type_question: "multiple-choice",
              question:
                "What is the primary purpose of wind corridors in urban planning?",
              answers_option: [
                { key: "A", label: "To generate renewable energy" },
                { key: "B", label: "To allow fresh air to circulate" },
                { key: "C", label: "To reduce noise pollution" },
                { key: "D", label: "To channel rainfall" },
              ],
              correct_answer: "B",
            },
          ],
        },
        {
          label: "Questions 7–9: Multi-Select – Which THREE strategies are mentioned?",
          type_question: "multi-select",
          questions: [
            {
              id: "rq7",
              number: 7,
              type_question: "multi-select",
              question:
                "Which THREE mitigation strategies are mentioned in the passage?",
              answers_option: [
                { key: "A", label: "Cool roofing materials" },
                { key: "B", label: "Underground cooling systems" },
                { key: "C", label: "Expanding public parks" },
                { key: "D", label: "Permeable paving" },
                { key: "E", label: "Solar panel rooftops" },
              ],
              correct_answer: ["A", "C", "D"],
            },
          ],
        },
      ],
    },
    {
      id: "rp2",
      title: "Passage 2 – Deep Sea Exploration",
      paragraph: `The deep ocean — defined as waters below 200 metres — represents the largest living space on Earth, yet less than 20% of it has been mapped with high resolution. Advances in remotely operated vehicles (ROVs) and autonomous underwater vehicles (AUVs) have opened new frontiers for scientists. These machines can withstand crushing pressures exceeding 600 times that at sea level and operate at temperatures near freezing.

Organisms inhabiting these zones have evolved extraordinary adaptations. Bioluminescence — the production of light by living organisms — is common among deep-sea creatures. Animals like the anglerfish use dangling light-producing lures to attract prey in the total darkness. Others, such as the barreleye fish, have upward-pointing tubular eyes to detect faint silhouettes of prey above them.

Hydrothermal vents, discovered in 1977 near the Galapagos Islands, host ecosystems that operate entirely without sunlight. Chemosynthetic bacteria form the base of these food chains by converting hydrogen sulphide from the vents into energy — a process mirroring photosynthesis but driven by chemical reactions. Giant tube worms, yeti crabs, and eyeless shrimp thrive in these environments.

The commercial interest in deep-sea resources has raised conservation concerns. Polymetallic nodules on the ocean floor — rich in cobalt, nickel, and manganese — are coveted by mining companies. Critics argue that mining these habitats could permanently destroy ecosystems about which we still know very little.`,
      questionRanges: [
        {
          label: "Questions 10–12: Completion",
          type_question: "completion",
          questions: [
            {
              id: "rq10",
              number: 10,
              type_question: "completion",
              question:
                "The deep ocean is defined as waters below ___ metres.",
              correct_answer: "200",
            },
            {
              id: "rq11",
              number: 11,
              type_question: "completion",
              question:
                "Hydrothermal vents were first discovered near the ___ Islands.",
              correct_answer: "Galapagos",
            },
            {
              id: "rq12",
              number: 12,
              type_question: "completion",
              question:
                "Chemosynthetic bacteria convert hydrogen sulphide into ___ .",
              correct_answer: "energy",
            },
          ],
        },
        {
          label: "Questions 13–15: Multiple Choice",
          type_question: "multiple-choice",
          questions: [
            {
              id: "rq13",
              number: 13,
              type_question: "multiple-choice",
              question:
                "What percentage of the deep ocean has been mapped at high resolution?",
              answers_option: [
                { key: "A", label: "Less than 20%" },
                { key: "B", label: "About 40%" },
                { key: "C", label: "More than 50%" },
                { key: "D", label: "Exactly 30%" },
              ],
              correct_answer: "A",
            },
            {
              id: "rq14",
              number: 14,
              type_question: "multiple-choice",
              question: "How does the anglerfish attract prey?",
              answers_option: [
                { key: "A", label: "Using its large eyes" },
                { key: "B", label: "By producing sound" },
                { key: "C", label: "Using a bioluminescent lure" },
                { key: "D", label: "By releasing chemicals" },
              ],
              correct_answer: "C",
            },
            {
              id: "rq15",
              number: 15,
              type_question: "multiple-choice",
              question: "What concern do critics raise about deep-sea mining?",
              answers_option: [
                { key: "A", label: "It is too expensive." },
                { key: "B", label: "It could destroy poorly understood ecosystems." },
                { key: "C", label: "It will increase ocean temperatures." },
                { key: "D", label: "It requires dangerous materials." },
              ],
              correct_answer: "B",
            },
          ],
        },
      ],
    },
    {
      id: "rp3",
      title: "Passage 3 – The Psychology of Decision Making",
      paragraph: `Humans like to think of themselves as rational actors — carefully weighing costs and benefits before making decisions. However, decades of research in behavioural economics and cognitive psychology have shown that human decision-making is riddled with systematic biases and heuristics that often lead us astray.

Daniel Kahneman's landmark work distinguishes between two cognitive systems. System 1 operates automatically, quickly, and emotionally; System 2 is deliberate, slow, and analytical. Most everyday decisions are handled by System 1, which is prone to errors but conserves mental energy. The availability heuristic, for instance, causes people to overestimate the likelihood of dramatic events — such as plane crashes — because vivid examples are easier to recall.

Anchoring is another powerful bias. When people are exposed to an initial number — even an arbitrary one — it disproportionately influences their subsequent estimates. In one study, participants who spun a wheel landing on 65 later guessed that the percentage of African nations in the United Nations was about 45%, while those who landed on 10 guessed around 25%.

Loss aversion, identified by Kahneman and Tversky, describes the tendency to feel losses more acutely than equivalent gains. The pain of losing £50 is psychologically greater than the pleasure of winning £50. This asymmetry explains a wide range of behaviours from stock market hesitancy to reluctance to switch service providers.`,
      questionRanges: [
        {
          label: "Questions 16–18: Multiple Choice",
          type_question: "multiple-choice",
          questions: [
            {
              id: "rq16",
              number: 16,
              type_question: "multiple-choice",
              question: "According to the passage, System 1 thinking is characterized by:",
              answers_option: [
                { key: "A", label: "being slow and deliberate" },
                { key: "B", label: "being fast and emotional" },
                { key: "C", label: "always leading to correct decisions" },
                { key: "D", label: "using complex calculations" },
              ],
              correct_answer: "B",
            },
            {
              id: "rq17",
              number: 17,
              type_question: "multiple-choice",
              question:
                "The availability heuristic causes people to overestimate the likelihood of events that are:",
              answers_option: [
                { key: "A", label: "statistically probable" },
                { key: "B", label: "easy to recall due to vividness" },
                { key: "C", label: "related to financial losses" },
                { key: "D", label: "mentioned in newspapers" },
              ],
              correct_answer: "B",
            },
            {
              id: "rq18",
              number: 18,
              type_question: "multiple-choice",
              question: "Loss aversion suggests that losing £50 is psychologically:",
              answers_option: [
                { key: "A", label: "equal to gaining £50" },
                { key: "B", label: "less painful than gaining £50 is pleasurable" },
                { key: "C", label: "more painful than gaining £50 is pleasurable" },
                { key: "D", label: "unrelated to decision making" },
              ],
              correct_answer: "C",
            },
          ],
        },
      ],
    },
  ],
};

// ─── IELTS Listening ──────────────────────────────────────────────────────────

export const mockIeltsListening: Layout2Test = {
  id_test: "ielts-listening-001",
  type: "ielts-listening",
  layout: "layout_2",
  title: "IELTS Listening Practice Test",
  duration_minutes: 30,
  parts: [
    {
      id: "lp1",
      title: "Part 1 – Conversation at a Sports Centre",
      audio_link: "/audio/ielts-listening-part1.mp3",
      questionRanges: [
        {
          label: "Questions 1–4: Complete the form. Use NO MORE THAN TWO WORDS AND/OR A NUMBER.",
          type_question: "completion",
          questions: [
            {
              id: "lq1",
              number: 1,
              type_question: "completion",
              question: "Membership type chosen: ___ membership",
              correct_answer: "monthly",
            },
            {
              id: "lq2",
              number: 2,
              type_question: "completion",
              question: "Start date: ___",
              correct_answer: "15 March",
            },
            {
              id: "lq3",
              number: 3,
              type_question: "completion",
              question: "Preferred class: ___",
              correct_answer: "yoga",
            },
            {
              id: "lq4",
              number: 4,
              type_question: "completion",
              question: "Discount code: ___",
              correct_answer: "FIT20",
            },
          ],
        },
      ],
    },
    {
      id: "lp2",
      title: "Part 2 – Talk About Local Heritage Walk",
      audio_link: "/audio/ielts-listening-part2.mp3",
      questionRanges: [
        {
          label: "Questions 5–7: Multiple Choice",
          type_question: "multiple-choice",
          questions: [
            {
              id: "lq5",
              number: 5,
              type_question: "multiple-choice",
              question: "Where does the heritage walk begin?",
              answers_option: [
                { key: "A", label: "the town hall" },
                { key: "B", label: "the market square" },
                { key: "C", label: "the railway station" },
                { key: "D", label: "the museum" },
              ],
              correct_answer: "B",
            },
            {
              id: "lq6",
              number: 6,
              type_question: "multiple-choice",
              question: "How long does the full walk take?",
              answers_option: [
                { key: "A", label: "one hour" },
                { key: "B", label: "ninety minutes" },
                { key: "C", label: "two hours" },
                { key: "D", label: "three hours" },
              ],
              correct_answer: "C",
            },
            {
              id: "lq7",
              number: 7,
              type_question: "multiple-choice",
              question: "What should participants bring?",
              answers_option: [
                { key: "A", label: "a torch" },
                { key: "B", label: "comfortable shoes" },
                { key: "C", label: "a map" },
                { key: "D", label: "a printed guide" },
              ],
              correct_answer: "B",
            },
          ],
        },
      ],
    },
    {
      id: "lp3",
      title: "Part 3 – Discussion About Research Project",
      audio_link: "/audio/ielts-listening-part3.mp3",
      questionRanges: [
        {
          label: "Questions 8–10: Multi-Select",
          type_question: "multi-select",
          questions: [
            {
              id: "lq8",
              number: 8,
              type_question: "multi-select",
              question:
                "Which THREE aspects of the research did the students find most challenging?",
              answers_option: [
                { key: "A", label: "finding primary sources" },
                { key: "B", label: "time management" },
                { key: "C", label: "writing the bibliography" },
                { key: "D", label: "conducting interviews" },
                { key: "E", label: "structuring the argument" },
              ],
              correct_answer: ["A", "B", "E"],
            },
          ],
        },
      ],
    },
    {
      id: "lp4",
      title: "Part 4 – Lecture on Soil Erosion",
      audio_link: "/audio/ielts-listening-part4.mp3",
      questionRanges: [
        {
          label: "Questions 11–13: Complete the notes. Use ONE WORD ONLY.",
          type_question: "completion",
          questions: [
            {
              id: "lq11",
              number: 11,
              type_question: "completion",
              question:
                "The topsoil layer is critical for plant ___ and agricultural productivity.",
              correct_answer: "growth",
            },
            {
              id: "lq12",
              number: 12,
              type_question: "completion",
              question:
                "Overgrazing leads to soil ___ through compaction and removal of ground cover.",
              correct_answer: "degradation",
            },
            {
              id: "lq13",
              number: 13,
              type_question: "completion",
              question:
                "Contour ___ is one effective technique used to slow water runoff on slopes.",
              correct_answer: "ploughing",
            },
          ],
        },
      ],
    },
  ],
};

// ─── IELTS Speaking ───────────────────────────────────────────────────────────

export const mockIeltsSpeaking: Layout3Test = {
  id_test: "ielts-speaking-001",
  type: "ielts-speaking",
  layout: "layout_3",
  title: "IELTS Speaking Practice Test",
  duration_minutes: 15,
  parts: [
    {
      id: "sp1",
      title: "Part 1 – Introduction & Interview",
      description: "The examiner will ask you general questions about yourself and familiar topics.",
      questions: [
        {
          id: "sq1",
          number: 1,
          prompt: "Can you tell me your full name?",
          prep_time: 0,
          speak_time: 30,
        },
        {
          id: "sq2",
          number: 2,
          prompt: "What do you do — are you a student or do you work?",
          prep_time: 0,
          speak_time: 45,
        },
        {
          id: "sq3",
          number: 3,
          prompt: "What kind of music do you enjoy listening to, and why?",
          prep_time: 0,
          speak_time: 60,
        },
      ],
    },
    {
      id: "sp2",
      title: "Part 2 – Individual Long Turn",
      description: "You will be given a task card. You have 1 minute to prepare and then speak for 1–2 minutes.",
      questions: [
        {
          id: "sq4",
          number: 4,
          prompt: `Describe a memorable trip you have taken. You should say:
• where you went
• who you went with
• what you did there
and explain why this trip was memorable to you.`,
          prep_time: 60,
          speak_time: 120,
        },
      ],
    },
    {
      id: "sp3",
      title: "Part 3 – Two-Way Discussion",
      description: "The examiner will discuss more abstract topics related to the Part 2 theme.",
      questions: [
        {
          id: "sq5",
          number: 5,
          prompt: "In what ways do you think travel has changed in the last 20 years?",
          prep_time: 0,
          speak_time: 90,
        },
        {
          id: "sq6",
          number: 6,
          prompt: "Do you think tourism has more positive or negative effects on local communities? Why?",
          prep_time: 0,
          speak_time: 90,
        },
      ],
    },
  ],
};

// ─── IELTS Writing ────────────────────────────────────────────────────────────

export const mockIeltsWriting: Layout4Test = {
  id_test: "ielts-writing-001",
  type: "ielts-writing",
  layout: "layout_4",
  title: "IELTS Academic Writing Practice",
  duration_minutes: 60,
  parts: [
    {
      id: "wp1",
      title: "Task 1",
      task_label: "Task 1",
      question:
        "The graph below shows the proportion of four different materials that were recycled in a particular country between 2006 and 2016. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      instructions: "Write at least 150 words. You should spend about 20 minutes on this task.",
      image_url: "/images/ielts-writing-task1-chart.png",
      min_words: 150,
    },
    {
      id: "wp2",
      title: "Task 2",
      task_label: "Task 2",
      question:
        "Some people believe that university education should be free for all students, while others think students should pay tuition fees themselves. Discuss both views and give your own opinion.",
      instructions: "Write at least 250 words. You should spend about 40 minutes on this task.",
      min_words: 250,
    },
  ],
};

// ─── Digital SAT ──────────────────────────────────────────────────────────────

export const mockDigitalSat: Layout5Test = {
  id_test: "digital-sat-001",
  type: "digital-sat",
  layout: "layout_5",
  title: "Digital SAT Practice Test",
  duration_minutes: 64,
  questions: [
    {
      id: "sq1",
      number: 1,
      type_question: "multiple-choice",
      domain: "Reading & Writing",
      module: "Module 1",
      passage:
        "The Silk Road was not a single road but rather a vast network of trade routes connecting China to the Mediterranean world. Merchants rarely traversed the entire route; instead, goods passed from trader to trader across multiple legs of the journey. Silk, spices, and precious stones flowed westward, while gold, glass, and new religions moved eastward.",
      question:
        "Which choice best states the main idea of the passage?",
      answers: {
        answer_1: "The Silk Road was used mainly to trade silk and spices.",
        answer_2: "The Silk Road was a complex network where goods changed hands multiple times.",
        answer_3: "Merchants who used the Silk Road became extremely wealthy.",
        answer_4: "The Silk Road connected China directly to the Mediterranean.",
      },
      correct_answer: "answer_2",
    },
    {
      id: "sq2",
      number: 2,
      type_question: "multiple-choice",
      domain: "Reading & Writing",
      module: "Module 1",
      passage:
        'Maya Angelou\'s memoir I Know Why the Caged Bird Sings is notable for its unflinching portrayal of racism, trauma, and resilience. Critics have praised Angelou\'s lyrical prose and her ability to transform deeply personal experiences into universal human truths. The memoir has been widely taught in schools and is considered a landmark of American literature.',
      question:
        "As used in the passage, the word 'unflinching' most nearly means:",
      answers: {
        answer_1: "exaggerated",
        answer_2: "uncompromising and direct",
        answer_3: "difficult to understand",
        answer_4: "overly optimistic",
      },
      correct_answer: "answer_2",
    },
    {
      id: "sq3",
      number: 3,
      type_question: "completion",
      domain: "Reading & Writing",
      module: "Module 1",
      passage:
        "The scientist noted that the results were ___ with existing theories, meaning no revision was necessary.",
      question:
        "Write the word that correctly completes the sentence above (consistent / inconsistent):",
      answers: "",
      correct_answer: "consistent",
    },
    {
      id: "sq4",
      number: 4,
      type_question: "multiple-choice",
      domain: "Math",
      module: "Module 1",
      question: "If 3x + 7 = 22, what is the value of x?",
      answers: {
        answer_1: "3",
        answer_2: "5",
        answer_3: "7",
        answer_4: "9",
      },
      correct_answer: "answer_2",
    },
    {
      id: "sq5",
      number: 5,
      type_question: "completion",
      domain: "Math",
      module: "Module 1",
      question:
        "A rectangle has a length of 12 cm and a width of 5 cm. What is its area in cm²?",
      answers: "",
      correct_answer: "60",
    },
    {
      id: "sq6",
      number: 6,
      type_question: "multiple-choice",
      domain: "Math",
      module: "Module 1",
      question:
        "Which of the following is equivalent to (x + 3)(x − 3)?",
      answers: {
        answer_1: "x² − 6",
        answer_2: "x² − 9",
        answer_3: "x² + 9",
        answer_4: "x² − 6x − 9",
      },
      correct_answer: "answer_2",
    },
  ],
};
