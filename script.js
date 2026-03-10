let allSongs = [];

// جلب الأغاني
async function fetchSongs() {
    try {
        const response = await fetch('songs.json');
        if (!response.ok) throw new Error('Network error');
        allSongs = await response.json();
        renderSongs(allSongs);
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('songs-grid').innerHTML = '<p class="text-danger text-center">خطأ في تحميل الأغاني. تأكد من وجود ملف songs.json</p>';
    }
}

// عرض الأغاني
function renderSongs(songs) {
    const grid = document.getElementById('songs-grid');
    const noRes = document.getElementById('no-results');
    grid.innerHTML = '';
    
    if (songs.length === 0) {
        noRes.classList.remove('hidden');
    } else {
        noRes.classList.add('hidden');
        songs.forEach((song) => {
            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4';
            card.innerHTML = `
                <div class="card song-card shadow-sm p-3 h-100 bg-white dark-card">
                    <div class="card-body text-center">
                        <h5 class="card-title fw-bold">${song.title}</h5>
                        <button class="btn btn-sm btn-success mt-2">عرض الكلمات</button>
                    </div>
                </div>
            `;
            card.onclick = () => showLyrics(song);
            grid.appendChild(card);
        });
    }
}

// عرض الكلمات
function showLyrics(song) {
    document.getElementById('song-title').textContent = song.title;
    document.getElementById('song-lyrics').textContent = song.lyrics;
    document.getElementById('list-view').classList.add('hidden');
    document.getElementById('lyrics-view').classList.remove('hidden');
    window.scrollTo(0,0);
}

// العودة
document.getElementById('back-btn').onclick = () => {
    document.getElementById('lyrics-view').classList.add('hidden');
    document.getElementById('list-view').classList.remove('hidden');
};

// البحث
document.getElementById('search-input').oninput = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allSongs.filter(s => s.title.includes(term) || s.lyrics.includes(term));
    renderSongs(filtered);
};

// تشغيل
fetchSongs();
