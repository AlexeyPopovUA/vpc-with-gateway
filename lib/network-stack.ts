import {Construct} from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

import configuration from "../cfg/configuration";

export class NetworkStack extends cdk.Stack {
  public readonly vpc: ec2.IVpc;
  public readonly securityGroup: ec2.ISecurityGroup;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.vpc = new ec2.Vpc(this, `${configuration.COMMON.project}-vpc`, {
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
      vpcName: configuration.NETWORKING.vpcName,
      maxAzs: 2,
      subnetConfiguration: [
        {
          name: 'public',
          subnetType: ec2.SubnetType.PUBLIC
        },
        {
          name: 'private-with-nat',
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
          cidrMask: 24
        },
        {
          name: 'private-isolated',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24
        }
      ],
      natGateways: configuration.NETWORKING.enableNetworkEgress ? 1 : 0,
      enableDnsHostnames: true,
      enableDnsSupport: true
    });

    // security group with all outbound traffic allowed
    this.securityGroup = new ec2.SecurityGroup(this, `${configuration.COMMON.project}-ecs-sg`, {
      securityGroupName: configuration.NETWORKING.securityGroupName,
      vpc: this.vpc,
      allowAllOutbound: true,
    });

    // TODO Remove it
    this.securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.allTraffic(), 'Allow all ipv4 inbound traffic');
    // TODO Remove it
    this.securityGroup.addIngressRule(ec2.Peer.anyIpv6(), ec2.Port.allTraffic(), 'Allow all ipv6 inbound traffic');
  }
}