/*
서버에서 실시간으로 외부 데이터를 내 웹 페이지 문서로 가져오는 방법

fetch('요청URL').then(data-> data.json()).then(json=>{
  //요청한 서버쪽으로부터 성공적으로 데이터를 전달받으면 json이라는 매개변수 데이터 확인 가능
  console.log(json);
});
*/

/*
QueryString : 기본 요청 URL 뒤에 문자열 형태로 옵션값을 달아서 서버에 요청하는 형태 
https://www.abc.com?pwd=1234&name=abc;
www.abc.com // 기본 요청 URL
?뒤에 있는 key=value값 문자열 형태로 지정한 추가 요청사항
요청사항이 여러개일때는 &로 구분
*/

// console.log("youtube");
const api_key = "AIzaSyCKLA8E45lLrWn_7MlJL692LpwsZ9mwa_4";
const pid = "PL7dKBcBdt1leSwaAYMfi9B9GkbLK_A_oh";
const num = 10;

const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${pid}&key=${api_key}&maxResults=${num}`;

const frame = document.querySelector("section");

//유튜브 데이터를 가져와서 동적으로 리스트 출력
fetch(url)
	.then((data) => data.json())
	.then((json) => {
		const vidsData = json.items;
		// // console.log(json);
		// console.log(vidsData);
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
          <h2 class='vidTitle'>${title}</h2>

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
		// console.log(tags);
		frame.innerHTML = tags;
	});

// 자바스크립트로 동적으로 생성된 요소는 일반적인 방법으로는 이벤트 연결이 불가
// 동적인 요소가 만들어지는 위치가 fetch함수의 then구문안쪽인데 그 밖에서는 동적인 요소 선택 불가
// 제일 간단한 해결 방법 : 동적생성 요소 찾는 구문을 돔을 생성하는 코드 블록 안쪽에서 호출
// 위의 방법의 단점 : fetch 함수 코드블록 안족에 또 다시 복잡한 이벤트 연결로직을 작성해야 되기 때문에 코드의 복잡도 증가
// 기능별로 코드 분리가 불가능
// 위와 같은 이유로 부득이하게 동적인 요소의 이벤트 연결을 fetch함수 밖에서 연결하는 경우가 많음
// 이벤트 위임: 지금 당장은 없는 DOM요소에 이벤트를 전달하기 위해서 항상 존재하는 요소에 이벤트를 맡겨서
// 추후 동적요소가 생성완료되면 그때 이벤트를 대신 전달해주는 방식

// 이벤트 위임: 항상 존재하는 body요소에 일단은 이벤트를 맡겼다가 동적요소가 생성완료되면 body가 대신 이벤트 전달

document.body.addEventListener("click", function (e) {
	// console.log(e.target);
	console.dir(e.target);

	//body 전체에 이벤트를 연결한 뒤 이벤트를 발생한 실제대상을 조건문으로 분기처리해서
	//조건에 부합될때에만 원하는 구문 연결(이처럼 번거로운 작업을 처리하지 않기 위해서 리액트같은 프레임웍, 라이브러리 //를 사용)
	if ((e.target.className = "vidTitle")) {
		console.log("you clicked VidTitle");
	}
});
