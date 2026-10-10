export type TagType = {
  id: string;
  title: string;
};

export interface Task {
  id: string;
  title: string;
  description: string;
  tag?: string;
  completed: boolean;
  colour: Colours;
}
export type Colours = "green" | "blue" | "red" | "yellow" | "indigo";
