document.addEventListener('DOMContentLoaded', function () {
  console.log("Page loaded!");  // Log when the page is fully loaded

  //
  // Set Author Data
  //
  // Fetch data from the JSON file
  //
  fetch('data/authorData.json')
    .then(response => response.json())
    .then(data => {
      // Get the elements for author and resume section
      const nameText = document.querySelector("#author-name");
      const titleText = document.querySelector("#author-title");
      const descriptionText = document.querySelector("#author-description");

      // Set data dynamically
      const author = data.author;

      // Author section
      nameText.textContent = author.name;
      titleText.textContent = author.title;
      descriptionText.textContent = author.description;
    })
    .catch(error => {
      console.error("Error fetching JSON data:", error);
    });

  //
  // Set Resume Data
  //
  // Fetch the resume data from the JSON file
  //
  fetch('data/resumeData.json')
    .then(response => response.json())
    .then(data => {
      const resume = data.resume;
      const resumeList = document.querySelector('#resume-list');

      // Loop through each section in the resume object
      for (const key in resume) {
        if (resume.hasOwnProperty(key)) {
          const section = resume[key];

          // Create a new list item for each section
          const listItem = document.createElement('li');
          listItem.classList.add('resume-section');

          // Create the section title
          const title = document.createElement('div');
          title.classList.add('text-lg', 'font-semibold', 'text-yellow-300');
          title.textContent = section.title;

          // Create the section content
          const content = document.createElement('div');
          content.classList.add('text-base', 'text-[#d1c6ea]');
          if (Array.isArray(section.content)) {
            content.textContent = section.content.join(", ");
          } else {
            content.textContent = section.content;
          }

          // Append title and content to the list item
          listItem.appendChild(title);
          listItem.appendChild(content);

          // Append the list item to the resume list
          resumeList.appendChild(listItem);
        }
      }
    })
    .catch(error => {
      console.error("Error fetching JSON data:", error);
    });

  // Set Blog Data
  //
  // Fetch blog data from the external JSON file (adjusted path)
  //
  fetch('data/blogs.json')
    .then(response => response.json())
    .then(blogs => {
      // Function to generate blog cards dynamically
      function generateBlogCards() {
        const container = document.getElementById("blogCardsContainer");

        // Clear the container before adding new blog cards
        container.innerHTML = '';

        blogs.forEach(blog => {
          const blogCard = document.createElement("div");
          blogCard.classList.add("bg-gradient-to-r", "from-purple-400", "to-purple-600", "p-6", "rounded-lg", "shadow-xl", "transform", "transition", "duration-500", "hover:scale-105", "cursor-pointer", "relative");

          const blogTitle = document.createElement("h3");
          blogTitle.classList.add("text-2xl", "font-extrabold", "text-white", "mb-4");
          blogTitle.textContent = blog.title;

          const blogDescription = document.createElement("p");
          blogDescription.classList.add("text-gray-200", "text-lg", "mb-6");
          blogDescription.textContent = blog.description;

          const readMoreLink = document.createElement("a");
          readMoreLink.classList.add("absolute", "bottom-4", "left-6", "text-yellow-300", "text-xl", "font-semibold", "hover:underline");
          readMoreLink.href = blog.link;
          readMoreLink.textContent = "Read More";

          // Create an anchor tag to wrap the whole card
          const cardLink = document.createElement("a");
          cardLink.href = blog.link;
          cardLink.target = "_blank"; // Open in a new tab
          cardLink.classList.add("block", "relative");

          // Append elements to the card link
          cardLink.appendChild(blogCard);
          blogCard.appendChild(blogTitle);
          blogCard.appendChild(blogDescription);
          blogCard.appendChild(readMoreLink);

          // Append the card link to the container
          container.appendChild(cardLink);
        });
      }


      // Call the function to generate the blog cards
      generateBlogCards();
    });



  //
  //
  //
  // Typing effect for the button
  //
  var i = 0;
  var txt = "Click to checkout my Medium page"; /* The text */
  var speed = 15; /* The speed/duration of the typing effect in milliseconds */

  var typingTextElement = document.getElementById("typingText");
  var buttonElement = document.getElementById("checkMyWorkButton");

  // Function to handle the typing effect
  function typeWriter() {
    if (i < txt.length) {
      typingTextElement.innerHTML += txt.charAt(i);
      i++;
      console.log(`Typing: ${typingTextElement.innerHTML}`); // Log each character typed
      setTimeout(typeWriter, speed);
    }
  }

  buttonElement.addEventListener('mouseenter', function (e) {
    console.log("Button hovered!"); // Log when button is hovered

    typingTextElement.style.opacity = 1;  // Make the text visible
    typingTextElement.innerHTML = '';    // Clear any previous content
    i = 0;  // Reset typing counter
    typeWriter(); // Start the typing effect
  });

  buttonElement.addEventListener('mouseleave', function (e) {
    console.log("Button left!"); // Log when button is left
    typingTextElement.style.opacity = 0;  // Hide the text when cursor leaves
    typingTextElement.innerHTML = '';    // Clear the text
  });

  document.addEventListener('DOMContentLoaded', () => {
    const lottiePlayer = document.getElementById('welcomeAnimation');

    // Start animation when the page loads
    if (lottiePlayer) {
      lottiePlayer.play(); // Play animation once
    }
  });


  //
  //
  //Add smooth scroll in page
  //
  //
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
});
