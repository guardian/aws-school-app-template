import type {GuStackProps} from "@guardian/cdk/lib/constructs/core";
import {GuStack} from "@guardian/cdk/lib/constructs/core";
import type {App} from "aws-cdk-lib";
import {GuPlayApp} from "@guardian/cdk";
import {AccessScope} from "@guardian/cdk/lib/constants";
import {InstanceClass, InstanceSize, InstanceType} from "aws-cdk-lib/aws-ec2";
import {GuCname} from "@guardian/cdk/lib/constructs/dns";
import {Duration} from "aws-cdk-lib";

export class AwsSchoolAppTemplate extends GuStack {
  constructor(scope: App, id: string, props: GuStackProps) {
    super(scope, id, props);

    const domainName = this.stage==="CODE" ? "simple-example.code.dev-gutools.co.uk" : "simple-example.gutools.co.uk";
    const app = "aws-school-app-template";

    const stack = new GuPlayApp(this, {
      access: {
        scope: AccessScope.PUBLIC,
      },
      app,
      applicationLogging: {
        enabled: true,
      },
      certificateProps: {
        domainName,
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
    });

    new GuCname(this, "dnsName", {
      domainName,
      resourceRecord: stack.loadBalancer.loadBalancerDnsName,
      app,
      ttl: Duration.minutes(20)
    });
  }
}
