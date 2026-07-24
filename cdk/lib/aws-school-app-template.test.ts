import { App } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { AwsSchoolAppTemplate } from "./aws-school-app-template";

describe("The AwsSchoolAppTemplate stack", () => {
  it("matches the snapshot", () => {
    const app = new App();
    const stack = new AwsSchoolAppTemplate(app, "AwsSchoolAppTemplate", { stack: "playground", stage: "TEST" });
    const template = Template.fromStack(stack);
    expect(template.toJSON()).toMatchSnapshot();
  });
});
