document.addEventListener('DOMContentLoaded', function () {
  console.log("Page loaded!");

  // Fetch and set author data
  fetch('data/authorData.json')
    .then(response => response.json())
    .then(data => {
      const { name, title } = data.author;
      document.querySelector("#author-name").textContent = name;
      document.querySelector("#author-title").textContent = title;
    })
    .catch(error => console.error("Error fetching author data:", error));

  // Fetch and generate blog cards
  fetch('data/blogs.json')
    .then(response => response.json())
    .then(blogs => {
      const container = document.getElementById("blogCardsContainer");
      container.innerHTML = ''; // Clear previous content

      blogs.forEach(blog => {
        const cardLink = document.createElement("a");
        cardLink.href = blog.link;
        cardLink.target = "_blank";
        cardLink.classList.add("block", "relative");

        const blogCard = document.createElement("div");
        blogCard.classList.add(
          "bg-gradient-to-r", "from-purple-800", "to-purple-700", "p-6",
          "rounded-lg", "shadow-xl", "transform", "transition", "duration-500",
          "hover:scale-105", "cursor-pointer", "relative"
        );

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

        blogCard.append(blogTitle, blogDescription, readMoreLink);
        cardLink.appendChild(blogCard);
        container.appendChild(cardLink);
      });
    })
    .catch(error => console.error("Error fetching blog data:", error));

  // Fetch data from the JSON file
  fetch('data/experienceContent.json')
    .then(response => response.json())
    .then(data => {
      // Education data
      const educationDetails = document.getElementById('education-details');
      data.education.forEach(item => {
        const div = document.createElement('div');

        const h3 = document.createElement('h3');
        h3.classList.add('font-semibold', 'text-xl', 'text-yellow-300');
        h3.textContent = `${item.institution} | ${item.date}`;

        const p1 = document.createElement('p');
        p1.textContent = item.degree;

        const p2 = document.createElement('p');
        p2.classList.add('text-gray-200');
        p2.textContent = `Relevant Coursework: ${item.coursework.join(', ')}`;

        div.appendChild(h3);
        div.appendChild(p1);
        div.appendChild(p2);
        educationDetails.appendChild(div);
      });

      // Technical Skills data
      const skillsDetails = document.getElementById('skills-details');
      Object.keys(data.skills).forEach(category => {
        const div = document.createElement('div');

        const h3 = document.createElement('h3');
        h3.classList.add('font-semibold', 'text-xl', 'text-yellow-300');
        h3.textContent = category;

        const ul = document.createElement('ul');
        data.skills[category].forEach(skill => {
          const li = document.createElement('li');
          li.textContent = skill;
          ul.appendChild(li);
        });

        div.appendChild(h3);
        div.appendChild(ul);
        skillsDetails.appendChild(div);
      });

      // Experience data
      const experienceDetails = document.getElementById('experience-details');
      data.experience.forEach(item => {
        const div = document.createElement('div');

        const h3 = document.createElement('h3');
        h3.classList.add('text-2xl', 'font-semibold', 'text-yellow-300');
        h3.textContent = `${item.role}, ${item.company} | ${item.date}`;

        const ul = document.createElement('ul');
        item.responsibilities.forEach(responsibility => {
          const li = document.createElement('li');
          li.textContent = responsibility;
          ul.appendChild(li);
        });

        div.appendChild(h3);
        div.appendChild(ul);
        experienceDetails.appendChild(div);
      });

      // Projects data
      const projectsDetails = document.getElementById('projects-details');
      if (data.projects && Array.isArray(data.projects)) {
        data.projects.forEach(item => {
          const div = document.createElement('div');
          div.classList.add('bg-gray-900', 'p-6', 'rounded-xl', 'hover:bg-purple-900/20', 'transition-all');

          const h3 = document.createElement('h3');
          h3.classList.add('text-xl', 'font-semibold');
          h3.textContent = item.title;

          const p = document.createElement('p');
          p.classList.add('text-gray-400', 'mt-2');
          p.textContent = item.description;

          const skillDiv = document.createElement('div');
          skillDiv.classList.add('mt-4', 'flex', 'gap-2');
          item.skills.forEach(skill => {
            const skillBubble = document.createElement('span');
            skillBubble.classList.add('skill-bubble');
            skillBubble.textContent = skill;
            skillDiv.appendChild(skillBubble);
          });

          div.appendChild(h3);
          div.appendChild(p);
          div.appendChild(skillDiv);

          projectsDetails.appendChild(div);
        });
      }

      // Achievements data
      const achievementsList = document.getElementById('achievements-list');
      data.achievements.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        achievementsList.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});