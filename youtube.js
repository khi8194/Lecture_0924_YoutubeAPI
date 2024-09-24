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

console.log("youtube");
const api_key = "AIzaSyCKLA8E45lLrWn_7MlJL692LpwsZ9mwa_4";
const pid = "PL7dKBcBdt1leSwaAYMfi9B9GkbLK_A_oh";
const num = 10;

const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${pid}&key=${api_key}&maxResults=${num}`;

const frame = document.querySelector("section");

fetch(url)
	.then((data) => data.json())
	.then((json) => {
		const vidsData = json.items;
		// console.log(json);
		console.log(vidsData);
		let tags = "";

		vidsData.forEach((data) => {
			tags += `
      <article>
        <h2>${data.snippet.title}</h2>
      </article>
      `;
		});
		console.log(tags);
		frame.innerHTML = tags;
	});
