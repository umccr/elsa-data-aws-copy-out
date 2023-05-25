import { Stack, Tags } from "aws-cdk-lib";
import { Construct } from "constructs";
import { CopyOutStackProps } from "./copy-out-stack-props";
import { Cluster } from "aws-cdk-lib/aws-ecs";
import { CopyOutStateMachineConstruct } from "./construct/copy-out-state-machine-construct";
import { Service } from "aws-cdk-lib/aws-servicediscovery";
import {
  createNamespaceFromLookup,
  createVpcFromLookup,
} from "./create-from-lookup";

export class CopyOutStack extends Stack {
  constructor(scope: Construct, id: string, props: CopyOutStackProps) {
    super(scope, id, props);

    const vpc = createVpcFromLookup(this, props.infrastructureStackName);

    const namespace = createNamespaceFromLookup(
      this,
      props.infrastructureStackName
    );

    const cluster = new Cluster(this, "FargateCluster", {
      vpc: vpc,
      enableFargateCapacityProviders: true,
    });

    const service = new Service(this, "Service", {
      namespace: namespace,
      name: "CopyOut",
      description: "Parallel file copying service",
    });

    const sm = new CopyOutStateMachineConstruct(this, "CopyOut", {
      vpc: vpc,
      vpcSubnetSelection: props.infrastructureSubnetSelection,
      fargateCluster: cluster,
      namespaceService: service,
      aggressiveTimes: props.isDevelopment,
    });
  }
}
