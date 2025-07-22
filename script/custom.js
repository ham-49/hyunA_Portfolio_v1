/* ########## intro ########## */
/* 선택자 */
let intro = document.querySelector(".intro");
let left = document.getElementById("sideLeft");
let right = document.getElementById("sideRight");
let introText = document.getElementById("introText");
let aboutMe = document.querySelector("#aboutMe");

/* 초기값 */
document.body.style.overflow = "hidden";

/* 좌우 슬라이드 나오기(접속 후 0.1초 후 실행) */
setTimeout(() => {
  left.classList.add("show");
  right.classList.add("show");
}, 100);

/* 텍스트 (슬라이드 이벤트 후 1.2초 후 실행) */
setTimeout(() => {
  introText.classList.add("show");
}, 1200);

/* 스크롤 이벤트 */
//스크롤 하게 되면 슬라이드 숨져지며 AboutMe 섹션으로 이동
setTimeout(() => {
  //처음 overflow 속성 제거
  document.body.style.overflow = "auto";

  // 모바일에서는 해당 스크립트 실행하지 않음
  if (window.innerWidth <= 768) return;

  let hasScrolled = false;

  const handleScroll = (e) => {
    const scrollY = window.scrollY;
    hasScrolled = true;

    // hide 처리
    introText.classList.remove("show");
    introText.classList.add("hide");

    left.classList.remove("show");
    left.classList.add("hide-left");

    right.classList.remove("show");
    right.classList.add("hide-right");

    // 스크롤 이동
    setTimeout(() => {
      window.scrollTo({
        top: aboutMe.offsetTop,
        behavior: "smooth",
      });
    }, 100);

    // 이벤트 제거
    window.removeEventListener("scroll", handleScroll);
  };

  window.addEventListener("scroll", handleScroll);
}, 1200);


/* 다시 인트로 섹션으로 가게 되면 인트로 페이지 보여주기 */
window.addEventListener("scroll", () => {
  let scrollY = window.scrollY;

  // 인트로 섹션 80% 지점보다 위에 있으면 다시 보여줌
  if (scrollY < intro.offsetHeight * 0.8) {
    // show 클래스 다시 추가
    left.classList.remove("hide-left");
    right.classList.remove("hide-right");
    introText.classList.remove("hide");
    left.classList.add("show");
    right.classList.add("show");
    introText.classList.add("show");
  }
});

window.addEventListener("scroll", () => {
  // 모바일 화면일 경우 이 함수 자체 실행 중단
  if (window.innerWidth <= 768) return;

  let scrollY = window.scrollY;

  // 인트로 섹션 80% 지점보다 위에 있으면 다시 보여줌
  if (scrollY < intro.offsetHeight * 0.8) {
    // show 클래스 다시 추가
    left.classList.remove("hide-left");
    right.classList.remove("hide-right");
    introText.classList.remove("hide");
    left.classList.add("show");
    right.classList.add("show");
    introText.classList.add("show");
  }
});


/* ########## nav ########## */

/* 선택자 */
let nav = document.querySelector(".nav");
let navItems = document.querySelectorAll(".nav-item");

/* 초기값 */
let navShown = false;

/* 섹션 배열 */
const sectionIds = ["aboutMe", "Skills", "portfolioHub", "epilogue"];
let sections = sectionIds.map(id => document.getElementById(id));

/* 스크롤 이벤트 */
// 기준 비율 조정
let scrollPointRatio = window.innerWidth <= 768 ? 0.3 : 0.4;

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    let rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight * scrollPointRatio && rect.bottom >= window.innerHeight * scrollPointRatio) {
      currentSection = section.id;
    }
  });

  let introBottom = intro.getBoundingClientRect().bottom;
  let aboutTop = document.getElementById("aboutMe").getBoundingClientRect().top;

  // 인트로 영역이 화면에 보이면 nav 숨기기
  if (introBottom > 0 && navShown) {
    nav.style.opacity = "0";
    navShown = false;
  } 
  // 인트로 영역 벗어나면 nav 보여주기
  else if (introBottom <= 0 && !navShown) {
    nav.style.opacity = "1";
    navShown = true;
  }

  // nav 색상 변경
  let skillsTop = document.getElementById("Skills").getBoundingClientRect().top;
  if (skillsTop <= window.innerHeight * scrollPointRatio) {
    nav.classList.add("changeNav");
  } else {
    nav.classList.remove("changeNav");
  }

  // active 클래스 처리
  navItems.forEach(item => {
    item.classList.remove("active");
    if (item.getAttribute("href") === `#${currentSection}`) {
      item.classList.add("active");
    }
  });
});



