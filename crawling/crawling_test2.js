// puppeteer을 가져온다.
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const crawling = {};

crawling.page = "";

crawling.login = async () => {
    // 브라우저를 실행한다.
    // 옵션으로 headless모드를 끌 수 있다.
    const browser = await puppeteer.launch({
        headless: false
    });
    // const browser = await puppeteer.launch();

    // 새로운 페이지를 연다.
    const page = await browser.newPage();

    const daou_id = "";
    const daou_pw = "";

    // 페이지의 크기를 설정한다.
    await page.setViewport({
        width: 1366,
        height: 768
    });

    await page.goto('https://emfo.daouoffice.com/login');

    // 아이디랑 비밀번호 란에 값을 넣어라
    await page.evaluate((id, pw) => {
        document.querySelector('input[name="username"]').value = id;
        document.querySelector('input[name="password"]').value = pw;
    }, daou_id, daou_pw);

    // 로그인 버튼을 클릭해라
    await page.click('#login_submit');

    // 로그인 시도 5초 후
    await page.waitForTimeout(5000);

    // Skip 버튼 클릭
    await page.click('.welcome_skip');

    // 전역 변수에 page 정보 로드
    this.page = page;

    // const content = await page.content();

    // // $에 cheerio를 로드한다.
    // const $ = cheerio.load(content);

    // // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
    // const lists = $("#postList > li");

    // // 모든 리스트를 순환한다.
    // lists.each((index, list) => {

    //     // 각 리스트의 하위 노드중 호텔 이름에 해당하는 요소를 Selector로 가져와 텍스트값을 가져온다.
    //     const notice_title = $(list).find("div > p > a").text();
    //     const notice_content = $(list).find("div > p > a").attr("preview-data");

    //     // 인덱스와 함께 로그를 찍는다.
    //     console.log({
    //         index,
    //         notice_title,
    //         notice_content
    //     });
    // });

    // 브라우저를 종료한다.
    // await browser.close();
};

crawling.fetch = async () => {

    const content = await this.page.content();

    // $에 cheerio를 로드한다.
    const $ = cheerio.load(content);

    // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
    const lists = $("#postList > li");

    // 모든 리스트를 순환한다.
    lists.each((index, list) => {

        // 각 리스트의 하위 노드중 호텔 이름에 해당하는 요소를 Selector로 가져와 텍스트값을 가져온다.
        const notice_title = $(list).find("div > p > a").text();
        const notice_content = $(list).find("div > p > a").attr("preview-data");

        // 인덱스와 함께 로그를 찍는다.
        console.log({
            index,
            notice_title,
            notice_content
        });
    });
};

crawling.initialize = async () => {

    await crawling.login(); // 다우오피스 로그인 요청
    await crawling.fetch(); // 데이터 크롤링

}

crawling.initialize();