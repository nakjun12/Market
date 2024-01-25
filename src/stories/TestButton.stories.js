import { Button } from "./Button";

const meta = {
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" }
  },
  parameters: {
    a11y: {
      // Optional selector to inspect
      element: "#storybook-root",
      config: {
        rules: [
          {
            // The autocomplete rule will not run based on the CSS selector provided
            id: "autocomplete-valid",
            selector: '*:not([autocomplete="nope"])'
          },
          {
            // Setting the enabled option to false will disable checks for this particular rule on all stories.
            id: "image-alt",
            enabled: false
          }
        ]
      },
      options: {},
      manual: true
    }
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
