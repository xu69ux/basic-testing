import { existsSync } from 'fs';
import fsPromises from 'fs/promises';
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

jest.mock('path');

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.useFakeTimers();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(() => {
      return;
    }, 1000);

    expect(setTimeoutSpy).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    jest.useFakeTimers();

    const callback = jest.fn();

    doStuffByTimeout(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.useFakeTimers();
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(() => {
      return;
    }, 1000);

    expect(setIntervalSpy).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.useFakeTimers();

    const callback = jest.fn();

    doStuffByInterval(callback, 1000);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'test.txt';
    await readFileAsynchronously(pathToFile);
    expect(jest.requireMock('path').join as jest.Mock).toHaveBeenCalledWith(
      expect.any(String),
      pathToFile,
    );
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValueOnce(false);
    const pathToFile = 'test.txt';
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'test.txt';
    const fileContent = 'test';
    (existsSync as jest.Mock).mockReturnValueOnce(true);
    (jest.requireMock('path').join as jest.Mock).mockReturnValueOnce(
      pathToFile,
    );
    (fsPromises.readFile as jest.Mock).mockResolvedValueOnce(fileContent);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe('test');
  });
});
