'use strict';

const expect = require('chai').expect;
const BbPromise = require('bluebird');
const getStackId = require('../../../../../../lib/plugins/aws/utils/getStackId');

describe('#getStackId', () => {
  it('should return the StackId of the current stack', async () => {
    const provider = {
      naming: {
        getStackName: () => 'stack-name',
      },
      request: () =>
        BbPromise.resolve({
          StackSummaries: [
            {
              StackName: 'my-first-stack',
              StackId: 'my-first-stack-id',
            },
            {
              StackName: 'stack-name',
              StackId: 'stack-id',
            },
          ],
        }),
    };
    const result = await getStackId(provider);
    expect(result).to.equal('stack-id');
  });
});
