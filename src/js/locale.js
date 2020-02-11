class Locales {
    constructor(defaultLocale) {
        this.defaultLocale = defaultLocale;
    }
    get(key) {
        if (!data[key]) {
            let item = {
                en: 'Unknown String',
                zh: '未知字符串',
            };
            item.toString = () => item[this.defaultLocale];
            return item;
        }
        let item = {
            en: data[key][0],
        };
        item.zh = key;
        item.toString = () => item[this.defaultLocale];
        return item;
    }
}

module.exports = (() => {
    console.log('查询本地化信息');
    return new Locales('zh');
})();

let data = {
    主页: ['Home Page'],
    计时器: ['Timer'],
};