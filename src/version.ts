import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';

export interface VersionInfo {
  version: string;
  commit: string;
}

/**
 * Get version info from package.json and git
 * @returns Object with version and commit short SHA
 */
export function getVersionInfo(): VersionInfo {
  try {
    // Read version from package.json
    const packageJsonPath = join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const version = packageJson.version || 'unknown';

    // Get commit short SHA from git
    let commit = 'unknown';
    try {
      commit = execSync('git rev-parse --short HEAD', {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'ignore'],
      }).trim();
    } catch (err) {
      // If not in a git repo, use a fallback
      commit = 'detached';
    }

    return {
      version,
      commit,
    };
  } catch (err) {
    // Return defaults if anything fails
    return {
      version: 'unknown',
      commit: 'unknown',
    };
  }
}
