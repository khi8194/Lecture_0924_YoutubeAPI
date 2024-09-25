/*
절차지향 프로그래밍 : 코드를 시간의 흐름에 따라 위에서부터 아래로 쭉 나열한 방식
장점 : 코드의 복잡도가 크지 않은 로직은 코드 가독성이 좋음
단점1 : 코드의 복잡도가 올라갈수록 오히려 코드 가독성이 안좋아짐
단점2 : 특정 기능들이 미리 선언적 함수형태로 분리되어 있는 것이 아니기에 코드재활용 불가

//프로그래밍시 추상화의 필요성
추상화 : 기능을 독립적으로 모듈화시켜서 외부에 노출할 필요가 없는 정보값들을 숨기거나 코드의 재사용성을 높이는 방식
추상화를 위한 대표적인 프로그래밍 기법
객체지향 프로그래밍 (prototype) vs 함수를 프로그래밍 (Lexical scope의 Closure환경을 기반)  : 9일차 노션 체크
이벤트와 기능함수 분리
*/

/*
const api_key = "AIzaSyCKLA8E45lLrWn_7MlJL692LpwsZ9mwa_4";
const pid = "PL7dKBcBdt1leSwaAYMfi9B9GkbLK_A_oh";
const num = 10;

const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${pid}&key=${api_key}&maxResults=${num}`;

const frame = document.querySelector("section");

fetch(url)
	.then((data) => data.json())
	.then((json) => {
		const vidsData = json.items;
		let tags = "";

		vidsData.forEach((data) => {
			let title =
				data.snippet.title.length > 60
					? data.snippet.title.substring(0, 60) + "..."
					: data.snippet.title;

			let desc =
				data.snippet.description.length > 120
					? data.snippet.description.substring(0, 120) + "..."
					: data.snippet.description;

			let date = data.snippet.publishedAt.split("T")[0].split("-").join(".");

			tags += `
        <article>
				
          <h2 class='vidTitle' data-id=${data.snippet.resourceId.videoId}>${title}</h2>         
          
          <div class='txt'>
            <p>${desc}</p>
            <span>${date}</span>
          </div>

          <div class='pic'>
            <img src=${data.snippet.thumbnails.standard.url} alt=${data.snippet.title} />
          </div>

        </article>
      `;
		});
		frame.innerHTML = tags;
	});

document.body.addEventListener("click", (e) => {
	const vidId = e.target.getAttribute("data-id");

	if (e.target.className === "vidTitle") {
		const asideEl = document.createElement("aside");
		asideEl.innerHTML = `
      <div class='con'>
        <iframe src="http://www.youtube.com/embed/${vidId}" frameborder="0"></iframe>
      </div>
      <button class='btnClose'>close</button>
    `;
		document.body.append(asideEl);
	}
});

document.body.addEventListener("click", (e) => {
	if (e.target.className === "btnClose") {
		document.querySelector("aside").remove();
	}
});
*/

//Global Variables
const pid = "PL7dKBcBdt1leSwaAYMfi9B9GkbLK_A_oh";
const num = 10;

//Load Event binding
fetchYoutube(pid, num);

//Event Delegate
document.body.addEventListener("click", (e) => {
	e.target.className === "vidTitle" && createModal(e);
	e.target.className === "btnClose" && removeModal();
});

document.body.addEventListener("click", (e) => {
	if (e.target.className === "btnClose") {
		document.querySelector("aside").remove();
	}
});

//youtube data fetching
function fetchYoutube(pid, num) {
	const api_key = "AIzaSyCKLA8E45lLrWn_7MlJL692LpwsZ9mwa_4";

	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${pid}&key=${api_key}&maxResults=${num}`;

	fetch(url)
		.then((data) => data.json())
		.then((json) => {
			const vidsData = json.items;
			createList(vidsData);
		});
}

//createList
function createList(arr) {
	const frame = document.querySelector("section");
	let tags = "";

	//데이터 반복 돌면서 innerHTML='태그문자열'로 동적 돔 생성
	arr.forEach((data) => {
		let title =
			data.snippet.title.length > 60
				? data.snippet.title.substring(0, 60) + "..."
				: data.snippet.title;

		let desc =
			data.snippet.description.length > 120
				? data.snippet.description.substring(0, 120) + "..."
				: data.snippet.description;

		let date = data.snippet.publishedAt.split("T")[0].split("-").join(".");

		//h2요소에 data-id라는 커스텀 속성을 만들어서 유튜브 영상 id값 숨겨놓음
		tags += `
        <article>
          <h2 class='vidTitle' data-id=${data.snippet.resourceId.videoId}>${title}</h2>         
          
          </div>
        </article>
      `;
	});
	frame.innerHTML = tags;
}

//createModal
function createModal(e) {
	const vivId = e.target.getAttribute("data-id");
	const asideEl = document.createElement("aside");
	asideEl.innerHTML = `
      <div class='con'>
        <iframe src="http://www.youtube.com/embed/${vidId}" frameborder="0"></iframe>
      </div>
      <button class='btnClose'>close</button>
    `;
	document.body.append(asideEl);
}

//removeModal
function removeModal() {
	document.querySelector("aside").remove();
}
