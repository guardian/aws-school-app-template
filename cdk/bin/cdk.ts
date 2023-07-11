import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { AwsSchoolAppTemplate } from "../lib/aws-school-app-template";

const app = new App();
new AwsSchoolAppTemplate(app, "AwsSchoolAppTemplate-CODE", { stack: "playground", stage: "CODE", app: "aws-school-app-template" });
new AwsSchoolAppTemplate(app, "AwsSchoolAppTemplate-PROD", { stack: "playground", stage: "PROD", app: "aws-school-app-template" });
