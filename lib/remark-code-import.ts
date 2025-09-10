// This is the source code of the "remark-code-import" library,
// customized to fit the project.

import fs from 'node:fs';
import { EOL } from 'node:os';
import path from 'node:path';

import stripIndent from 'strip-indent';
import { visit } from 'unist-util-visit';

function extractLines(
  content: any,
  fromLine: any,
  hasDash: any,
  toLine: any,
  preserveTrailingNewline = false
) {
  const lines = content.split(EOL);
  const start = fromLine || 1;

  let end: number;
  if (!hasDash) {
    end = start;
  } else if (toLine) {
    end = toLine;
  } else if (lines.at(-1) === '' && !preserveTrailingNewline) {
    end = lines.length - 1;
  } else {
    end = lines.length;
  }

  return lines.slice(start - 1, end).join('\n');
}

export function remarkCodeImport(options: any = {}) {
  // Default rootDir is the "." directory in the current working directory
  const rootDir = options.rootDir || path.join(process.cwd(), '');

  if (!path.isAbsolute(rootDir)) {
    throw new Error(`"rootDir" has to be an absolute path`);
  }

  return function transformer(tree: any, file: any) {
    const codes: any = [];

    visit(tree, 'code', (node, index, parent) => {
      codes.push([node, index, parent]);
    });

    for (const [node] of codes) {
      const fileMeta = (node.meta || '')
        // Allow escaping spaces
        .split(/(?<!\\) /g)
        .find((meta: any) => meta.startsWith('file='));

      if (!fileMeta) {
        continue;
      }

      // @ts-ignore
      const res =
        /^file=(?<path>.+?)(?:(?:#(?:L(?<from>\d+)(?<dash>-)?)?)(?:L(?<to>\d+))?)?$/.exec(
          fileMeta
        );

      if (!res || !res.groups || !res.groups.path) {
        throw new Error(`Unable to parse file path ${fileMeta}`);
      }

      const filePath = res.groups.path;

      const fromLine = res.groups.from
        ? Number.parseInt(res.groups.from, 10)
        : undefined;

      const hasDash = !!res.groups.dash || fromLine === undefined;

      const toLine = res.groups.to
        ? Number.parseInt(res.groups.to, 10)
        : undefined;

      const normalizedFilePath = filePath
        .replace(/^@/, rootDir)
        .replace(/\\ /g, ' ');

      const fileAbsPath = path.resolve(file.dirname, normalizedFilePath);

      const relativePathFromRootDir = path.relative(rootDir, fileAbsPath);

      if (
        !rootDir ||
        relativePathFromRootDir.startsWith(`..${path.sep}`) ||
        path.isAbsolute(relativePathFromRootDir)
      ) {
        throw new Error(
          `Attempted to import code from "${fileAbsPath}", which is outside from the rootDir "${rootDir}"`
        );
      }

      const fileContent = fs.readFileSync(fileAbsPath, 'utf8');

      node.value = extractLines(
        fileContent,
        fromLine,
        hasDash,
        toLine,
        options.preserveTrailingNewline
      );

      if (options.removeRedundantIndentations) {
        node.value = stripIndent(node.value);
      }
    }
  };
}
