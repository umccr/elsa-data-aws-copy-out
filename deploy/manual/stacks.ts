import { CopyOutStack } from "../../workload-copy-out/copy-out-stack";
import { SubnetType } from "aws-cdk-lib/aws-ec2";
import { App } from "aws-cdk-lib";

const app = new App();

const description =
  "Bulk copy out service for Elsa Data - an application for controlled genomic data sharing";

{
  const localDevTestId = "ElsaDataDevCopyOutStack";

  new CopyOutStack(app, localDevTestId, {
    // the stack can only be deployed to 'dev'
    env: {
      account: "843407916570",
      region: "ap-southeast-2",
    },
    tags: {
      "umccr-org:Product": "ElsaData",
      "umccr-org:Stack": localDevTestId,
    },
    description: description,
    isDevelopment: true,
    infrastructureStackName: "ElsaDataDevInfrastructureStack",
    infrastructureSubnetSelection: SubnetType.PRIVATE_WITH_EGRESS,
  });
}

{
  const agDemoId = "ElsaDataDemoAustralianGenomicsCopyOutStack";

  new CopyOutStack(app, agDemoId, {
    // the stack can only be deployed to 'ag'
    env: {
      account: "602836945884",
      region: "ap-southeast-2",
    },
    tags: {
      "umccr-org:Product": "ElsaData",
      "umccr-org:Stack": agDemoId,
    },
    description: description,
    isDevelopment: false,
    infrastructureStackName:
      "ElsaDataDemoAustralianGenomicsInfrastructureStack",
    infrastructureSubnetSelection: SubnetType.PRIVATE_WITH_EGRESS,
  });
}

{
  const agId = "ElsaDataAustralianGenomicsCopyOutStack";

  new CopyOutStack(app, agId, {
    // the stack can only be deployed to 'ag'
    env: {
      account: "602836945884",
      region: "ap-southeast-2",
    },
    tags: {
      "umccr-org:Product": "ElsaData",
      "umccr-org:Stack": agId,
    },
    isDevelopment: false,
    infrastructureStackName: "ElsaDataAustralianGenomicsInfrastructureStack",
    infrastructureSubnetSelection: SubnetType.PRIVATE_WITH_EGRESS,
  });
}
