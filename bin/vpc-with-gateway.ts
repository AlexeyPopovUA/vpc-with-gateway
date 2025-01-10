#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

import {NetworkStack} from '../lib/network-stack';
import configuration from "../cfg/configuration";

const app = new cdk.App();

new NetworkStack(app, 'NetworkStack', {
  env: {
    account: configuration.COMMON.account,
    region: configuration.COMMON.region
  }
});