/* 클릭하면 해당 위치에 대한 active class 추가 */
navItems.forEach(item => {
  item.addEventListener("click", e => {
    navItems.forEach(i => i.classList.remove("active"));
    e.currentTarget.classList.add("active");
  });
});

/* ######## portfolio ######## */
const projectLists = [
  {
    title: "영화사이트",
    titleMain: "영화 사이트 프로젝트",
    titleSub: "TMDB API를 활용하여 다양한 데이터를 활용하여, <br> 영화에 대한 리뷰, 정보를 제공하는 사이트를 제작했습니다.",
    skills: ["VS Code", "react", "SCSS"],
    option: "solo",
    design: "Figma",
    impact: "100%",
    gitUrl: "https://github.com/ham-49/movie",
    pageUrl: "https://movie-306.netlify.app/",
    mainImg: "image/movie.png",
    subImg: "image/movie-responsive.png",
    popupInfo: "기획, 디자인, 웹 퍼플리싱 참여 (개인프로젝트)",
    mainList: ["메인페이지 전체"],
    SubList: ["메인페이지 전체"],
    /* plannerLink: , */
    designLink: "https://www.figma.com/design/9BUnz6DkhRflJLlbSQhCGa/movie?node-id=5-118&m=dev&t=VKhXr858lX1YK3nI-1"
  },
  /*{
    title: "정동야행",
    titleMain: "정동야행 클론코딩 프로젝트",
    titleSub: "다양한 Library를 활용하여 다양한 요소를 구현했고, <br>데스크탑 환경에 맞춰 서브페이지까지 제작했습니다.",
    skills: ["VS Code", "HTML5", "SCSS", "JavaScript"],
    option: "solo",
    design: "클론코딩",
    impact: "100%",
    gitUrl: "https://github.com/ham-49/jeongdong-culturenight",
    pageUrl: "https://ham-49.github.io/jeongdong-culturenight/",
    mainImg: "image/jeongdong.png",
    subImg: "",
    popupInfo: "기획, 웹 퍼플리싱 참여 (개인프로젝트)",
    mainList: ["메인페이지 전체(데스크탑)"],
    SubList: ["서브페이지 전체(데스크탑)"],
    /* plannerLink: , */
    designLink: "https://www.figma.com/design/WMhNsUUVMMMZGFUHK4mNig/%EC%A0%95%EB%8F%99%EC%95%BC%ED%96%89-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?node-id=0-1&m=dev&t=97Cz8x32XIjB8CQl-1"
  },*/
  {
    title: "날씨웹",
    titleMain: "날씨 웹 프로젝트",
    titleSub: "openweather API를 활용하여 실시간 날씨 정보를 보여주는 웹을 설계하였습니다.",
    skills: ["VS Code", "react", "CSS"],
    option: "solo",
    design: "Figma",
    impact: "100%",
    gitUrl: "https://github.com/ham-49/weather",
    pageUrl: "https://weather-49.netlify.app/",
    mainImg: "image/weather.png",
    subImg: "image/weather-responsive.png",
    popupInfo: "기획, 디자인, 웹 퍼플리싱 참여 (개인프로젝트)",
    mainList: ["메인페이지 전체"],
    SubList: ["서브페이지 X"],
    /* plannerLink: , */
    designLink: "https://www.figma.com/design/0vwPwwWuKwiQBdCc5w0c3P/%EB%82%A0%EC%94%A8API?node-id=0-1&m=dev&t=EdZxsXANRGDt2PTy-1"
  },
  {
    title: "노티드 도넛",
    titleMain: "노티드 일체형 페이지 리뉴얼",
    titleSub: "다양한 콘텐츠 배치로 브렌드의 가치를 살리며, <br> 방문자가 직관적으로 주요 기능을 이용할 수 있도록 설계하였습니다.",
    skills: ["VS Code", "HTML5", "SCSS", "JavaScript"],
    option: "team",
    design: "Figma",
    impact: "100%",
    gitUrl: "https://github.com/ham-49/Knotted",
    pageUrl: "https://ham-49.github.io/Knotted/",
    mainImg: "image/knotted.png",
    subImg: "image/knotted-responsive.png",
    popupInfo: "기획, 디자인, 웹 퍼플리싱 참여 (팀프로젝트)",
    mainList: ["신메뉴", "온라인샵", "공지사항"],
    SubList: ["온라인예매", "자주묻는 질문", "창업문의"],
    /* plannerLink: "https://github.com/ham-49/Knotted", */
    designLink: "https://www.figma.com/design/XptJ3xqQf0KaSSnmCPcYKM/%EB%85%B8%ED%8B%B0%EB%93%9C-%EB%8F%84%EB%84%9B-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?node-id=0-1&m=dev&t=vqZ8Ea5vsH88OqCj-1"
  },
  {
    title: "아쿠아리움",
    titleMain: "롯데 아쿠아리움 페이지 리뉴얼",
    titleSub: "아쿠아리움의 생동감을 시각적으로 구현하고, <br> 롯데 브랜드의 아이덴티티를 담아낸 리뉴얼 페이지를 설계했습니다.",
    skills: ["VS Code", "HTML5", "SCSS", "JavaScript"],
    option: "team",
    design: "Figma",
    impact: "100%",
    gitUrl: "https://github.com/ham-49/aquarium",
    pageUrl: "https://ham-49.github.io/aquarium/",
    mainImg: "image/aquarium.png",
    subImg: "image/aquarium-responsive.png",
    popupInfo: "기획, 디자인, 웹 퍼플리싱 참여 (팀프로젝트)",
    mainList: ["headerAPI, Date", "프로그램", "리뷰", "Footer"],
    SubList: ["설명프로그램", "체험프로그램", "교육프로그램"],
    plannerLink: "https://docs.google.com/presentation/d/1vTG0JJkd84qfz4xTqQhuSxXUBTXuoIO8ciO7UXdLdVc/edit?usp=sharing",
    designLink: "https://www.figma.com/file/cYRyXXyj2RU8S13r8s38OI/Plan-A?node-id=90-2"
  },
  {
    title: "인프런",
    titleMain: "인프런 페이지 리뉴얼",
    titleSub: "온라인 강의 플랫폼의 콘텐츠 다양성을 효과적으로 표현하기 위해,  <br> 다양한 레이아웃으로 구성하여 설계하였습니다.",
    skills: ["VS Code", "HTML5", "SCSS", "JavaScript"],
    option: "solo",
    design: "Figma",
    impact: "100%",
    gitUrl: "https://github.com/ham-49/inflearn",
    pageUrl: "https://ham-49.github.io/inflearn/",
    mainImg: "image/inflearn.png",
    subImg: "image/inflearn-responsive.png",
    popupInfo: "기획, 디자인, 웹 퍼플리싱 참여(개인 프로젝트)",
    mainList: ["메인페이지 전체"],
    SubList: ["전체 카테고리", "수강 상세페이지", "수강신청 장바구니", "회원가입"],
    /* plannerLink: "https://github.com/ham-49/inflearn",
    designLink: "https://github.com/ham-49/inflearn" */
  },
  {
    title: "한국 특허정보원",
    titleMain: "한국 특허정보원 페이지 리뉴얼",
    titleSub: "다양한 이용자가 쉽게 정보를 찾을 수 있도록 특허 관련 업무의 <br> 중요성을 전달할 수 있는 공공기관 사이트로 리뉴얼하고자 합니다.",
    skills: ["VS Code", "HTML5", "SCSS", "CSS", "JavaScript"],
    option: "solo",
    design: "Figma",
    impact: "100%",
    gitUrl: "https://github.com/ham-49/KIPI_Project",
    pageUrl: "https://ham-49.github.io/KIPI_Project/",
    mainImg: "image/kipi.png",
    subImg: "image/kipi-responsive.png",
    popupInfo: "기획, 디자인, 웹 퍼플리싱 참여 (개인 프로젝트)",
    mainList: ["메인페이지 전체"],
    SubList: ["채용정보", "입찰정보", "공지사항", "자주묻는질문", "온라인 민원창구"],
    plannerLink: "../pdf/한국특허정보원기획서.pdf",
    designLink: "https://www.figma.com/design/6VzlaNIbrZn0dT5HyDkdPq/%EA%B3%B5%EA%B3%B5%EA%B8%B0%EA%B4%80-%EB%A6%AC%EB%89%B4%EC%96%BC_%EB%AC%B8%ED%98%84%EC%95%84%EC%B5%9C%EC%A2%85?node-id=0-1&m=dev&t=JlCpuhwjiOc6J5Iu-1"
  }
];

