export default {
  COMMON: {
    project: "vpc-with-gateway",
    region: process.env?.AWS_DEPLOYMENT_REGION || "",
    account: process.env?.AWS_ACCOUNT || "",
    defaultEnvironment: process.env?.DEFAULT_BRANCH || "main"
  },
  NETWORKING: {
    vpcName: `vpc-with-gateway`,
    securityGroupName: `vpc-with-gateway-ecs-sg`,
    // NAT gateway and public IP for the NAT gateway are expensive things for a home lab
    enableNetworkEgress: process.env?.ENABLE_NETWORK_EGRESS === "true" || false,
  }
};
