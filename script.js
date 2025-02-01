document.addEventListener('DOMContentLoaded', function () {
  console.log("Page loaded!");

  let knowledgeBase = [];

  // Fetch the knowledge base from JSON
  fetch('data/knowledge.json')
    .then(response => response.json())
    .then(data => {
      knowledgeBase = data;
      populateQuestionsDropdown(); // Populate dropdown after loading data
    })
    .catch(error => console.error("Error loading knowledge base:", error));

  // DOM Elements
  const aiInput = document.getElementById('ai-input');
  const aiSearch = document.getElementById('ai-search');
  const aiClear = document.getElementById('ai-clear');
  const aiQuestionsDropdown = document.getElementById('ai-questions-dropdown');
  const aiQuestionsList = document.getElementById('ai-questions-list');
  const aiResponse = document.getElementById('ai-response');
  const aiAnswer = document.getElementById('ai-answer');

  let typingInterval = null;
  let currentAnimationFrame = null;

  function handleInputChange() {
    const hasText = aiInput.value.trim() !== '';
    aiClear.style.opacity = hasText ? '1' : '0';
    aiClear.style.visibility = hasText ? 'visible' : 'hidden';
  }

  handleInputChange();

  aiInput.addEventListener('input', function () {
    handleInputChange();
    if (this.value.trim() === '') {
      aiResponse.classList.add('hidden');
    }
  });

  aiInput.addEventListener('focus', function () {
    aiQuestionsDropdown.classList.remove('hidden');
    populateQuestionsDropdown();
  });

  document.addEventListener('click', function (event) {
    const isInput = event.target === aiInput;
    const isDropdown = aiQuestionsDropdown.contains(event.target);
    const isSearchButton = event.target === aiSearch || aiSearch.contains(event.target);
    const isClearButton = event.target === aiClear || aiClear.contains(event.target);

    if (!isInput && !isDropdown && !isSearchButton && !isClearButton) {
      aiQuestionsDropdown.classList.add('hidden');
    }
  });

  function populateQuestionsDropdown() {
    aiQuestionsList.innerHTML = '';
    knowledgeBase.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'px-4 py-2 hover:bg-gray-700 cursor-pointer text-gray-300';
      li.textContent = item.question;
      li.addEventListener('click', function () {
        aiInput.value = item.question;
        aiQuestionsDropdown.classList.add('hidden');
        handleInputChange();
        showAnswer(item.answer);
      });
      aiQuestionsList.appendChild(li);
    });
  }

  function showAnswer(answer) {
    if (typingInterval) clearInterval(typingInterval);
    if (currentAnimationFrame) cancelAnimationFrame(currentAnimationFrame);

    aiAnswer.textContent = '';
    aiResponse.classList.remove('hidden');

    let index = 0;
    const typingSpeed = 30;
    const cursor = document.createElement('span');
    cursor.className = 'cursor-blink';
    cursor.textContent = '|';

    aiAnswer.appendChild(cursor);

    function typeCharacter() {
      if (index < answer.length) {
        aiAnswer.textContent = answer.substring(0, index + 1);
        aiAnswer.appendChild(cursor);
        index++;
        currentAnimationFrame = requestAnimationFrame(() => {
          typingInterval = setTimeout(typeCharacter, typingSpeed);
        });
      } else {
        cursor.remove();
      }
    }

    typeCharacter();
  }

  aiClear.addEventListener('click', function () {
    aiInput.value = '';
    aiResponse.classList.add('hidden');
    if (typingInterval) clearInterval(typingInterval);
    if (currentAnimationFrame) cancelAnimationFrame(currentAnimationFrame);
    handleInputChange();
  });

  aiSearch.addEventListener('click', function () {
    const query = aiInput.value.trim().toLowerCase();
    const matchedQuestion = knowledgeBase.find(item =>
      item.question.toLowerCase().includes(query)
    );

    if (matchedQuestion) {
      showAnswer(matchedQuestion.answer);
    } else {
      showAnswer("Sorry, I couldn't find an answer to that question. Try selecting a question from the dropdown!");
    }
  });
});
