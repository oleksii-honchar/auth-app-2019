import { get } from 'lodash';
import * as faker from 'faker';

describe('Adds name and version to response', () => {
  let mockPkg: any = null;

  beforeEach(() => {
    mockPkg = {
      name: faker.random.word(),
      version: `${faker.random.number()}`,
    };
    jest.mock('package.json', () => mockPkg);
  });

  afterEach(() => {
    mockPkg = null;
  });

  test('Modifies response body with version and response code', () => {
    const { versionHandler } = require('../handler');

    const res = {};
    const reqData = {};
    const nextSpy = jest.fn();

    versionHandler.get(reqData, res, nextSpy);

    const statusCode = get(res, 'statusCode');
    const body = get(res, 'body');

    expect(statusCode).toBe(200);
    expect(body.indexOf(mockPkg.name)).not.toBe(-1);
    expect(nextSpy.mock.calls.length).toBe(1);
  });
});
