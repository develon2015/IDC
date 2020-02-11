#!/usr/bin/env node
const URL = 'https://www.reliablesite.net/dedicated-servers/';
const child_process = require('child_process');
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const express = require('express');
let result = {
    count: 0,
    availables: [],
}
function main() {
    console.log(`第${ ++result.count }次监控：`)
    child_process.execSync(`wget -O index.html '${URL}';`);
    const html = fs.readFileSync(`${__dirname}/index.html`).toString();

    const dom = new JSDOM(html);
    let list = dom.window.document.querySelectorAll('tbody tr.table_server--row td.table_server--col_actions div[aria-labelledby]')[9];
    list = list.getElementsByTagName('a');
    console.log(`当前有${list.length}个地区可用`);
    list = Array.from(list);
    list.forEach((e, i) => {
        console.log(i+1 + '. ' + e.innerHTML);
        if (e.innerHTML === 'Los Angeles, CA') {
            console.log('洛杉矶可用！');
        }
    });
    setTimeout(main, 8000);
}

const app = new express();
app.all('/', (req, res, next) => {
    res.redirect('/home.html');
});
app.get('/check', (req, res, next) => {
    //
    res.send(result);
});
app.use(express.static('./'));
app.listen(8081);

main();