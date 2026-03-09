document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('lyrics-modal');

    fetch('songs.json')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('songs-list');
            
            data.forEach(song => {
                const card = document.createElement('div');
                card.className = 'song-card';
                card.innerHTML = `<h3>${song.title}</h3><p style="font-size: 0.9rem; margin-top:10px; opacity:0.6;">إضغط لعرض الكلمات</p>`;
                
                card.onclick = () => {
                    document.getElementById('current-title').innerText = song.title;
                    document.getElementById('current-lyrics').innerText = song.lyrics;
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // لمنع التمرير خلف النافذة
                };
                list.appendChild(card);
            });
        });

    // إغلاق النافذة عند الضغط خارجها
    window.onclick = (event) => {
        if (event.target == modal) closeModal();
    };
});

function closeModal() {
    document.getElementById('lyrics-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}
