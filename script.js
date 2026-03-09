document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('lyrics-modal');

    fetch('songs.json')
        .then(response => {
            if (!response.ok) throw new Error();
            return response.json();
        })
        .then(data => {
            const list = document.getElementById('songs-list');
            data.forEach(song => {
                const card = document.createElement('div');
                card.className = 'song-card';
                card.innerHTML = `<h3>${song.title}</h3><p style="opacity:0.5; font-size:0.8rem;">انقر للقراءة</p>`;
                card.onclick = () => {
                    document.getElementById('current-title').innerText = song.title;
                    document.getElementById('current-lyrics').innerText = song.lyrics;
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                };
                list.appendChild(card);
            });
        })
        .catch(() => {
            document.getElementById('songs-list').innerHTML = "<p>خطأ في تحميل البيانات.</p>";
        });

    window.onclick = (event) => {
        if (event.target == modal) closeModal();
    };
});

function closeModal() {
    document.getElementById('lyrics-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}
