'use strict';

const ServerlessError = require('../../../classes/Error').ServerlessError;

async function getStackId(provider, sdkParams = {}) {
  const stackName = provider.naming.getStackName();
  const { StackSummaries, NextToken } = await provider.request(
    'CloudFormation',
    'listStacks',
    sdkParams
  );
  const stackSummary = StackSummaries.find(({ StackName }) => StackName === stackName);

  if (stackSummary) {
    return stackSummary.StackId;
  }
  if (NextToken) {
    return getStackId(provider, { NextToken });
  }

  throw new ServerlessError(`Could not find the StackId of the ${stackName} stack.`);
}

module.exports = getStackId;
