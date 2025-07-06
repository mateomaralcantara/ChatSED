import React, { useState, useRef, useEffect } from 'react';

// Sidebar Component
const Sidebar = ({ conversations, activeConversation, onNewChat, onSelectConversation, isCollapsed, toggleSidebar }) => {
  return (
    <div className={`bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-80'} min-h-screen flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <button 
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {!isCollapsed && (
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              ChatSed
            </h1>
          )}
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button 
          onClick={onNewChat}
          className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-3 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 font-semibold shadow-lg flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {!isCollapsed && "Nueva Conversación"}
        </button>
      </div>

      {/* Conversations List */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {conversations.map((conv) => (
              <div 
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeConversation === conv.id 
                    ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border-l-4 border-red-400' 
                    : 'hover:bg-gray-700'
                }`}
              >
                <div className="text-sm font-medium text-white truncate">{conv.title}</div>
                <div className="text-xs text-gray-400 mt-1">{conv.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          {!isCollapsed && (
            <div className="text-sm">
              <div className="font-medium text-white">ChatSed AI</div>
              <div className="text-gray-400">Experto en seducción</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Message Component
const Message = ({ message, isUser }) => {
  return (
    <div className={`flex gap-4 p-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-400 to-pink-400 flex items-center justify-center flex-shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1638445533129-65aaf55fb94c" 
            alt="AI Avatar" 
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      )}
      <div className={`max-w-3xl ${isUser ? 'order-first' : ''}`}>
        <div className={`px-4 py-3 rounded-2xl ${
          isUser 
            ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white ml-auto' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
      )}
    </div>
  );
};

// Chat Input Component
const ChatInput = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu mensaje de seducción..."
              className="w-full p-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent resize-none min-h-[50px] max-h-32 bg-gray-50"
              rows={1}
              style={{ scrollbarWidth: 'none' }}
            />
            <div className="absolute right-3 bottom-3 flex items-center gap-2">
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  input.trim() && !isLoading
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

// Welcome Screen Component
const WelcomeScreen = () => {
  const suggestions = [
    "¿Cómo puedo iniciar una conversación interesante?",
    "Ayúdame a crear el mensaje perfecto para conquistar",
    "¿Cuáles son las mejores frases para seducir?",
    "Dame consejos para ser más carismático/a"
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            ChatSed
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Tu asistente personal para el arte de la seducción
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index}
              className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200 hover:border-red-300 transition-all duration-200 cursor-pointer hover:shadow-lg"
            >
              <p className="text-gray-700 text-sm">{suggestion}</p>
            </div>
          ))}
        </div>
        
        <div className="text-sm text-gray-500">
          <p>💕 Conversaciones inteligentes y seductoras</p>
          <p>✨ Consejos personalizados para cada situación</p>
          <p>🎭 Domina el arte de la seducción con IA</p>
        </div>
      </div>
    </div>
  );
};

// Main Chat Component
const ChatSed = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: "Consejos para citas",
      timestamp: "Hace 2 horas",
      messages: [
        { id: 1, text: "Hola, necesito ayuda para mi primera cita", isUser: true },
        { id: 2, text: "¡Perfecto! Me encanta ayudar con las primeras citas. Lo más importante es ser auténtico/a y mostrar interés genuino. ¿Dónde van a encontrarse?", isUser: false }
      ]
    },
    {
      id: 2,
      title: "Frases para conquistar",
      timestamp: "Ayer",
      messages: [
        { id: 1, text: "¿Cuáles son las mejores frases para seducir?", isUser: true },
        { id: 2, text: "Las mejores frases de seducción son las que salen del corazón. Pero aquí tienes algunas que funcionan: 'Me encanta cómo piensas', 'Tienes una sonrisa que ilumina cualquier lugar', 'Eres increíblemente interesante'. ¿Hay alguna situación específica en la que quieras usarlas?", isUser: false }
      ]
    }
  ]);

  const [activeConversation, setActiveConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const messagesEndRef = useRef(null);

  const seductionResponses = [
    "Me encanta tu estilo de comunicación. La clave está en la confianza y la autenticidad. ¿Te gustaría que te ayude con alguna situación específica?",
    "Esa es una pregunta fascinante. En la seducción, lo más importante es crear una conexión emocional genuina. ¿Qué te parece si exploramos juntos diferentes enfoques?",
    "Tu forma de preguntar me dice que tienes mucho potencial. La seducción es un arte que combina carisma, inteligencia emocional y timing perfecto. ¿Quieres que te enseñe algunas técnicas?",
    "Interesante perspectiva. En mi experiencia, las mejores conversaciones de seducción nacen de la curiosidad genuina por la otra persona. ¿Te parece que practiquemos?",
    "Me parece que tienes una mente muy atractiva. La seducción intelectual es una de las más poderosas. ¿Qué opinas de combinar inteligencia con carisma?",
    "Tu pregunta revela una sensibilidad especial. En la seducción, la vulnerabilidad controlada puede ser muy seductora. ¿Te gustaría explorar este concepto?",
    "Esa es una excelente manera de abordar el tema. La seducción exitosa siempre incluye una dosis de misterio y otra de sinceridad. ¿Qué te parece si encontramos tu equilibrio perfecto?",
    "Me encanta cómo planteas las cosas. La seducción moderna es más sobre conexión emocional que sobre frases ensayadas. ¿Quieres que te ayude a desarrollar tu estilo personal?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations, activeConversation]);

  const handleNewChat = () => {
    const newId = conversations.length + 1;
    const newConversation = {
      id: newId,
      title: "Nueva conversación",
      timestamp: "Ahora",
      messages: []
    };
    setConversations([newConversation, ...conversations]);
    setActiveConversation(newId);
  };

  const handleSelectConversation = (id) => {
    setActiveConversation(id);
  };

  const handleSendMessage = async (message) => {
    if (!activeConversation) return;

    setIsLoading(true);
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: message,
      isUser: true
    };

    setConversations(prev => 
      prev.map(conv => 
        conv.id === activeConversation 
          ? { ...conv, messages: [...conv.messages, userMessage] }
          : conv
      )
    );

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        text: seductionResponses[Math.floor(Math.random() * seductionResponses.length)],
        isUser: false
      };

      setConversations(prev => 
        prev.map(conv => 
          conv.id === activeConversation 
            ? { 
                ...conv, 
                messages: [...conv.messages, aiMessage],
                title: conv.messages.length === 0 ? message.substring(0, 30) + "..." : conv.title
              }
            : conv
        )
      );
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const currentConversation = conversations.find(c => c.id === activeConversation);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        conversations={conversations}
        activeConversation={activeConversation}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">ChatSed AI</h2>
                <p className="text-sm text-gray-500">Experto en seducción • En línea</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          {currentConversation ? (
            <div className="max-w-4xl mx-auto">
              {currentConversation.messages.map((message) => (
                <Message 
                  key={message.id} 
                  message={message.text} 
                  isUser={message.isUser} 
                />
              ))}
              {isLoading && (
                <div className="flex gap-4 p-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-400 to-pink-400 flex items-center justify-center flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1621435662231-88086772befa" 
                      alt="AI Avatar" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <WelcomeScreen />
          )}
        </div>

        {/* Input Area */}
        {activeConversation && (
          <ChatInput 
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default ChatSed;