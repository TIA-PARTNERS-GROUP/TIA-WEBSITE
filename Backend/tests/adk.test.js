import { sendToAdkTestEval } from '../services/adkServices.js';
import path from 'path';

// Hardcoded list of test case file paths (each is a saved conversation JSON)
const TEST_CASES = [
  path.join(process.cwd(), 'tmp', 'agent_chat_history', 'test_case_1.json'),
  path.join(process.cwd(), 'tmp', 'agent_chat_history', 'test_case_2.json'),
  // Add more file paths here as needed
].map(filePath => ({
  name: `Test Case: ${path.basename(filePath)}`,
  expected: filePath
}));

describe('ADK Test Evaluation', () => {
  test.each(TEST_CASES)('$name', async ({ expected }) => {
    const result = await sendToAdkTestEval({ expected });

    // Assertions for the updated test-eval response
    expect(result).not.toHaveProperty('error');
    expect(result.overall_score).toBeDefined();
    expect(result.overall_score).toBeGreaterThanOrEqual(7);
    expect(result.session_id).toBeDefined();
    expect(result.state).toBeDefined();
  });
});