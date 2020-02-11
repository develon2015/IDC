<template>
    <div center>
        <div center>{{ result.count | checkCount }} (刷新状态：{{ index }})</div>
        <div>
            <img :src='img'/>
        </div>
        <div v-if='result.count'>
            <div result>当前有 {{ result.availables.length }} 个地区可用</div>
            <div v-for='e in result.availables' :key='e.i'>
                <div>{{ e.i+1 }}.  {{ e.loc }}  <a :href='e.href'> 点击购买 </a></div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';
var singleData = {
    result: {},
    index: 0,
    img: './target.png',
}
function task() {
    $.getJSON('/check', e => {
        singleData.result = e;
        singleData.index ++ ;
    });
    setTimeout(task, 1000);
}
task();
export default {
    data() {
        return singleData;
    },
    filters: {
        checkCount(count) {
            if (!count) return '正在从服务器获取数据...';
            return `服务器端已执行 ${ count } 次监控`;
        }
    }
}
</script>
<style scoped>
[center] {
    text-align: center;
}
img {
    width: 80%;
}
div[result] {
    padding: 20px;
}
</style>
