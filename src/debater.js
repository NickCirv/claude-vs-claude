import Anthropic from '@anthropic-ai/sdk';
import {
  ADVOCATE_A_SYSTEM,
  ADVOCATE_B_SYSTEM,
  JUDGE_SYSTEM,
  buildAdvocateAPrompt,
  buildAdvocateBPrompt,
  buildJudgePrompt,
} from './prompts.js';

const MODEL = 'claude-opus-4-5';
const MAX_TOKENS = 1024;

function getClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      'ANTHROPIC_API_KEY environment variable is not set.\nGet your key at: https://console.anthropic.com/'
    );
  }
  return new Anthropic({ apiKey });
}

async function callClaude(client, systemPrompt, userPrompt) {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  });

  const block = response.content.find((b) => b.type === 'text');
  if (!block) throw new Error('No text content in API response');
  return block.text;
}

async function runRound(client, question, roundNum, previousA, previousB) {
  const promptA = buildAdvocateAPrompt(question, roundNum, previousB);
  const promptB = buildAdvocateBPrompt(question, roundNum, previousA);

  // Run both advocates in parallel
  const [advocateA, advocateB] = await Promise.all([
    callClaude(client, ADVOCATE_A_SYSTEM, promptA),
    callClaude(client, ADVOCATE_B_SYSTEM, promptB),
  ]);

  return { advocateA, advocateB };
}

/**
 * Run the full debate.
 * @param {string} question - The architecture question to debate
 * @param {number} numRounds - Number of debate rounds (default 2)
 * @param {{ onRoundStart, onRoundComplete, onJudging }} callbacks
 * @returns {{ rounds: Array<{advocateA, advocateB}>, judgment: string }}
 */
export async function runDebate(question, numRounds = 2, callbacks = {}) {
  const client = getClient();
  const rounds = [];

  for (let i = 0; i < numRounds; i++) {
    const roundNum = i + 1;
    const prev = rounds[i - 1];

    if (callbacks.onRoundStart) callbacks.onRoundStart(roundNum, numRounds);

    const result = await runRound(
      client,
      question,
      roundNum,
      prev?.advocateA ?? null,
      prev?.advocateB ?? null
    );

    rounds.push(result);

    if (callbacks.onRoundComplete) callbacks.onRoundComplete(roundNum, result);
  }

  if (callbacks.onJudging) callbacks.onJudging();

  const judgePrompt = buildJudgePrompt(question, rounds);
  const judgment = await callClaude(client, JUDGE_SYSTEM, judgePrompt);

  return { rounds, judgment };
}
