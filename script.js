    // DOM Elements
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const sidebarCollapseBtn = document.getElementById('sidebar-collapse-btn');
    const sidebar = document.querySelector('.sidebar');
    const newChatBtn = document.getElementById('new-chat-btn');
    const chatHistoryList = document.getElementById('chat-history-list');
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const clearChatBtn = document.getElementById('clear-chat-btn');
    const uploadFileBtn = document.getElementById('upload-file-btn');
    const micBtn = document.getElementById('mic-btn');
    const fileUploadModal = document.getElementById('file-upload-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const fileDropArea = document.getElementById('file-drop-area');
    const fileInput = document.getElementById('file-input');
    const fileSelected = document.getElementById('file-selected');
    const fileName = document.getElementById('file-name');
    const removeFileBtn = document.getElementById('remove-file-btn');
    const cancelUploadBtn = document.getElementById('cancel-upload-btn');
    const confirmUploadBtn = document.getElementById('confirm-upload-btn');
    
    // Educational Tools Elements
    const examHelperBtn = document.getElementById('exam-helper-btn');
    const examHelperPanel = document.getElementById('exam-helper-panel');
    const closeExamHelper = document.getElementById('close-exam-helper');
    const examSubject = document.getElementById('exam-subject');
    const examQuestionInput = document.getElementById('exam-question');
    const getAnswerBtn = document.getElementById('get-answer-btn');
    
    const flashcardBtn = document.getElementById('flashcard-btn');
    const flashcardPanel = document.getElementById('flashcard-panel');
    const closeFlashcard = document.getElementById('close-flashcard');
    const createFlashcardBtn = document.getElementById('create-flashcard-btn');
    const studyFlashcardBtn = document.getElementById('study-flashcard-btn');
    const flashcardCreateSection = document.getElementById('flashcard-create-section');
    const flashcardStudySection = document.getElementById('flashcard-study-section');
    const flashcardTerm = document.getElementById('flashcard-term');
    const flashcardDefinition = document.getElementById('flashcard-definition');
    const addFlashcardBtn = document.getElementById('add-flashcard-btn');
    const flashcardContainer = document.getElementById('flashcard-container');
    const flashcardFront = document.getElementById('flashcard-front');
    const flashcardBack = document.getElementById('flashcard-back');
    const prevFlashcardBtn = document.getElementById('prev-flashcard-btn');
    const nextFlashcardBtn = document.getElementById('next-flashcard-btn');
    const flashcardCount = document.getElementById('flashcard-count');
    
    const summaryBtn = document.getElementById('summary-btn');
    const summaryPanel = document.getElementById('summary-panel');
    const closeSummary = document.getElementById('close-summary');
    const summaryLength = document.getElementById('summary-length');
    const summaryText = document.getElementById('summary-text');
    const generateSummaryBtn = document.getElementById('generate-summary-btn');
    
    const grammarBtn = document.getElementById('grammar-btn');
    const grammarPanel = document.getElementById('grammar-panel');
    const closeGrammar = document.getElementById('close-grammar');
    const grammarText = document.getElementById('grammar-text');
    const checkGrammarBtn = document.getElementById('check-grammar-btn');
    
    const codeBtn = document.getElementById('code-btn');
    const codePanel = document.getElementById('code-panel');
    const closeCode = document.getElementById('close-code');
    const codeLanguage = document.getElementById('code-language');
    const codeInput = document.getElementById('code-input');
    const explainCodeBtn = document.getElementById('explain-code-btn');
    
    // State variables
    let activeToolPanel = null;
    let flashcards = JSON.parse(localStorage.getItem('Deepseek-flashcards')) || [];
    let currentFlashcardIndex = 0;
    let isRecording = false;
    let recognition;
    let currentChatId = null;
    let chats = JSON.parse(localStorage.getItem('Deepseek-chats')) || [];
    
    // Initialize the app
    function init() {
      // Load saved theme
      if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        themeToggleBtn.innerHTML = '<span class="material-symbols-rounded">dark_mode</span>';
      }
      
      // Load chat history
      loadChatHistory();
      
      // If no chats exist, create a default one
      if (chats.length === 0) {
        createNewChat();
      } else {
        // Load the most recent chat
        loadChat(chats[chats.length - 1].id);
      }
      
      // Initialize speech recognition if available
      initSpeechRecognition();
      
      // Add welcome message if it's a new chat
      if (chatMessages.children.length === 0) {
        addMessage("Hello! I'm Deepsek AI, your advanced learning assistant. How can I help you today?\n\nHere are some things I can do:\n- **Explain concepts** in simple terms\n- **Help with homework** and exam preparation\n- **Generate flashcards** for studying\n- **Check grammar** and improve writing\n- **Summarize long texts**\n- **Explain code** in multiple languages\n\nTry using the educational tools in the bottom right corner!", 'ai');
      }
    }
    
    // Theme Toggle
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      themeToggleBtn.innerHTML = isLight ? '<span class="material-symbols-rounded">dark_mode</span>' : '<span class="material-symbols-rounded">light_mode</span>';
    });
    
    // Sidebar Toggle for Mobile
    sidebarToggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
    
    // Sidebar Collapse
    sidebarCollapseBtn.addEventListener('click', () => {
      sidebar.classList.toggle('sidebar-collapsed');
      const isCollapsed = sidebar.classList.contains('sidebar-collapsed');
      sidebarCollapseBtn.innerHTML = isCollapsed ? 
        '<span class="material-symbols-rounded">chevron_right</span>' : 
        '<span class="material-symbols-rounded">chevron_left</span>';
    });
    
    // New Chat
    newChatBtn.addEventListener('click', createNewChat);
    
    function createNewChat() {
      const chatId = 'chat-' + Date.now();
      currentChatId = chatId;
      
      // Create chat object
      const newChat = {
        id: chatId,
        title: 'New Conversation',
        messages: [],
        createdAt: new Date().toISOString()
      };
      
      // Add to chats array
      chats.push(newChat);
      saveChats();
      
      // Update UI
      updateChatHistoryList();
      loadChat(chatId);
      
      // Add welcome message
      addMessage("Hello! I'm Deepsek AI, your advanced learning assistant. How can I help you today?", 'ai');
    }
    
    // Load chat history list
    function loadChatHistory() {
      chats = JSON.parse(localStorage.getItem('Deeseek-chats')) || [];
      updateChatHistoryList();
    }
    
    // Update chat history list in sidebar
    function updateChatHistoryList() {
      chatHistoryList.innerHTML = '';
      
      // Sort chats by creation date (newest first)
      chats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      chats.forEach(chat => {
        const chatItem = document.createElement('div');
        chatItem.className = `chat-item ${chat.id === currentChatId ? 'active' : ''}`;
        chatItem.dataset.chatId = chat.id;
        chatItem.innerHTML = `
          <span class="material-symbols-rounded chat-item-icon">forum</span>
          <span class="chat-item-text">${chat.title}</span>
        `;
        
        chatItem.addEventListener('click', () => {
          loadChat(chat.id);
        });
        
        chatHistoryList.appendChild(chatItem);
      });
    }
    
    // Load a specific chat
    function loadChat(chatId) {
      const chat = chats.find(c => c.id === chatId);
      if (!chat) return;
      
      currentChatId = chatId;
      
      // Update active chat in sidebar
      document.querySelectorAll('.chat-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.chatId === chatId) {
          item.classList.add('active');
        }
      });
      
      // Load messages
      chatMessages.innerHTML = '';
      chat.messages.forEach(msg => {
        addMessageToUI(msg.text, msg.sender, msg.timestamp, false);
      });
      
      // Scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Save all chats to localStorage
    function saveChats() {
      localStorage.setItem('Deepseek-chats', JSON.stringify(chats));
    }
    
    // Update chat title based on first user message
    function updateChatTitle(chatId, message) {
      const chat = chats.find(c => c.id === chatId);
      if (!chat || chat.title !== 'New Conversation') return;
      
      // Use first 30 characters of first user message as title
      const newTitle = message.length > 30 ? message.substring(0, 30) + '...' : message;
      chat.title = newTitle;
      saveChats();
      updateChatHistoryList();
    }
    
    // Auto-resize textarea
    messageInput.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
    
    // Send Message
    function sendMessage() {
      const message = messageInput.value.trim();
      if (!message) return;
      
      // Add user message to chat
      addMessage(message, 'user');
      messageInput.value = '';
      messageInput.style.height = 'auto';
      
      // Show typing indicator
      showTypingIndicator();
      
      // Process the message and generate response
      processUserMessage(message);
    }
    
    // Process user message and generate appropriate response
    function processUserMessage(message) {
      // In a real app, this would call your AI API
      setTimeout(() => {
        removeTypingIndicator();
        
        // Check for specific patterns in the message
        if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
          addMessage("Hello there! How can I assist you with your learning today?", 'ai');
        } 
        else if (message.toLowerCase().includes('thank')) {
          addMessage("You're welcome! Is there anything else you'd like help with?", 'ai');
        }
        else if (message.toLowerCase().includes('help') || message.toLowerCase().includes('assist')) {
          addMessage("I can help with:\n1. Explaining concepts\n2. Solving problems\n3. Creating study materials\n4. Checking grammar\n5. Summarizing texts\n6. Explaining code\n\nWhat would you like help with specifically?", 'ai');
        }
        else if (message.toLowerCase().includes('math') || message.toLowerCase().includes('calculate')) {
          // Simple math problem detection
          const mathRegex = /(\d+)\s*([+\-*/])\s*(\d+)/;
          const match = message.match(mathRegex);
          if (match) {
            const num1 = parseFloat(match[1]);
            const num2 = parseFloat(match[3]);
            const operator = match[2];
            let result;
            switch(operator) {
              case '+': result = num1 + num2; break;
              case '-': result = num1 - num2; break;
              case '*': result = num1 * num2; break;
              case '/': result = num1 / num2; break;
            }
            addMessage(`The result of ${num1} ${operator} ${num2} is **${result}**`, 'ai');
          } else {
            addMessage("I can help with math problems! Try asking something like 'What is 15 + 27?' or 'Solve 3x + 5 = 20'", 'ai');
          }
        }
        else if (message.toLowerCase().includes('define') || message.toLowerCase().includes('what is')) {
          // Simple definition lookup
          const term = message.split(' ').slice(1).join(' ');
          addMessage(`**${term}** is a term that refers to... (This is a simulated definition. In a real app, I would look up accurate definitions for you.)`, 'ai');
        }
        else {
          // Default response with markdown formatting
          const responses = [
            `I understand you're asking about **${message}**. Here's what I know:\n\nThis is a simulated response. In a real implementation, I would provide a detailed, accurate answer to your question.`,
            "That's an interesting question! Based on my knowledge:\n\n- First point about this topic\n- Second important aspect\n- Key consideration to remember",
            `Let me analyze your question about **${message.split(' ')[0]}**...\n\nHere's a structured response:\n\n1. Main concept\n2. Supporting details\n3. Practical applications\n4. Common misconceptions`,
            "I can help with that! Here's a summary of what you need to know:\n\n```\nKey points:\n- Point 1\n- Point 2\n- Point 3\n```"
          ];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          addMessage(randomResponse, 'ai');
        }
      }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
    }
    
    // Add message to chat and UI
    function addMessage(text, sender) {
      const now = new Date();
      const timestamp = now.toISOString();
      
      // Add to current chat
      const chat = chats.find(c => c.id === currentChatId);
      if (chat) {
        chat.messages.push({
          text: text,
          sender: sender,
          timestamp: timestamp
        });
        
        // Update chat title if it's the first user message
        if (sender === 'user' && chat.title === 'New Conversation') {
          updateChatTitle(chat.id, text);
        }
        
        saveChats();
      }
      
      // Add to UI
      addMessageToUI(text, sender, timestamp, true);
    }
    
    // Add message to UI only
    function addMessageToUI(text, sender, timestamp, scrollToBottom = true) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${sender === 'user' ? 'outgoing-message' : 'incoming-message'}`;
      
      const timeString = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      // Simple markdown parsing for bold, italics, lists, etc.
      const formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // italics
        .replace(/`(.*?)`/g, '<code>$1</code>') // inline code
        .replace(/^-\s(.*$)/gm, '<li>$1</li>') // unordered lists
        .replace(/^\d+\.\s(.*$)/gm, '<li>$1</li>') // ordered lists
        .replace(/\n/g, '<br>'); // line breaks
      
      messageDiv.innerHTML = `
        <div class="message-avatar">
          ${sender === 'user' ? 
            '<img src="icon/user.jpg" style="border-radius: 50%;" width = "50" height = "50" alt="User">' :
            '<img src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/fa5a6be4-8a16-4f40-ac9d-7e74aafbeecc/5bd37506-8d0b-482b-8b8f-1b779f0a0a97.png" style="border-radius: 50%;" width = "50" height = "50" alt="AI">'}
        </div>
        <div class="message-content">
          <div class="message-header">
            <div class="message-sender">${sender === 'user' ? 'You' : 'Deepseek AI'}</div>
            <div class="message-time">${timeString}</div>
          </div>
          <div class="message-text">${formattedText}</div>
          <div class="message-actions">
            <button class="action-btn" title="Copy" onclick="copyToClipboard(this)">
              <span class="material-symbols-rounded">content_copy</span>
            </button>
            <button class="action-btn" title="Like">
              <span class="material-symbols-rounded">thumb_up</span>
            </button>
          </div>
        </div>
      `;
      
      chatMessages.appendChild(messageDiv);
      if (scrollToBottom) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }
    
    // Show typing indicator
    function showTypingIndicator() {
      const typingIndicator = document.createElement('div');
      typingIndicator.className = 'typing-indicator';
      typingIndicator.id = 'typing-indicator';
      typingIndicator.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      `;
      chatMessages.appendChild(typingIndicator);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Remove typing indicator
    function removeTypingIndicator() {
      const indicator = document.getElementById('typing-indicator');
      if (indicator) {
        indicator.remove();
      }
    }
    
    // Copy text to clipboard
    function copyToClipboard(button) {
      const messageText = button.closest('.message-content').querySelector('.message-text').textContent;
      navigator.clipboard.writeText(messageText).then(() => {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<span class="material-symbols-rounded">check</span>';
        setTimeout(() => {
          button.innerHTML = originalHTML;
        }, 2000);
      });
    }
    
    // Event listeners for sending messages
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
    
    // Clear Chat
    clearChatBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear this chat?')) {
        chatMessages.innerHTML = '';
        const chat = chats.find(c => c.id === currentChatId);
        if (chat) {
          chat.messages = [];
          saveChats();
        }
      }
    });
    
    // File Upload Modal
    uploadFileBtn.addEventListener('click', () => {
      fileUploadModal.classList.add('active');
    });
    
    closeModalBtn.addEventListener('click', () => {
      fileUploadModal.classList.remove('active');
    });
    
    cancelUploadBtn.addEventListener('click', () => {
      fileUploadModal.classList.remove('active');
    });
    
    // File Drop Area
    fileDropArea.addEventListener('click', () => {
      fileInput.click();
    });
    
    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length) {
        const file = e.target.files[0];
        fileName.textContent = file.name;
        fileSelected.style.display = 'block';
      }
    });
    
    fileDropArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      fileDropArea.style.borderColor = 'var(--accent-color)';
    });
    
    fileDropArea.addEventListener('dragleave', () => {
      fileDropArea.style.borderColor = 'var(--secondary-text)';
    });
    
    fileDropArea.addEventListener('drop', (e) => {
      e.preventDefault();
      fileDropArea.style.borderColor = 'var(--secondary-text)';
      
      if (e.dataTransfer.files.length) {
        const file = e.dataTransfer.files[0];
        fileInput.files = e.dataTransfer.files;
        fileName.textContent = file.name;
        fileSelected.style.display = 'block';
      }
    });
    
    removeFileBtn.addEventListener('click', () => {
      fileInput.value = '';
      fileSelected.style.display = 'none';
    });
    
    confirmUploadBtn.addEventListener('click', () => {
      if (fileInput.files.length) {
        const file = fileInput.files[0];
        // Simulate file processing
        addMessage(`I've received your file: **${file.name}**. I can analyze PDFs, Word documents, and other text-based files to help you with your studies.`, 'ai');
        fileUploadModal.classList.remove('active');
        fileInput.value = '';
        fileSelected.style.display = 'none';
      } else {
        alert('Please select a file first.');
      }
    });
    
    // Initialize speech recognition
    function initSpeechRecognition() {
      try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        micBtn.addEventListener('click', toggleSpeechRecognition);
        
        recognition.onresult = (e) => {
          const transcript = e.results[0][0].transcript;
          messageInput.value = transcript;
          stopSpeechRecognition();
        };
        
        recognition.onerror = (e) => {
          console.error('Speech recognition error', e.error);
          stopSpeechRecognition();
        };
        
        recognition.onend = () => {
          if (isRecording) {
            recognition.start(); // Continue listening
          }
        };
      } catch (e) {
        console.error('Speech recognition not supported', e);
        micBtn.style.display = 'none';
      }
    }
    
    function toggleSpeechRecognition() {
      if (isRecording) {
        stopSpeechRecognition();
      } else {
        startSpeechRecognition();
      }
    }
    
    function startSpeechRecognition() {
      try {
        recognition.start();
        isRecording = true;
        micBtn.classList.add('recording');
        micBtn.innerHTML = '<span class="material-symbols-rounded">mic_off</span>';
        messageInput.placeholder = 'Listening...';
      } catch (e) {
        console.error('Speech recognition error:', e);
        stopSpeechRecognition();
      }
    }
    
    function stopSpeechRecognition() {
      isRecording = false;
      micBtn.classList.remove('recording');
      micBtn.innerHTML = '<span class="material-symbols-rounded">mic</span>';
      messageInput.placeholder = 'Message Deepsek AI...';
      try {
        recognition.stop();
      } catch (e) {
        console.error('Error stopping recognition:', e);
      }
    }
    
    // Educational Tools Functions
    
    // Exam Helper
    examHelperBtn.addEventListener('click', () => {
      toggleToolPanel(examHelperPanel, examHelperBtn);
    });
    
    closeExamHelper.addEventListener('click', () => {
      examHelperPanel.classList.remove('active');
      examHelperBtn.classList.remove('active');
      activeToolPanel = null;
    });
    
    getAnswerBtn.addEventListener('click', () => {
      const question = examQuestionInput.value.trim();
      const subject = examSubject.value;
      if (!question) return;
      
      // Show typing indicator in main chat
      showTypingIndicator();
      
      // Simulate getting an answer
      setTimeout(() => {
        removeTypingIndicator();
        
        const subjectTitles = {
          'general': 'General Knowledge',
          'math': 'Mathematics',
          'science': 'Science',
          'history': 'History',
          'english': 'English',
          'programming': 'Programming'
        };
        
        const responses = {
          'general': [
            `For general knowledge questions like "${question}", the answer typically involves...`,
            `The general consensus about "${question}" is...`,
            `When considering "${question}", important factors include...`
          ],
          'math': [
            `To solve this math problem:\n\n1. First step\n2. Second step\n3. Final solution\n\nAnswer: [simulated answer]`,
            `The mathematical approach to "${question}" involves...`,
            `This is a common math problem. The solution is...`
          ],
          'science': [
            `From a scientific perspective, "${question}" can be explained by...`,
            `The scientific principles involved in "${question}" are...`,
            `Science tells us that the answer to "${question}" is...`
          ],
          'history': [
            `Historically, "${question}" relates to...`,
            `The historical context for "${question}" is...`,
            `Important historical events related to "${question}" include...`
          ],
          'english': [
            `In English, "${question}" can be understood as...`,
            `The grammatical explanation for "${question}" is...`,
            `For literature questions like "${question}", key points are...`
          ],
          'programming': [
            `In programming, "${question}" is typically handled by...`,
            `The code solution for "${question}" would look like:\n\n\`\`\`javascript\n// Sample code\nfunction solution() {\n  return answer;\n}\n\`\`\``,
            `To address "${question}" in code, you would...`
          ]
        };
        
        const subjectResponses = responses[subject] || responses['general'];
        const randomResponse = subjectResponses[Math.floor(Math.random() * subjectResponses.length)];
        
        addMessage(`**${subjectTitles[subject]} Question:** ${question}\n\n**Answer:** ${randomResponse}`, 'ai');
        examQuestionInput.value = '';
        examHelperPanel.classList.remove('active');
        examHelperBtn.classList.remove('active');
        activeToolPanel = null;
      }, 2000);
    });
    
    // Flashcard Creator
    flashcardBtn.addEventListener('click', () => {
      toggleToolPanel(flashcardPanel, flashcardBtn);
    });
    
    closeFlashcard.addEventListener('click', () => {
      flashcardPanel.classList.remove('active');
      flashcardBtn.classList.remove('active');
      activeToolPanel = null;
    });
    
    createFlashcardBtn.addEventListener('click', () => {
      createFlashcardBtn.classList.add('active');
      studyFlashcardBtn.classList.remove('active');
      flashcardCreateSection.style.display = 'block';
      flashcardStudySection.style.display = 'none';
    });
    
    studyFlashcardBtn.addEventListener('click', () => {
      studyFlashcardBtn.classList.add('active');
      createFlashcardBtn.classList.remove('active');
      flashcardCreateSection.style.display = 'none';
      flashcardStudySection.style.display = 'block';
      loadFlashcardsForStudy();
    });
    
    addFlashcardBtn.addEventListener('click', () => {
      const term = flashcardTerm.value.trim();
      const definition = flashcardDefinition.value.trim();
      
      if (!term || !definition) {
        alert('Please enter both term and definition');
        return;
      }
      
      const newCard = {
        id: 'card-' + Date.now(),
        term: term,
        definition: definition,
        createdAt: new Date().toISOString()
      };
      
      flashcards.push(newCard);
      saveFlashcards();
      
      flashcardTerm.value = '';
      flashcardDefinition.value = '';
      
      alert('Flashcard added successfully!');
    });
    
    flashcardContainer.addEventListener('click', () => {
      flashcardContainer.classList.toggle('flipped');
    });
    
    prevFlashcardBtn.addEventListener('click', () => {
      if (flashcards.length === 0) return;
      currentFlashcardIndex = (currentFlashcardIndex - 1 + flashcards.length) % flashcards.length;
      showCurrentFlashcard();
    });
    
    nextFlashcardBtn.addEventListener('click', () => {
      if (flashcards.length === 0) return;
      currentFlashcardIndex = (currentFlashcardIndex + 1) % flashcards.length;
      showCurrentFlashcard();
    });
    
    function loadFlashcardsForStudy() {
      if (flashcards.length === 0) {
        flashcardFront.textContent = 'No flashcards available';
        flashcardBack.textContent = 'Create some flashcards first';
        flashcardCount.textContent = '0/0';
        return;
      }
      
      currentFlashcardIndex = 0;
      showCurrentFlashcard();
    }
    
    function showCurrentFlashcard() {
      if (flashcards.length === 0) return;
      
      const card = flashcards[currentFlashcardIndex];
      flashcardFront.textContent = card.term;
      flashcardBack.textContent = card.definition;
      flashcardCount.textContent = `${currentFlashcardIndex + 1}/${flashcards.length}`;
      
      // Reset flip state
      if (flashcardContainer.classList.contains('flipped')) {
        flashcardContainer.classList.remove('flipped');
      }
    }
    
    function saveFlashcards() {
      localStorage.setItem('bruno-flashcards', JSON.stringify(flashcards));
    }
    
    // Summary Generator
    summaryBtn.addEventListener('click', () => {
      toggleToolPanel(summaryPanel, summaryBtn);
    });
    
    closeSummary.addEventListener('click', () => {
      summaryPanel.classList.remove('active');
      summaryBtn.classList.remove('active');
      activeToolPanel = null;
    });
    
    generateSummaryBtn.addEventListener('click', () => {
      const text = summaryText.value.trim();
      const length = summaryLength.value;
      
      if (!text) {
        alert('Please enter some text to summarize');
        return;
      }
      
      // Show typing indicator in main chat
      showTypingIndicator();
      
      // Simulate summary generation
      setTimeout(() => {
        removeTypingIndicator();
        
        let summary;
        const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
        
        if (length === 'short' && sentences.length >= 2) {
          summary = sentences.slice(0, 2).join(' ');
        } 
        else if (length === 'medium' && sentences.length >= 3) {
          summary = sentences.slice(0, Math.min(5, sentences.length)).join(' ');
        }
        else {
          // For long or when not enough sentences, take first 1/3 of text
          summary = text.substring(0, Math.floor(text.length / 3)) + '...';
        }
        
        addMessage(`**Summary** (${length}):\n\n${summary}\n\n*This is a simulated summary. In a real app, I would use advanced NLP to generate more accurate summaries.*`, 'ai');
        summaryText.value = '';
        summaryPanel.classList.remove('active');
        summaryBtn.classList.remove('active');
        activeToolPanel = null;
      }, 2000);
    });
    
    // Grammar Checker
    grammarBtn.addEventListener('click', () => {
      toggleToolPanel(grammarPanel, grammarBtn);
    });
    
    closeGrammar.addEventListener('click', () => {
      grammarPanel.classList.remove('active');
      grammarBtn.classList.remove('active');
      activeToolPanel = null;
    });
    
    checkGrammarBtn.addEventListener('click', () => {
      const text = grammarText.value.trim();
      
      if (!text) {
        alert('Please enter some text to check');
        return;
      }
      
      // Show typing indicator in main chat
      showTypingIndicator();
      
      // Simulate grammar check
      setTimeout(() => {
        removeTypingIndicator();
        
        // Simple simulated grammar suggestions
        const suggestions = [
          "Consider revising this sentence for clarity.",
          "Watch out for subject-verb agreement.",
          "This phrase could be more concise.",
          "Check punctuation in this section.",
          "This word choice might be improved."
        ];
        
        const randomSuggestions = [];
        const numSuggestions = Math.min(3, Math.max(1, Math.floor(text.length / 50)));
        
        for (let i = 0; i < numSuggestions; i++) {
          randomSuggestions.push(suggestions[Math.floor(Math.random() * suggestions.length)]);
        }
        
        addMessage(`**Grammar Check Results:**\n\n- ${randomSuggestions.join('\n- ')}\n\n*This is a simulated check. In a real app, I would provide more detailed, accurate suggestions.*`, 'ai');
        grammarText.value = '';
        grammarPanel.classList.remove('active');
        grammarBtn.classList.remove('active');
        activeToolPanel = null;
      }, 2000);
    });
    
    // Code Explainer
    codeBtn.addEventListener('click', () => {
      toggleToolPanel(codePanel, codeBtn);
    });
    
    closeCode.addEventListener('click', () => {
      codePanel.classList.remove('active');
      codeBtn.classList.remove('active');
      activeToolPanel = null;
    });
    
    explainCodeBtn.addEventListener('click', () => {
      const code = codeInput.value.trim();
      const language = codeLanguage.value;
      
      if (!code) {
        alert('Please enter some code to explain');
        return;
      }
      
      // Show typing indicator in main chat
      showTypingIndicator();
      
      // Simulate code explanation
      setTimeout(() => {
        removeTypingIndicator();
        
        const languageNames = {
          'javascript': 'JavaScript',
          'python': 'Python',
          'java': 'Java',
          'csharp': 'C#',
          'php': 'PHP',
          'cpp': 'C++'
        };
        
        const explanations = [
          `This ${languageNames[language]} code appears to be doing the following:\n\n1. First part does X\n2. Second part handles Y\n3. The overall purpose seems to be Z`,
          `Here's a breakdown of the code:\n\n- Line 1: Initializes variables\n- Line 2-5: Contains a loop structure\n- Line 6-8: Handles the output\n\nThe code is an example of [common pattern] in ${languageNames[language]}.`,
          `The code you provided is a typical implementation of [concept] in ${languageNames[language]}.\n\nKey points:\n- It uses [feature]\n- The structure follows [pattern]\n- The expected output would be [result]`
        ];
        
        const randomExplanation = explanations[Math.floor(Math.random() * explanations.length)];
        
        addMessage(`**${languageNames[language]} Code Explanation:**\n\n\`\`\`${language}\n${code}\n\`\`\`\n\n${randomExplanation}`, 'ai');
        codeInput.value = '';
        codePanel.classList.remove('active');
        codeBtn.classList.remove('active');
        activeToolPanel = null;
      }, 2000);
    });
    
    // Toggle tool panels
    function toggleToolPanel(panel, button) {
      if (activeToolPanel === panel) {
        panel.classList.remove('active');
        button.classList.remove('active');
        activeToolPanel = null;
      } else {
        if (activeToolPanel) {
          activeToolPanel.classList.remove('active');
          document.querySelectorAll('.tool-btn-main').forEach(btn => btn.classList.remove('active'));
        }
        panel.classList.add('active');
        button.classList.add('active');
        activeToolPanel = panel;
      }
    }
    
    // Initialize the app
    init();