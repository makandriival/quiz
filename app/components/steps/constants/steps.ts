export interface Option {
  id: number;
  text: string;
}

export interface IActions {
  isNext?: boolean;
  isBack?: boolean;
  isDownload?: boolean;
  isRetake?: boolean;
}
export interface Step {
  id: number;
  question: string;
  type: string;
  options?: Option[];
  actions: IActions;
}

export const steps = [
  {
    id: 1,
    question: "What language do you prefer?",
    type: "single-select",
    actions: {},
    options: [
      {
        id:1,
        text: "english",
      },
      {
        id:2,
        text: "spanish",
      },
      {
        id:3,
        text: "french",
      },
      {
        id:4,
        text: "german",
      }
    ]
  },
  {
    id: 2,
    type: "single-select",
    question: "What is your age?",
    actions: {
      isBack: true
    },
    options: [
      {
        id:1,
        text: "0-18",
      },
      {
        id:2,
        text: "19-30",
      },
      {
        id:3,
        text: "31-50",
      },
      {
        id:4,
        text: "51-70",
      },
    ]
  },
  {
    id: 3,
    question: "What is your gender?",
    type: "single-select",
    actions: {
      isBack: true
    },
    options: [
      {
        id:1,
        text: "male",
      },
      {
        id:2,
        text: "female",
      },
      {
        id:3,
        text: "other",
      }
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
    }
  }
];