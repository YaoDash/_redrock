// 在页面加载完成后执行
window.onload = function() {
    // 发起网络请求
    fetch('http://121.36.209.69:3000/')
      .then(response => response.json())
      .then(data => {
        // 更新页面元素
        updateMusicCovers(data.musicCovers);
        updateLittleMusic(data.littleMusic);
        updateTrackInfo(data.track);
      })
      .catch(error => {
        // 处理请求错误
        console.error(error);
      });
  };
  
  // 更新音乐封面
  function updateMusicCovers(covers) {
    const musicCoversContainer = document.querySelector('.music-covers');
    musicCoversContainer.innerHTML = ''; 
  
    for (const cover of covers) {
      const coverElement = document.createElement('div');
      coverElement.classList.add('music-cover');
  
      const imgElement = document.createElement('img');
      imgElement.src = cover.imageUrl;
      imgElement.alt = cover.altText;
      coverElement.appendChild(imgElement);
  
      const playOverlayElement = document.createElement('div');
      playOverlayElement.classList.add('play-overlay');
  
      const playIconElement = document.createElement('i');
      playIconElement.classList.add('iconfont', 'icon-zanting1');
      playOverlayElement.appendChild(playIconElement);
  
      coverElement.appendChild(playOverlayElement);
      musicCoversContainer.appendChild(coverElement);
    }
  }
  
  // 更新精选歌曲
  function updateLittleMusic(songs) {
    const littleMusicContainer = document.querySelector('.littlemusic');
    littleMusicContainer.innerHTML = ''; // 清空容器
  
    for (const song of songs) {
      const songElement = document.createElement('div');
      songElement.classList.add('li1');
  
      const imgElement = document.createElement('img');
      imgElement.src = song.imageUrl;
      imgElement.alt = song.altText;
      songElement.appendChild(imgElement);
  
      const pElement = document.createElement('p');
      pElement.innerHTML = `${song.title}<br>${song.artist}`;
      songElement.appendChild(pElement);
  
      const playIconElement = document.createElement('i');
      playIconElement.classList.add('iconfont', 'icon-bofang');
      songElement.appendChild(playIconElement);
  
      littleMusicContainer.appendChild(songElement);
    }
  }
  
  // 更新当前播放曲目信息
  function updateTrackInfo(track) {
    const trackTitleElement = document.querySelector('.track-title');
    trackTitleElement.textContent = track.title;
  
    const artistElement = document.querySelector('.artist');
    artistElement.textContent = track.artist;
  }
// 播放器
document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.querySelector('.play-btn');
    const audioPlayer = document.getElementById('audioPlayer');

    playBtn.addEventListener('click', function() {
        const icon = playBtn.querySelector('i');

        if (audioPlayer.paused) {
            audioPlayer.play();
            icon.classList.remove('icon-bofang1');
            icon.classList.add('icon-zanting');
            playBtn.setAttribute('aria-label', '暂停');
        } else {
            audioPlayer.pause();
            icon.classList.remove('icon-zanting');
            icon.classList.add('icon-bofang1');
            playBtn.setAttribute('aria-label', '播放');
        }
    });
});
// 侧边栏

let startX;
let sidebar = document.querySelector('.sidebar');
let overlay = document.querySelector('.overlay');

document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('touchstart', handleTouchStart);
  document.addEventListener('touchmove', handleTouchMove);
  document.addEventListener('touchend', handleTouchEnd);
});

function handleTouchStart(event) {
  startX = event.touches[0].clientX;
}

function handleTouchMove(event) {
  if (startX) {
    let currentX = event.touches[0].clientX;
    let distance = currentX - startX;

    if (distance > 0) {
      sidebar.style.left = distance + 'px';
      overlay.style.display = 'block';
    }
  }
}

function handleTouchEnd() {
  if (startX) {
    let sidebarWidth = sidebar.offsetWidth;
    if (sidebar.style.left !== '-250px' && sidebar.style.left !== '') {
      sidebar.style.left = '0';
      overlay.classList.add('active');
    }
    startX = null;
  }
}

function toggleSidebar() {
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
}

function closeSidebar() {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
}