/* 팝업에서 타켓이 되는 인덱스를 불러올 속성 (탭으로 불러온 프로젝트에 대한 인덱스를 불러와 팝업에 같은 인덱스 자료로 뿌려줄 용도) */
let projectListsWithIndex = projectLists.map((item, index) => ({
  ...item,
  originalIndex: index
}));

/* 선택자 */
let checkItem = document.querySelectorAll('.checkItem');
let container = document.getElementById('contentwrap');

/* tabs */
//합수 : 탭 리스트 렌더링 
function renderTabs(data) {
  let tabList = document.getElementById('tabList');
  tabList.innerHTML = '';
  data.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'tab-item';
    li.dataset.index = index;
    if (index === 0) li.classList.add('active');
    li.innerHTML = `<a href="#none">${item.title}</a>`;
    tabList.appendChild(li);
  });
}
//함수 : 탭 클릭 이벤트
function bindTabEvents(data) {
  let tabList = document.getElementById('tabList');
  //탭 클릭시 이벤트 (a태그 삭제 후 클릭된 애들만 보여주기)
  tabList.onclick = (e) => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      let li = e.target.parentElement;
      let index = li.dataset.index;
      renderProjects([data[index]]);
      let tabs = tabList.querySelectorAll('.tab-item');
      tabs.forEach(t => t.classList.remove('active'));
      li.classList.add('active');
    }
  };
}

