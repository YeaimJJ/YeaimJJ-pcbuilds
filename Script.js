// This script will be used for any interactive features, like loading the Instagram feed
document.addEventListener('DOMContentLoaded', function() {
    // Example: Load Instagram feed (you can replace this with actual API calls)
    const instagramFeed = document.querySelector('.instagram-feed');
    const posts = [
        { id: 1, image: 'assets/instagram-feed/post1.jpg' },
        { id: 2, image: 'assets/instagram-feed/post2.jpg' }
    ];

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `<img src="${post.image}" alt="Instagram Post ${post.id}">`;
        instagramFeed.appendChild(postElement);
    });
});