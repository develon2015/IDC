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
    try {
	    const filename = `${ __dirname }/index.html`;
	    child_process.execSync(`rm -rf ${ filename } && wget -O ${ filename } '${URL}';`);
    } catch(e) {
	    console.log('wget error');
    }
    const html = fs.readFileSync(`${__dirname}/index.html`).toString();
    if (html.trim() === '') {
	    console.log('next');
    }

    const dom = new JSDOM(html);
    let test = dom.window.document.querySelectorAll(
        'tbody tr.table_server--row')[1]
    test.innerHTML.split('\n').forEach(it => {
	    console.log(it.trim())
    })
    let list = dom.window.document.querySelectorAll(
        'tbody tr.table_server--row td.table_server--col_actions div[aria-labelledby]')
            [1];
    list = list.getElementsByTagName('a');
    console.log(`当前有${list.length}个地区可用`);
    list = Array.from(list);
    let tmp = [];
    list.forEach((e, i) => {
        console.log(i+1 + '. ' + e.innerHTML);
        if (e.innerHTML === 'Los Angeles, CA') {
            console.log('洛杉矶可用！');
        }
        tmp.push({ i, href: e.href, loc: e.innerHTML });
    });
    result.availables = tmp;
    setTimeout(main, 4000);
}

const app = new express();
app.all('/', (req, res, next) => {
    res.redirect('/home.html');
});
app.get('/check', (req, res, next) => {
    //
    res.set({
        'Access-Control-Allow-Origin': '*',
    });
    res.send(result);
});
app.use(express.static(`${ __dirname }/../../dist`));
app.listen(8081);

main();
