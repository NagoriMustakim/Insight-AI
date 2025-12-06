export interface ChatMessage {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: string
}

export const initialChatHistory: ChatMessage[] = [
    {
        id: '1',
        role: 'assistant',
        content: "Hello! I'm your Insight AI assistant. I can help you analyze your product reviews, identify trends, and suggest improvements. What would you like to know today?",
        timestamp: '10:00 AM'
    },
    {
        id: '2',
        role: 'user',
        content: "Why did our sentiment score drop last week?",
        timestamp: '10:05 AM'
    },
    {
        id: '3',
        role: 'assistant',
        content: "I've analyzed the data. The sentiment drop last week was primarily driven by a surge in negative reviews for the **iPhone 14 Pro Max** on **Amazon**. \n\nKey issues mentioned:\n- **Overheating** during charging (45 mentions)\n- **Battery drain** after the latest iOS update (32 mentions)\n\nWould you like me to draft a response for the engineering team?",
        timestamp: '10:06 AM'
    }
]

export const suggestedQuestions = [
    "Summarize top complaints",
    "Compare Amazon vs. Walmart sentiment",
    "Draft a response to negative reviews",
    "What are the top feature requests?"
]
