import "source-map-support/register";
import { GuRoot } from "@guardian/cdk/lib/constructs/root";
import { AwsSchoolAppTemplate } from "../lib/aws-school-app-template";

const app = new GuRoot();
new AwsSchoolAppTemplate(app, "AwsSchoolAppTemplate-CODE", { stack: "playground", stage: "CODE", app: "aws-school-app-template", env: {region: "eu-west-1"} });
new AwsSchoolAppTemplate(app, "AwsSchoolAppTemplate-PROD", { stack: "playground", stage: "PROD", app: "aws-school-app-template", env: {region: "eu-west-1"} });