/* content */
//함수 : 프로젝트 리스트 렌더링
function renderProjects(data) {
  container.innerHTML = '';
  data.forEach((list) => {
    /* left */
    let portfolioLeft = document.createElement('div');
    portfolioLeft.className = 'portfolio-left';
    portfolioLeft.innerHTML = `
      <div class="portfolio-title">
        <h4>${list.titleMain}</h4>
        <p>${list.titleSub}</p>
      </div>
      <div class="portfolio-info">
        <p>개발환경 : ${list.skills.map(skill => `<span>${skill}</span>`).join(', ')}</p>
        <p>디자인 설계 : <span>${list.design}</span></p>
        <p>기여도 : <span>${list.impact}</span></p>
      </div>
      <div class="portfolio-btn-wrap">
        <a href="#none" class="portfolio-btn popup" data-index="${list.originalIndex}">상세정보</a>
        <a href="${list.gitUrl}" class="portfolio-btn" target="_blank">Git Hub</a>
        <a href="${list.pageUrl}" class="portfolio-btn" target="_blank">완성 페이지</a>
      </div>
    `;
    container.appendChild(portfolioLeft);

    /* right */
    let portfolioRight = document.createElement('div');
    portfolioRight.className = 'portfolio-right';
    let monitorHTML = '';
    let phoneHTML = '';
    if (list.mainImg) {
      monitorHTML = `
        <div class="monitor">
          <img src="${list.mainImg}" alt="${list.title}">
        </div>
      `;
    }

    if (list.subImg) {
      phoneHTML = `
        <div class="phone">
          <img src="${list.subImg}" alt="${list.title}">
        </div>
      `;
    }

    portfolioRight.innerHTML = monitorHTML + phoneHTML;
    container.appendChild(portfolioRight);
  });
}

