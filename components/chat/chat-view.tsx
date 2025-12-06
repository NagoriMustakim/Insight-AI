"use client"

import * as React from "react"
import { Send, Sparkles, User, Bot } from "lucide-react"
import { initialChatHistory, suggestedQuestions, ChatMessage } from "@/data/chat"
import { cn } from "@/lib/utils"

export function ChatView() {
  const [messages, setMessages] = React.useState<ChatMessage[]>(initialChatHistory)
  const [inputValue, setInputValue] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, newMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm analyzing your request... This is a demo response. In a real application, I would query your data to answer: \"" + content + "\"",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white dark:bg-neutral-900 rounded-2xl shadow-sm overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-100/50 dark:border-neutral-800/50 flex items-center gap-3 bg-white dark:bg-neutral-900">
        <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="font-bold text-gray-900 dark:text-white">Insight AI Assistant</h2>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Online</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50 dark:bg-black/20 scrollbar-hide">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-4 max-w-3xl",
              message.role === 'user' ? "ml-auto flex-row-reverse" : ""
            )}
          >
            {/* Avatar */}
            <div className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
              message.role === 'assistant' 
                ? "bg-indigo-600 text-white" 
                : "bg-gray-200 dark:bg-neutral-800 text-gray-600 dark:text-gray-300"
            )}>
              {message.role === 'assistant' ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
            </div>

            {/* Message Bubble */}
            <div className={cn(
              "rounded-2xl p-4 text-sm leading-relaxed shadow-sm",
              message.role === 'assistant'
                ? "bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-neutral-800"
                : "bg-indigo-600 text-white"
            )}>
              <div className="whitespace-pre-wrap">{message.content}</div>
              <div className={cn(
                "text-[10px] mt-2 opacity-70",
                message.role === 'user' ? "text-indigo-100" : "text-gray-400"
              )}>
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-4 max-w-3xl">
            <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0">
              <Bot className="h-5 w-5" />
            </div>
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-gray-100 dark:border-neutral-800 flex items-center gap-1">
              <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
              <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-neutral-900 border-t border-gray-100/50 dark:border-neutral-800/50">
        {/* Suggested Questions */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(question)}
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-gray-100 dark:bg-neutral-800 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400 transition-colors border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800"
            >
              {question}
            </button>
          ))}
        </div>

        {/* Input Field */}
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your product reviews..."
            className="flex-1 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            className="p-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-indigo-500/20"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
