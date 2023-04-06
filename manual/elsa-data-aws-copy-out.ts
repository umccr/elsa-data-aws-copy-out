import { CopyOutStack } from "../workload-copy-out/copy-out-stack";
import { SubnetType } from "aws-cdk-lib/aws-ec2";
import { App } from "aws-cdk-lib";

const app = new App();

new CopyOutStack(app, "ElsaDataLocalDevTestCopyOutStack", {
  // the stack can only be deployed to 'dev'
  env: {
    account: "843407916570",
    region: "ap-southeast-2",
  },
  tags: {
    "umccr-org:Product": "ElsaData",
  },
  isDevelopment: true,
  infrastructureStackName: "ElsaDataLocalDevTestInfrastructureStack",
  infrastructureSubnetSelection: SubnetType.PRIVATE_WITH_EGRESS,
});

new CopyOutStack(app, "ElsaDataAgCopyOutStack", {
  // the stack can only be deployed to 'dev'
  env: {
    account: "602836945884",
    region: "ap-southeast-2",
  },
  tags: {
    "umccr-org:Product": "ElsaData",
  },
  isDevelopment: false,
  infrastructureStackName: "ElsaDataAustralianGenomicsInfrastructureStack",
  infrastructureSubnetSelection: SubnetType.PRIVATE_ISOLATED,
});
