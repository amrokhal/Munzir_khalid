const allSongs = [
    { title: "خمسة سنين", lyrics: "خمسة سنين معاك يا زينة الأيام\nيا نوّارة الحلوين مرّت حِلوة زي أنسام..." },
    { title: "الجريدة", lyrics: "سارحة مالِك يا حبيبة\nساهية وأفكارك بعيدة\nبقرأ في عيونك حياتي..." },
    { title: "وعد النوار", lyrics: "ياريت من أول وريتنا إنك يمكن تتأخر يوم..." },
    { title: "يا حاسدين غرامنا", lyrics: "ياحاسدين غرامنا وياقاصدين خصامنا..." },
    { title: "همس الشوق", lyrics: "يا ريتنى لو أقدر أقول\nفيكِ الكلام الما أنكتب..." }
];

function renderSongs(data) {
    const container = document.getElementById('songsContainer');
    if(!container) return;
    container.innerHTML = '';
    data.forEach(song => {
        const div = document.createElement('div');
        div.className = 'song-item';
        div.innerHTML = `<h3>${song.title}</h3><p style="color:#888;font-size:0.8rem">اضغط للتفاصيل</p>`;
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

document.getElementById('myInput').addEventListener('input', function() {
    const text = this.value.toLowerCase();
    const filtered = allSongs.filter(s => s.title.includes(text));
    renderSongs(filtered);
});

// تأكد من تحميل الصفحة قبل تشغيل الكود
window.addEventListener('DOMContentLoaded', () => renderSongs(allSongs));