/* 필터링 */
//input 클릭 시, 필터링 후 내용 보여주기
function filterProjects() {
  // input 클릭된 데이터 값 수집 후 배열로 변환하여 저장
  const selected = Array.from(checkItem)
    .filter(cb => cb.checked)
    .map(cb => cb.value.toLowerCase());

  // 옵션과 스킬로 분류하기 위해 나눠서 배열 선언
  let OPTION_TYPES = ['solo', 'team'];
  let SKILL_TYPES = ['html5', 'css', 'scss', 'javascript', 'react'];

  //selected로 생성한 배열을 옵션과 스킬로 분류 해서 저장
  let selectedOptions = selected.filter(val => OPTION_TYPES.includes(val));
  let selectedSkills = selected.filter(val => SKILL_TYPES.includes(val));

  // 필터링 조건 (만족하는 조건에 대한 데이터만 추출)
  let filteredData = projectListsWithIndex.filter(({ option, skills }) => {
    let optionMatch = selectedOptions.length === 0 || selectedOptions.includes(option.toLowerCase());
    let normalizedSkills = skills.map(skill => skill.toLowerCase());
    let skillMatch = selectedSkills.length === 0 || selectedSkills.every(skill => normalizedSkills.includes(skill));
    return optionMatch && skillMatch;
  });

  // 필터링 된 데이터를 기준으로 다시 배열 렌더링 해서 content 생성
  renderTabs(filteredData);
  bindTabEvents(filteredData);
  renderProjects(filteredData.length > 0 ? [filteredData[0]] : []);
}

// 체크박스 필터링 연결
checkItem.forEach(cb => cb.addEventListener('change', filterProjects));

// 초기 렌더링
renderTabs(projectListsWithIndex);
bindTabEvents(projectListsWithIndex);
renderProjects([projectListsWithIndex[0]]);


/* popup */
let popup = document.getElementById('portfolioPopupWrap');

//팝업 열고 닫기 이벤트 
document.addEventListener('click', (e) => {
  let openBtn = e.target.closest('.portfolio-btn.popup[data-index]');
  let closeBtn = e.target.closest('.popup-close-btn');
  let isOutside = e.target === popup;

  if (openBtn) {
  e.preventDefault(); // data-index 있을 때만 작동
  let index = openBtn.dataset.index;
  renderPopup(projectLists[index]);
}

  if (closeBtn || isOutside) {
    popup.style.display = 'none';
    popup.innerHTML = '';
  }
});

// 함수 : popup 렌더링 함수
function renderPopup(data) {
  // plannerLink와 designLink가 존재할 경우에만 버튼 HTML 생성
  let plannerBtn = data.plannerLink
    ? `<a href="${data.plannerLink}" class="portfolio-btn popup planner" target="_blank">기획서 바로가기</a>`
    : '';
  let designBtn = data.designLink
    ? `<a href="${data.designLink}" class="portfolio-btn popup design" target="_blank">figma 바로가기</a>`
    : '';
  popup.innerHTML = `
    <div class="popup-close-btn">
      <i class="fa-solid fa-xmark"></i>
    </div>
    <div class="popup-content">
      <div class="popup-top-wrap">
        <div class="popup-img">
          <img src="${data.mainImg}" alt="${data.title}">
        </div>
      </div>
      <div class="popup-bottom-wrap">
        <div class="popup-title">참여영역</div>
        <div class="popup-info">${data.popupInfo}</div>
        <div class="popup-note-items">
          <div class="note-item" id="MainNote">
            <div class="note-title">메인페이지</div>
            <ul class="note-list">
              ${data.mainList.map(li => `<li>${li}</li>`).join('')}
            </ul>
          </div>
          <div class="note-item" id="SubNote">
            <div class="note-title">서브페이지</div>
            <ul class="note-list">
              ${data.SubList.map(li => `<li>${li}</li>`).join('')}
            </ul>
          </div>
        </div>
        <div class="popup-btns">
          ${plannerBtn}
          ${designBtn}
        </div>
      </div>
    </div>
  `;
  popup.style.display = 'block';
}
