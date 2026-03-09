// مصفوفة الأغاني (قاعدة البيانات الخاصة بك)
const allSongs = [
    { title: "خمسة سنين", lyrics: `خمسة سنين معاك يا زينة الأيام\nمرّت حِلوة زي أنسام...` },
    { title: "الجريدة", lyrics: `سارحة مالِك يا حبيبة\nبقرأ في عيونك حياتي...` },
    { title: "وعد النوار", lyrics: `ياريت من أول وريتنا إنك يمكن تتأخر يوم...` },
    { title: "يا حاسدين غرامنا", lyrics: `ياحاسدين غرامنا وياقاصدين خصامنا...` },
    { title: "همس الشوق", lyrics: `يا ريتنى لو أقدر أقول\nفيكِ الكلام الما أنكتب...` }
];

// وظيفة لعرض الأغاني
function renderSongs(data) {
    const container = document.getElementById('songsContainer');
    container.innerHTML = '';
    data.forEach(song => {
        const div = document.createElement('div');
        div.className = 'song-item';
        div.innerHTML = `<h3>${song.title}</h3>`;
        div.onclick = () => openModal(song);
        container.appendChild(div);
    });
}

function openModal(song) {
    document.getElementById('songTitle').innerText = song.title;
    document.getElementById('songLyrics').innerText = song.lyrics;
    document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

// نظام البحث
document.getElementById('myInput').addEventListener('keyup', function() {
    const text = this.value.toLowerCase();
    const filtered = allSongs.filter(s => s.title.includes(text));
    renderSongs(filtered);
});

// تشغيل الموقع عند التحميل
window.onload = () => renderSongs(allSongs);
