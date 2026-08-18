import { computeNextVersion } from '../next-version';

describe('computeNextVersion', () => {
  it('bumps patch version', () => {
    expect(computeNextVersion('v1.2.3', 'patch')).toBe('v1.2.4');
  });

  it('bumps minor version and resets patch', () => {
    expect(computeNextVersion('v1.2.3', 'minor')).toBe('v1.3.0');
  });

  it('bumps major version and resets minor and patch', () => {
    expect(computeNextVersion('v1.2.3', 'major')).toBe('v2.0.0');
  });

  it('accepts tags without a leading v', () => {
    expect(computeNextVersion('1.0.0', 'minor')).toBe('v1.1.0');
  });

  it('bumps from the initial v0.0.0 tag', () => {
    expect(computeNextVersion('v0.0.0', 'minor')).toBe('v0.1.0');
  });

  it('throws on an invalid tag format', () => {
    expect(() => computeNextVersion('not-a-version', 'minor')).toThrow(
      'Invalid tag format: not-a-version'
    );
  });
});
