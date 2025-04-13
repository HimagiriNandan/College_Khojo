const faqs = [
  {
    question: "What is the purpose of this website?",
    answer: "We help 12th class students prepare for jee, offer mock tests, percentile calculations, college recommendations and career paths."
  },
  {
    question: "How can I start?",
    answer: "Sign up, take mock tests, track scores, and get college recommendations based on your performance."
  },
  {
    question: "How is my percentile calculated?",
    answer: "Your percentile compares your score to other students who took the same test."
  },
  {
    question: "Can I see recommended colleges?",
    answer: "Yes, based on your mock test scores, we suggest colleges that suits your profile."
  },
  {
    question: "How often are the mock tests updated?",
    answer: "We update tests regularly to match current exam patterns and syllabus."
  },
  {
    question: "How can I improve my score?",
    answer: "Practice regularly, take mock tests, and analyze your performance to improve your score."
  }
];
export const paths = [
  {
    name: "JEE Mains",
    duration: "3 hours",
    months: ["January", "April"],
    description: "JEE Mains, conducted by the National Testing Agency (NTA), is a highly competitive entrance exam for admission to undergraduate engineering programs in prestigious institutions like NITs, IIITs, and other centrally funded technical colleges across India. It serves as the first stage for JEE Advanced, which is required for admission to the Indian Institutes of Technology (IITs). The exam is taken by lakhs of students every year, and it tests knowledge in subjects like Physics, Chemistry, and Mathematics. JEE Mains is an objective-type exam with multiple-choice questions (MCQs) and numerical problems, making it a challenging test of the candidates' conceptual understanding and problem-solving abilities. It offers students the opportunity to secure seats in some of India's top engineering colleges. Successful candidates qualify for JEE Advanced, which opens doors to IITs. The exam has a well-defined syllabus based on the NCERT curriculum for classes 11 and 12, and aspirants need to prepare diligently in order to perform well. JEE Mains is often considered a benchmark for students aspiring for a career in engineering. The exam is held twice a year, in January and April, providing flexibility for candidates. With three subjects—Physics, Chemistry, and Mathematics—each carrying 25 questions, JEE Mains requires strategic preparation and efficient time management. The marks for each correct answer are 4, with a penalty of 1 mark for each incorrect response, ensuring that only the most accurate and well-prepared candidates succeed. Given its high stakes, many students prepare for JEE Mains over a period of 6 to 12 months.",
    subjects: [
      { name: "Physics", marks : 100 ,questions: 25 },
      { name: "Chemistry", marks : 100, questions: 25 },
      { name: "Mathematics", marks : 100, questions: 25 }
    ],
    marks:[ 300],
    correctOne: "+4",
    wrongOne: "-1",
    preparationTime: "6-12 months"
  },
  {
    name: "NEET UG",
    duration: "3 hours 20 minutes",
    months: ["May"],
    description: "he National Eligibility cum Entrance Test (NEET) UG is the entrance exam for admission to undergraduate medical courses such as MBBS and BDS in medical colleges across India. It is a single national-level examination held every year in May, and it is the most important exam for students aspiring to become doctors. NEET is conducted by the National Testing Agency (NTA) and is considered one of the toughest exams in India. The exam assesses students' knowledge in three major subjects—Physics, Chemistry, and Biology (Botany and Zoology). It consists of 180 multiple-choice questions (MCQs) and lasts for 3 hours and 20 minutes. Candidates who perform well in NEET can secure admission to various government and private medical colleges, making it a life-changing exam for many. The NEET exam follows the NCERT syllabus for classes 11 and 12, focusing on core topics in Physics, Chemistry, and Biology. The exam requires students to have a deep understanding of scientific concepts, as well as the ability to apply them in problem-solving situations. Each correct answer awards 4 marks, and each incorrect answer results in a deduction of 1 mark. Given the intense competition and the large number of candidates, thorough preparation for NEET typically takes 8 to 12 months. The exam is conducted only once a year, making it crucial for students to be well-prepared to maximize their chances of success.",
    subjects: [
      { name: "Physics", marks : 180,  questions: 45 },
      { name: "Chemistry",marks : 180, questions: 45 },
      { name: "Biology", marks : 360, questions: 90 }
    ],
    marks:[720],
    correctOne: "+4",
    wrongOne: "-1",
    preparationTime: "8-12 months"
  },
  {
    name: "CLAT",
    duration: "2 hours",
    months: ["May"],
    description: "The Common Law Admission Test (CLAT) is the entrance exam for admission to undergraduate and postgraduate law programs in India’s National Law Universities (NLUs). The exam is conducted once a year, usually in May, and is essential for students aiming to pursue a law degree from top universities. CLAT assesses students' aptitude in five key areas: English, General Knowledge and Current Affairs, Logical Reasoning, Legal Aptitude, and Quantitative Techniques. The undergraduate version of the exam is designed to evaluate a candidate's ability to think critically, solve problems, and analyze complex legal and logical questions. The legal aptitude section tests students' understanding of the legal system and reasoning ability. The English section focuses on grammar, comprehension, and vocabulary, while General Knowledge covers both current affairs and static general knowledge. Logical Reasoning tests the candidates' ability to think logically, while Quantitative Techniques focuses on basic mathematics. CLAT is an objective-type exam, and candidates need to answer multiple-choice questions (MCQs) within the given 2-hour duration. With a total of 200 marks, CLAT is a highly competitive exam, and students typically prepare for 6 to 9 months, focusing on improving their reading skills, logical reasoning, and knowledge of current events. While the exam duration is only 2 hours, the broad syllabus and level of competition require diligent preparation.",
    "subjects": [
      { "name": "English", "questions": 40, "marks": 40 },
      { "name": "General Knowledge and Current Affairs", "questions": 50, "marks": 50 },
      { "name": "Logical Reasoning", "questions": 40, "marks": 40 },
      { "name": "Legal Aptitude", "questions": 40, "marks": 40 },
      { "name": "Quantitative Techniques", "questions": 20, "marks": 20 }
    ]
    ,
    marks:[ 200],
    correctOne: "+1",
    wrongOne: "-0.25",
    preparationTime: "6-9 months"
  },
  {
    name: "CUCET",
    duration: "2 hours",
    months: ["May-June"],
    description: "The Central Universities Common Entrance Test (CUCET) is an entrance exam conducted for admission to various undergraduate and postgraduate programs across central universities in India. The exam serves as a gateway to universities that participate in the CUCET, providing a common platform for candidates to apply to multiple universities with a single application. CUCET assesses candidates’ knowledge in a variety of subjects, depending on the program they are applying for. The test includes sections such as General Knowledge, English, Mathematics, Logical Reasoning, and Subject-Specific Topics. The format of the exam is multiple-choice questions (MCQs) with some variations based on the course. It is designed to evaluate the candidates' overall academic aptitude as well as their proficiency in specific subject areas. CUCET is typically conducted once a year, and the exam duration is 2 hours. Candidates are required to prepare for the exam in a focused manner, covering topics like reasoning skills, general awareness, and relevant subject matter. Preparation for CUCET usually takes around 3 to 6 months. The marks for each correct answer are 1 point, and a penalty of 0.25 marks is deducted for each incorrect response. CUCET is an excellent opportunity for students to secure admission to prestigious central universities across India.",
    "subjects": [
      { "name": "General Knowledge", "questions": 25, "marks": 25 },
      { "name": "English", "questions": 25, "marks": 25 },
      { "name": "Mathematics", "questions": 25, "marks": 25 },
      { "name": "Logical Reasoning", "questions": 25, "marks": 25 },
      { "name": "Subject-Specific Topics", "questions": 25, "marks": 25 }
    ]
    ,
    marks:["200-300"],
    correctOne: "+1",
    wrongOne: "-0.25",
    preparationTime: "3-6 months"
  },
  {
    name: "UPSC Civil Services Exam",
    duration: "6 hours (Prelims) + Mains + Interview",
    months: ["June (Prelims)", "September (Mains)"],
    description: "The Union Public Service Commission (UPSC) Civil Services Exam is one of the most prestigious and challenging competitive exams in India. It is conducted for recruitment to various civil services positions, including Indian Administrative Service (IAS), Indian Police Service (IPS), and Indian Foreign Service (IFS), among others. The exam is conducted in three stages: Prelims, Mains, and Interview. The Prelims consist of two papers—General Studies and Civil Services Aptitude Test (CSAT)—designed to test candidates’ knowledge and reasoning abilities. The Mains exam is more comprehensive, with nine papers covering subjects like General Studies, Essay, and an optional subject chosen by the candidate. The interview stage assesses the candidate's personality and suitability for a career in civil services. UPSC is known for its vast and diverse syllabus, requiring candidates to be well-versed in a wide range of topics such as history, geography, political science, economics, and more. Given the complexity and depth of the exam, most candidates dedicate 1 to 2 years of preparation to ensure they are adequately prepared for all three stages. The Prelims exam lasts for 6 hours, the Mains for several days, and the Interview is the final step of the process. This exam demands rigorous study, strong analytical skills, and a deep understanding of various issues, making it one of the most sought-after exams in India.",
    "subjects": [
        { "name": "General Studies Paper I", "questions": 100, "marks": 200 },
        { "name": "General Studies Paper II (CSAT)", "questions": 80, "marks": 200 },
        { "name": "General Studies Paper III", "questions": 25, "marks": 250 },
        { "name": "General Studies Paper IV", "questions": 25, "marks": 250 },
        { "name": "Essay Paper", "questions": 1, "marks": 250 },
        { "name": "Optional Subject Paper I", "questions": 10, "marks": 250 },
        { "name": "Optional Subject Paper II", "questions": 10, "marks": 250 }
    ] 
    ,
    marks: ["400 (Prelims)", "1750 (Mains)", "Interview marks vary"],
    correctOne: "+2",
    wrongOne: "-0.66",
    preparationTime: "1-2 years"
  },
  {
    "name": "TS - EAMCET",
    "duration": "3 hours",
    "months": ["May"],
    "description": "The Telangana State Engineering, Agriculture and Medical Common Entrance Test (TSEAMCET) is a state-level entrance exam conducted by the Telangana State Council of Higher Education (TSCHE). It is held annually for admission to undergraduate programs in engineering, agriculture, and medical fields across various institutions in Telangana. The TSEAMCET exam is specifically designed for students seeking admission to B.Tech, B.Pharmacy, B.Sc Agriculture, and B.V.Sc courses, among others, in government and private colleges within the state. The exam is a multiple-choice question (MCQ)-based test, and it covers subjects like Physics, Chemistry, Mathematics, and Biology depending on the stream chosen by the candidate. Students applying for engineering courses typically need to take the Physics, Chemistry, and Mathematics sections, while those applying for medical and agricultural courses need to focus on Physics, Chemistry, and Biology. TSEAMCET is recognized for its structured syllabus, which is based on the NCERT curriculum for classes 11 and 12. The test is typically held in May and lasts for 3 hours. It is a crucial exam for students aiming for quality education in the state's top engineering and medical colleges. Students who perform well in TSEAMCET can secure admission to popular institutions like JNTU Hyderabad, Osmania University, and other affiliated colleges. The exam follows a well-defined marking scheme: correct answers earn a fixed number of marks, and incorrect answers incur a penalty. The marks for each correct answer are typically 1, with no negative marking for wrong answers. The exam is highly competitive, and candidates generally prepare for about 6 to 12 months to cover the extensive syllabus and enhance their problem-solving skills. The TSEAMCET is an important gateway for students who wish to pursue higher education in the fields of engineering, agriculture, and medical sciences within the state of Telangana.",
    "subjects": [
      { "name": "Physics", "questions": 40, "marks": 40 },
      { "name": "Chemistry", "questions": 40, "marks": 40 },
      { "name": "Mathematics", "questions": 40, "marks": 40 },
      { "name": "Biology", "questions": 40, "marks": 40 }
    ]
    ,
    "marks": ["160 (Engineering)", "160 (Medical)"],
    "correctOne": "+1",
    "wrongOne": "-0",
    "preparationTime": "6-12 months"
  },
  {
    "name": "LAWCET",
    "duration": "2 hours",
    "months": ["May"],
    "description": "The Law Common Entrance Test (LAWCET) is an entrance exam conducted by Osmania University on behalf of the Telangana State Council of Higher Education (TSCHE) for admission to 5-year integrated LLB (Bachelor of Laws) programs in various law colleges across Telangana. The exam is designed for students who have completed their higher secondary education (12th grade) and aspire to pursue a career in law. LAWCET is held annually, typically in May, and is considered a gateway for aspiring law students to enter prestigious law colleges in the state. The exam assesses the candidate's aptitude in subjects that are critical for law studies, including General Knowledge, English Language, Legal Aptitude, and Logical Reasoning. It consists of multiple-choice questions (MCQs) with a total duration of 2 hours. The LAWCET syllabus is designed to test the candidate's awareness of legal principles, logical thinking, and verbal ability. The exam helps determine the candidate's readiness for law school, and it is a crucial step for those aiming for a legal career. The LAWCET exam is highly competitive, with thousands of students vying for a limited number of seats in law schools. The marks for each correct answer are awarded based on a predefined scale, and there is no negative marking for incorrect responses. LAWCET serves as an excellent opportunity for students to pursue a career in law in the state of Telangana, and candidates generally prepare for about 6 to 9 months, focusing on improving their general awareness, reasoning skills, and understanding of legal concepts.",
    "subjects": [
      {
        "name": "General Knowledge",
        "marks": 30,
        "questions": 30
      },
      {
        "name": "English Language",
        "marks": 30,
        "questions": 30
      },
      {
        "name": "Legal Aptitude",
        "marks": 30,
        "questions": 30
      },
      {
        "name": "Logical Reasoning",
        "marks": 30,
        "questions": 30
      }
    ],
    "marks":[ 120],
    "correctOne": "+1",
    "wrongOne": "-0",
    "preparationTime": "6-9 months"
  }
];

export default faqs;