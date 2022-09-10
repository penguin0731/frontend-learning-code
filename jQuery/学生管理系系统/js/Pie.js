// 实现饼图的js模块
(function () {
    var pie = {
        init: function () {
            this.getData();
        },
        option: {
            title: {
                text: '',
                subtext: '纯属虚构',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                // data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    // data: [
                    //     { value: 335, name: '直接访问' },
                    //     { value: 310, name: '邮件营销' },
                    //     { value: 234, name: '联盟广告' },
                    //     { value: 135, name: '视频广告' },
                    //     { value: 1548, name: '搜索引擎' }
                    // ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        },
        getData: function () {
            var self = this;
            $.ajax({
                url: 'http://api.duyiedu.com/api/student/findAll',
                data: { appkey: '13926806277_1558879000128' },
                success: function (res) {
                    var data = JSON.parse(res);
                    self.getAreaPie(data.data);
                    self.getSexPie(data.data);
                }
            });
        },
        getAreaPie: function (data) {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init($('#student-echarts .area')[0]);
            var legendArr = [];
            var seriesArr = [];
            var numObj = {};
            data.forEach(function (ele, index) {
                if(!numObj[ele.address]) {
                    legendArr.push(ele.address);
                    numObj[ele.address] = 1;
                }else {
                    numObj[ele.address] ++;
                }
            });
            for(var prop in numObj) {
                seriesArr.push({value: numObj[prop], name: prop});
            }
            this.option.legend.data = legendArr;
            this.option.series[0].data = seriesArr;
            this.option.title.text = '学生地区分布';
            this.option.series[0].name = '地区分布'
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(this.option);
        },
        getSexPie: function (data) {
            var myChart = echarts.init($('#student-echarts .sex')[0]);
            var legendArr = ['男', '女'];
            var seriesArr = [];
            var numObj = {};
            data.forEach(function (ele, index) {
                if(!numObj[ele.sex]) {
                    numObj[ele.sex] = 1;
                }else {
                    numObj[ele.sex] ++;
                }
            });
            seriesArr.push({value: numObj[0], name: '男'}, {value: numObj[1], name: '女'});
            this.option.legend.data = legendArr;
            this.option.series[0].data = seriesArr;
            this.option.title.text = '学生性别分布';
            this.option.series[0].name = '性别分布'
            myChart.setOption(this.option);
        }
    }
    pie.init();
}());