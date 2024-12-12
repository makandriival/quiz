export interface Option {
  id: number;
  text: string;
  lang?: string;
  conditional?: {
    question: string;
  };
  icon?: string;
}

export interface IActions {
  isNext?: boolean;
  isBack?: boolean;
  isDownload?: boolean;
  isRetake?: boolean;
  isSaveToDb?: boolean;
}
export interface Step {
  id: number;
  question: string;
  helperText?: string;
  type: string;
  options?: Option[];
  actions: IActions;
  isFinal?: boolean;
  flow?: string;
}

export const steps: Step[] = [
  {
    id: 1,
    question: "What is your preferred language?",
    helperText: "Choose language",
    type: "single-select",
    actions: {},
    options: [
      {
        id:1,
        text: "English",
        lang: "en"
      },
      {
        id:2,
        text: "Spanish",
        lang: "es"
      },
      {
        id:3,
        text: "French",
        lang: "fr"
      },
      {
        id:4,
        text: "German",
        lang: "de"
      }
    ]
  },
  {
    id: 2,
    question: "What gender do you identify with?",
    helperText: "Please share how do you identify yourself",
    type: "single-select",
    flow: "row",
    actions: {
      isBack: true
    },
    options: [
      {
        id:1,
        text: "Male",
        icon: "👨"
      },
      {
        id:2,
        text: "Female",
        icon: "👩"
      },
      {
        id:3,
        text: "Other",
        icon: "🤷‍♂️"
      }
    ]
  },
  {
    id: 3,
    type: "single-select",
    question: "What is your age?",

    actions: {
      isBack: true
    },
    options: [
      {
        id:1,
        text: "0-18",
        conditional: {
          question: "Are you a student?",
        }
      },
      {
        id:2,
        text: "19-30",
        conditional: {
          question: "Do you work?",
        }
      },
      {
        id:3,
        text: "31-50",
        conditional: {
          question: "Are you married?",
        }
      },
      {
        id:4,
        text: "51-70",
      },
    ]
  },
  {
    id: 4,
    question: "What you hate the most in book?",
    type: "multi-select",
    actions: {
      isNext: true,
      isBack: true
    },
    options: [
      {
        id:1,
        text: "violence",
      },
      {
        id:2,
        text: "abuse",
      },
      {
        id:3,
        text: "sexual content",
      },
      {
        id:4,
        text: "lack of humour",
      },
      {
        id:5,
        text: "lack of diversity",
      }
    ]
  },
  {
    id: 5,
    question: "What are your favorite topics?",
    type: "multi-select",
    isFinal: true,
    actions: {
      isNext: true,
      isBack: true
    },
    options: [
      {
        id:1,
        text: "mystery",
      },
      {
        id:2,
        text: "romance",
      },
      {
        id:3,
        text: "fantasy",
      },
      {
        id:4,
        text: "science fiction",
      },
      {
        id:5,
        text: "history",
      },
      {
        id:6,
        text: "biography",
      },
      {
        id:7,
        text: "self-help",
      },
      {
        id:8,
        text: "horror",
      }
    ]
  },
  {
    id: 6,
    question: "Please enter your email",
    type: "email",
    actions: {
      isNext: true,
    },
  },
  {
    id: 7,
    question: "Thank you!",
    type: "success",
    actions: {
      isDownload: true,
      isRetake: true,
      isSaveToDb: true,
    }
  }
];