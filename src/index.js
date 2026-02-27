import { Command } from 'commander';
import ora from 'ora';
import { writeFileSync } from 'fs';
import { runDebate } from './debater.js';
import {
  printHeader,
  printAdvocateA,
  printAdvocateB,
  printJudge,
  printRoundBadge,
  formatMarkdownDoc,
} from './formatter.js';

export function run() {
  const program = new Command();

  program
    .name('claude-vs-claude')
    .description('Two Claude instances debate code architecture decisions')
    .version('1.0.0')
    .argument('<question>', 'The architecture question to debate')
    .option('-r, --rounds <number>', 'Number of debate rounds', '2')
    .option('-s, --save <file>', 'Save the full debate to a markdown file')
    .action(async (question, options) => {
      const numRounds = Math.max(1, Math.min(5, parseInt(options.rounds, 10) || 2));
      const saveFile = options.save;

      printHeader(question);

      let spinner = null;
      const completedRounds = [];

      try {
        const { rounds, judgment } = await runDebate(question, numRounds, {
          onRoundStart(round, total) {
            if (numRounds > 1) printRoundBadge(round, total);
            spinner = ora({
              text: `Advocates arguing${numRounds > 1 ? ` (round ${round})` : ''}...`,
              color: 'magenta',
            }).start();
          },
          onRoundComplete(round, result) {
            if (spinner) spinner.stop();
            printAdvocateA(result.advocateA, numRounds > 1 ? round : 0);
            printAdvocateB(result.advocateB, numRounds > 1 ? round : 0);
            completedRounds.push(result);
          },
          onJudging() {
            spinner = ora({ text: 'Judge deliberating...', color: 'green' }).start();
          },
        });

        if (spinner) spinner.stop();
        printJudge(judgment);

        if (saveFile) {
          const doc = formatMarkdownDoc(question, rounds, judgment);
          writeFileSync(saveFile, doc, 'utf8');
          console.log(`\nDebate saved to: ${saveFile}\n`);
        }
      } catch (err) {
        if (spinner) spinner.stop();
        console.error(`\nError: ${err.message}\n`);
        process.exit(1);
      }
    });

  program.parse(process.argv);
}
