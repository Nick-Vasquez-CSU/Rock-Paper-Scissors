// https://jsonplaceholder.typicode.com/guide/

async function downloadPosts (page) {
  const postsURL = `https://jsonplaceholder.typicode.com/posts?_page=${page}`
  const response = await fetch(postsURL)
  const articles = await response.json()
  return articles
}

async function downloadComments (postId) {
  const commentsURL = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  const response = await fetch(commentsURL)
  const comments = await response.json()
  return comments
}

async function getUserName (userId) {
  const userURL = `https://jsonplaceholder.typicode.com/users/${userId}`
  const response = await fetch(userURL)
  const user = await response.json()
  return user.name
}

function getArticleId (comments) {
  const article = comments.previousElementSibling
  const data = article.dataset
  return data.postId
}

const posts = await downloadPosts(2)
console.log(posts[0].userId)

const dDoc = document.querySelector("main")

for (const x in posts) {
  const article = document.createElement('article');
  article.setAttribute('data-post-id', posts[x].id)

  const h2 = document.createElement('h2');
  h2.textContent = posts[x].title;
  article.appendChild(h2);

  const aside = document.createElement('aside')
  const curUser = await getUserName(posts[x].userId)
  aside.innerHTML = "by <span class='author'>" + curUser + "</span>";
  article.appendChild(aside);

  const paragraph = document.createElement('p')
  posts[x].body = posts[x].body.replace(/(?:\r\n|\r|\n)/g, "<br>");
  paragraph.innerHTML = posts[x].body;
  article.appendChild(paragraph);

  const details = document.createElement('details');

  const summary = document.createElement('summary')
  summary.textContent = "See what our readers had to say...";
  details.appendChild(summary);

  const section = document.createElement('section');
  const header = document.createElement('header');
  const h3 = document.createElement('h3');
  h3.textContent = "Comments";

  details.addEventListener('toggle', async event => {
    if (details.open) {
      const asides = document.getElementsByTagName('aside')
      console.log(asides[0])
      const commentsWereDownloaded = asides.length > 0
      console.log(commentsWereDownloaded)
      if (commentsWereDownloaded) {
        const articleId = getArticleId(details)
        const downloadedComs = await downloadComments(articleId)
        for (const x in downloadedComs) {
          const newAsides = document.createElement('aside')
          const comParagraph = document.createElement('p')
          downloadedComs[x].body = downloadedComs[x].body.replace(/(?:\r\n|\r|\n)/g, "<br>");
          comParagraph.innerHTML = downloadedComs[x].body;
          const namParagraph = document.createElement('p')
          namParagraph.innerHTML = "<small>" + downloadedComs[x].name + "</small>";
          newAsides.appendChild(comParagraph)
          newAsides.appendChild(namParagraph)
          section.appendChild(newAsides)
        }
      }
    }
  })

  header.appendChild(h3);
  section.appendChild(header);
  details.appendChild(section);

  dDoc.appendChild(article)
  dDoc.appendChild(details)
}
