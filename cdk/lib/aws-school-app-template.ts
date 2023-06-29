import type {GuStackProps} from "@guardian/cdk/lib/constructs/core";
import {GuStack} from "@guardian/cdk/lib/constructs/core";
import type {App} from "aws-cdk-lib";
import {GuPlayApp} from "@guardian/cdk";
import {AccessScope} from "@guardian/cdk/lib/constants";
import {InstanceClass, InstanceSize, InstanceType} from "aws-cdk-lib/aws-ec2";

export class AwsSchoolAppTemplate extends GuStack {
  constructor(scope: App, id: string, props: GuStackProps) {
    super(scope, id, props);

    new GuPlayApp(this, {
      access: {
        scope: AccessScope.PUBLIC,
      },
      app: "aws-school-app-template",
      applicationLogging: {
        enabled: true,
      },
      certificateProps: {
        domainName: this.stage==="CODE" ? "simple-example.code.dev-gutools.co.uk" : "simple-example.gutools.co.uk",
      },
      instanceType: InstanceType.of(InstanceClass.T4G, InstanceSize.NANO),
      monitoringConfiguration: {
        noMonitoring: true,
      },
      scaling: {
        minimumInstances: 2,
        maximumInstances: 4
      },
      userData: {
        distributable: {
          fileName: "aws-school-app-template_1.0_all.deb",
          executionStatement: "dpkg -i aws-school-app-template/aws-school-app-template_1.0_all.deb"
        }
      }
    })
  }
}
