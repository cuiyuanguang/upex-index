
// 价格、数量的精度、科学计数法格式化
export default {
    // 汇率计算
    install(Vue) {
        Vue.prototype._P = {
            fixRate(price, exrate, market) {
                const lang = localStorage.getItem('lang') || 'en_US';
                const larate = exrate[lang] || exrate.en_US;
                if (!larate) {
                    return '--';
                }
                const pric = larate[market] * price;
                if (`${parseFloat(pric)}` !== 'NaN') {
                    return larate.lang_logo + pric.toFixed(larate.coin_precision);
                }
                return '--';
            },
            formatTime(dateTime) {
                const date = new Date(dateTime);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const seconds = date.getSeconds();
                function s(t) {
                    return t < 10 ? `0${t}` : t;
                }
                return `${year}-${s(month)}-${s(day)} ${s(hours)}:${s(minutes)}:${s(seconds)}`;
            },
            fixD(num, precision) {
                // num初始化
                if (`${num}` === '0') { return num; }
                if (!num) { return '--'; }
                const newnum = `${parseFloat(num)}`;
                if (newnum === 'NaN') { return '--'; }
                let fixNum = newnum;
                // 科学计数法计算
                if (newnum.toLowerCase().indexOf('e') > -1) {
                    const a = newnum.toLowerCase().split('e');
                    let b = a[0];
                    const c = Math.abs(parseFloat(a[1]));
                    let d = '';
                    let h = b.length;
                    let i;
                    if (a[0].split('.')[1]) {
                        b = a[0].split('.')[0] + a[0].split('.')[1];
                        h = a[0].split('.')[0].length;
                    }
                    for (i = 0; i < c - h; i += 1) {
                        d += '0';
                    }
                    fixNum = `0.${d}${b}`;
                }
                // 精度格式化
                // precision初始化
                if (`${precision}` !== '0' && !precision) { return fixNum; }
                if (`${parseFloat(num)}` === 'NaN') { return fixNum; }
                const fNum = fixNum.split('.');
                if (precision === 0) {
                    fixNum = parseInt(fixNum, 10);
                } else if (precision > 0 && fNum[1]) {
                    if (fNum[1].length > precision) {
                        if (fNum[1].indexOf('999999999') > -1) {
                            const s = parseFloat(fixNum).toFixed(precision + 1);
                            fixNum = s.slice(0, s.length - 1);
                        } else {
                            fixNum = `${fNum[0]}.${fNum[1].slice(0, precision)}`;
                        }
                    } else {
                        fixNum = parseFloat(fixNum).toFixed(precision);
                    }
                } else {
                    fixNum = parseFloat(fixNum).toFixed(precision);
                }
                return fixNum;
            },
            // 删除小数点最后面的0
            lastD(num) {
                if (!num) return num;
                const newNum = `${num}`;
                const newNumStr = newNum.split('.')[1];
                if (!newNumStr) return newNum;
                function substring(str) {
                    const arr = str.split('');
                    for (let i = arr.length - 1; i >= 0; i -= 1) {
                        if (!arr[i]) return newNum.split('.')[0];
                        if (arr[i] === '0') {
                            arr.splice(i);
                        } else {
                            break;
                        }
                    }
                    if (!arr.length) return newNum.split('.')[0];
                    return `${newNum.split('.')[0]}.${arr.join('')}`;
                }
                return substring(newNumStr);
            },
            // 获取url里的参数
            fixUrl(name) {
                const text = window.location.search.substring(1).split('&');
                let v = null;
                for (let i = text.length - 1; i >= 0; i -= 1) {
                    const key = text[i].split('=')[0];
                    const value = text[i].split('=')[1];
                    if (key === name) {
                        v = value;
                        break;
                    }
                }
                return v;
            },
        };
    },
};
