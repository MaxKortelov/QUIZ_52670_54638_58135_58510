export type Feedback = {
  id?: string;
  name: string,
  surname: string,
  email: string,
  phoneNumber: number,
  rate: number,
  headline: string,
  text: string
}

export type Feedbacks = {
  feedbacks: Feedback[]
}

