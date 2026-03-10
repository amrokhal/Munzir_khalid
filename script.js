// المتغيرات العامة
let allSongs = [];
const listView = document.getElementById('list-view');
const lyricsView = document.getElementById('lyrics-view');
const songsGrid = document.getElementById('songs-grid');
const searchInput = document.getElementById('search-input');
const noResults = document.getElementById('no-results');
const songTitleEl = document.getElementById('song-title');
const songLyricsEl = document.getElementById('song-lyrics');
const backBtn = document.getElementById('back-btn');
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// إعداد المظهر (Dark/Light Mode)
function setupTheme() {
    // التحقق من التفضيلات السابقة للمستخدم أو نظام التشغيل
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        themeIcon.textContent = '☀️';
    } else {
        document.documentElement.classList.remove('dark');
        themeIcon.textContent = '🌙';
    }

    // زر تبديل المظهر
    themeToggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        if (document.documentElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.textContent = '🌙';
        }
    });
}

// جلب الأغاني من ملف JSON
async function fetchSongs() {
    try {
        const response = await fetch('songs.json');
        if (!response.ok) throw new Error('فشل في جلب البيانات');
        
        allSongs = await response.json();
        renderSongs(allSongs);
    } catch (error) {
        console.error("خطأ:", error);
        songsGrid.innerHTML = '<p class="text-red-500 text-center col-span-full">حدث خطأ أثناء تحميل الأغاني. تأكد من تشغيل المشروع عبر سيرفر محلي (Live Server).</p>';
    }
}

// عرض قائمة الأغاني
function renderSongs(songs) {
    songsGrid.innerHTML = '';
    
    if (songs.length === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
        
        songs.forEach((song, index) => {
            const card = document.createElement('div');
            card.className = 'bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md hover:border-primary dark:hover:border-primary transition-all duration-200 transform hover:-translate-y-1';
            
            // أيقونة بسيطة موسيقية + اسم الأغنية
            card.innerHTML = `
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-primary">
                        🎵
                    </div>
                    <h3 class="text-xl font-bold">${song.title}</h3>
                </div>
            `;
            
            // إضافة حدث الضغط لفتح الكلمات
            card.addEventListener('click', () => showLyrics(song));
            songsGrid.appendChild(card);
        });
    }
}

// وظيفة البحث
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    const filteredSongs = allSongs.filter(song => 
        song.title.toLowerCase().includes(searchTerm) || 
        song.lyrics.toLowerCase().includes(searchTerm)
    );
    renderSongs(filteredSongs);
});

// عرض كلمات الأغنية
function showLyrics(song) {
    songTitleEl.textContent = song.title;
    songLyricsEl.textContent = song.lyrics;
    
    // إخفاء القائمة وإظهار الكلمات
    listView.classList.add('hidden');
    lyricsView.classList.remove('hidden');
    
    // التمرير لأعلى الصفحة
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// العودة للقائمة
backBtn.addEventListener('click', () => {
    lyricsView.classList.add('hidden');
    listView.classList.remove('hidden');
    searchInput.value = ''; // تصفير البحث
    renderSongs(allSongs); // إعادة عرض كل الأغاني
});

// تهيئة الموقع عند التحميل
document.addEventListener('DOMContentLoaded', () => {
    setupTheme();
    fetchSongs();
});
