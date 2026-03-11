// المتغيرات العامة
let allSongs = [];
const songsContainer = document.getElementById('songs-container');
const searchInput = document.getElementById('search-input');
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// 1. إعداد الوضع الليلي (Dark Mode)
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});

// 2. جلب البيانات من ملف JSON
async function fetchSongs() {
    try {
        const response = await fetch('songs.json');
        allSongs = await response.json();
        displaySongs(allSongs);
    } catch (error) {
        songsContainer.innerHTML = '<div class="no-results">حدث خطأ أثناء تحميل الأغاني. الرجاء المحاولة لاحقاً.</div>';
        console.error('Error fetching songs:', error);
    }
}

// 3. عرض الأغاني في الصفحة
function displaySongs(songs) {
    songsContainer.innerHTML = '';

    if (songs.length === 0) {
        songsContainer.innerHTML = '<div class="no-results"><i class="fas fa-frown"></i> لا توجد نتائج مطابقة لبحثك..</div>';
        return;
    }

    songs.forEach(song => {
        const songCard = document.createElement('div');
        songCard.classList.add('song-card');

        // بناء محتوى البطاقة
        songCard.innerHTML = `
            <h2 class="song-title">${song.title}</h2>
            <div class="song-meta">
                ${song.poet ? `<span><i class="fas fa-pen-nib"></i> الشاعر: ${song.poet}</span> | ` : ''}
                ${song.composer ? `<span><i class="fas fa-music"></i> الألحان: ${song.composer}</span>` : ''}
            </div>
            <div class="song-lyrics">${song.lyrics}</div>
            <div class="actions">
                <button class="btn btn-copy" onclick="copyLyrics(this, \`${song.lyrics}\`)">
                    <i class="fas fa-copy"></i> نسخ الكلمات
                </button>
                <button class="btn btn-share" onclick="shareSong('${song.title}')">
                    <i class="fas fa-share-alt"></i> مشاركة
                </button>
            </div>
        `;
        songsContainer.appendChild(songCard);
    });
}

// 4. وظيفة البحث (بالاسم والكلمات)
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    const filteredSongs = allSongs.filter(song => {
        return song.title.toLowerCase().includes(searchTerm) || 
               song.lyrics.toLowerCase().includes(searchTerm);
    });
    
    displaySongs(filteredSongs);
});

// 5. وظيفة نسخ الكلمات
function copyLyrics(buttonElement, text) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="fas fa-check"></i> تم النسخ!';
        setTimeout(() => {
            buttonElement.innerHTML = originalText;
        }, 2000);
    });
}

// 6. وظيفة المشاركة (تعمل على الجوالات والمتصفحات الداعمة)
function shareSong(title) {
    if (navigator.share) {
        navigator.share({
            title: `أغنية ${title} - محمد الأمين`,
            text: `اقرأ كلمات أغنية ${title} للفنان محمد الأمين على هذا الموقع:`,
            url: window.location.href
        }).catch(console.error);
    } else {
        alert("متصفحك لا يدعم خاصية المشاركة المباشرة، يمكنك نسخ الرابط من الأعلى.");
    }
}

// تشغيل الوظائف عند تحميل الصفحة
initTheme();
fetchSongs();
