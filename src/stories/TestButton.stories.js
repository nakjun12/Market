import { Button } from "./Button";

const meta = {
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" }
  }
};

export default meta;

// This is an accessible story
export const Accessible = {
  args: {
    primary: false,
    label: "Button"
  }
};

// This is not
export const Inaccessible = {
  args: {
    ...Accessible.args,
    backgroundColor: "red"
  }
};
