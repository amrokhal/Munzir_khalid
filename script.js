document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('lyrics-modal');
    const songsList = document.getElementById('songs-list');
    const searchInput = document.getElementById('search-input');
    const currentTitle = document.getElementById('current-title');
    const currentLyrics = document.getElementById('current-lyrics');
    
    let allSongs = [];

    fetch('songs.json')
        .then(response => response.json())
        .then(data => {
            allSongs = data;
            renderSongs(allSongs);
        })
        .catch(() => {
            songsList.innerHTML = `<div class="no-results">خطأ في تحميل البيانات.</div>`;
        });

    function renderSongs(songs) {
        songsList.innerHTML = '';
        if (songs.length === 0) {
            songsList.innerHTML = `<div class="no-results">لا توجد نتائج.</div>`;
            return;
        }
        songs.forEach(song => {
            const card = document.createElement('div');
            card.className = 'song-card';
            card.innerHTML = `<h3>${song.title}</h3><p style="color:var(--primary-color); opacity:0.7;">انقر للقراءة</p>`;
            card.onclick = () => openModal(song);
            songsList.appendChild(card);
        });
    }

    searchInput.oninput = (e) => {
        const term = e.target.value.trim().toLowerCase();
        const filtered = allSongs.filter(s => s.title.includes(term) || s.lyrics.includes(term));
        renderSongs(filtered);
    };

    function openModal(song) {
        currentTitle.innerText = song.title;
        currentLyrics.innerText = song.lyrics;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    window.closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    document.onkeydown = (e) => {
        if (e.key === 'Escape') closeModal();
    };
});
