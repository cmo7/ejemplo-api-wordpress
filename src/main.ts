import { getAllPosts, getPost, createPost, deletePost } from './lib/wordpress';

const postList = document.getElementById('post-list');
const postTitle = document.getElementById('post-title');
const postContent = document.getElementById('post-content');

const refreshPostList = async (): Promise<void> => {
  const posts = await getAllPosts();

  if (postList) {
    postList.innerHTML = posts.map(p => {
      return `
      <li id="post-${p.id}">
        <div class="post-title-element">
        ${p.title.rendered}
        </div>
        <button class="view-button" data-post-id="${p.id}">Ver</button>
        <button class="delete-button" data-post-id="${p.id}">Borrar</button>
      </li>`
    }).join('\n');
  }

  const viewButtons = document.querySelectorAll('.view-button');
  const deleteButtons = document.querySelectorAll('.delete-button');

  viewButtons.forEach(b => {
    b.addEventListener('click', async () => {
      const postId = parseInt(b.getAttribute('data-post-id') || '');
      const post = await getPost(postId);
      if (postTitle) {
        postTitle.innerHTML = post.title.rendered;
      }
      if (postContent) {
        postContent.innerHTML = post.content.rendered;
      }
    })
  })

  deleteButtons.forEach(b => {
    b.addEventListener('click', async () => {
      const postId = parseInt(b.getAttribute('data-post-id') || '');
      deletePost(postId);
      refreshPostList();
    })
  })
}
refreshPostList();