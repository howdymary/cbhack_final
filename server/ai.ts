import Anthropic from '@anthropic-ai/sdk';

// the newest Anthropic model is "claude-3-5-sonnet-20241022" which was released October 22, 2024
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateAgentResponse(
  agentRole: string,
  context: string,
  userInput: string
): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [{
        role: "user" as const,
        content: `You are an AI agent named ${agentRole} in a Web3 educational game with a Mission Impossible theme. 
        Maintain this persona while providing accurate, educational information about Web3 concepts.
        Current context: ${context}

        ${userInput}`
      }]
    });

    if (Array.isArray(response.content) && response.content.length > 0) {
      const firstContent = response.content[0];
      if ('text' in firstContent) {
        return firstContent.text;
      }
    }
    throw new Error("Unexpected response format from AI");

  } catch (error) {
    console.error("AI Response Generation Error:", error);
    throw new Error("Failed to generate agent response");
  }
}