$(function () {
    var  CourseArray = {}
    // 定义获取数据
    /*-------------------------界面渲染---------------------------*/
    Dialog.init('<img src="./images/load3.gif" width="48px"/>',{
        mask : 0,
        addClass : 'dialog_load',
        onload : function(){
            var that = this
            // 模拟异步发送ajax请求
            $.ajax({
                url: 'http://zbjy.fhyiii.cn/index/classlist',
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    if(data.code === 0) {
                        CourseArray = data.data
                        var html = ''
                        // 模板渲染
                        $('.title').text(CourseArray.title[0].value)
                        $('.right_name').text(CourseArray.title[1].value)
                        html += template("historyR",CourseArray);
                        $('#orederList').html(html)
                        // 初始购物车
                        $('.allK span').text(CourseArray.list.length)
                        var nonprice = 0
                        for (let i = 0; i < CourseArray.list.length; i++) {
                            nonprice = nonprice + CourseArray.list[i].money * 1
                        }
                        // 总价添加文本
                        $('.allP span').text('¥' + nonprice)
                        // 一开始选中的科目
                        var shopHtml = ''
                        shopHtml += template("shorCar",CourseArray);
                        $('#shopList').html(shopHtml)
                        // 关闭加载
                        Dialog.close(that);

                        /*-------------------------折叠面板---------------------------*/
                        var checks = $('.checkbox label')
                        for (let i = 0; i < checks.length; i++) {
                            /*
                             购物车总价与已选课程的显示
                            1、点击某一项的时候，循环所有checks值
                            2、判断如果calssName为checked的话 可以根据他本身的索引去获取相对应的课程价格
                            3、将价格、课程名称储存到一个数组对象中
                            4、遍历该数组、添加模板，并计算总价
                            */
                            checks[i].onclick = function () {
                                if(checks[i].className === 'checked') {
                                    checks[i].className = ''
                                } else {
                                    checks[i].className = 'checked'
                                }
                                var shopCar = []
                                var allPrice = 0
                                for (let j = 0; j < checks.length; j++) {
                                    if (checks[j].className === 'checked') {
                                        allPrice = allPrice + CourseArray.list[j].money * 1
                                        shopCar.push(
                                            CourseArray.list[j]
                                        )
                                    }
                                }
                                console.log(allPrice)
                                if (shopCar.length === 0) { // 当shopCar数组中的长度为0时
                                    $('.block').css('display','none')
                                    $('.none').css('display','block')
                                    $('.allP span').text('¥0')
                                    $('#shopList').html('')
                                } else { // 购物车有东西
                                    $('.block').css('display','block')
                                    $('.none').css('display','none')
                                    $('.allK span').text(shopCar.length)
                                    $('.allP span').text('¥' + allPrice )
                                   var shoplist = {
                                       shopCar
                                   }
                                    var html = ''
                                    html += template("NewshorCar",shoplist);
                                    $('#shopList').html(html)
                                }
                            }
                        }


                        /*-------------------------选择支付按钮单选---------------------------*/
                        var radioBox = $('.icon_radio span') // icon元素
                        var payType = 'wx' // 支付方式
                        $(".radio").on("click",function() {
                            // 获取当前点击的子节点
                            var par_label = $(this).prev().children('.icon_radio').children('span');
                            // 如果选中
                            if (this.checked) {
                                payType = $(this).val()
                                radioBox.removeClass("iconfont")
                                par_label.removeClass("iconfont").addClass("iconfont");
                            }
                        })


                        /*-------------------------缴费按钮---------------------------*/
                        $('.btn').click(function () {
                            var school = $('.school').val().trim() // 学校
                            var name = $('.name').val().trim() // 姓名
                            var cla = $('.class').val().trim() // 班级
                            var sex = $('#slt_organization').text() // 性别
                            var Pname = $('.Pname').val().trim() // 家长姓名
                            var tel = $('.tel').val().trim() // 电话

                            /*--------课程逻辑--------*/
                            var body = '' // 声明存储课程名称数组
                            var class_id = '' // 声明存储课程id数组
                            // 循环课程
                            for (let i = 0; i < checks.length; i++) {
                                // 筛选已选中的课程
                                if(checks[i].className === 'checked') {
                                    var index = i
                                    // 已选中课程ID
                                    var id = CourseArray.list[index].id
                                    // 已选中课程课程名称
                                    var className = CourseArray.list[index].class
                                    body += className + ','
                                    class_id += id + ','
                                }
                            }
                           if(body || class_id) {
                               body = body.substring(0, body.length-1)
                               class_id = class_id.substring(0, class_id.length-1)
                           }
                            console.log(body, class_id)
                            // 如果课程没有的话
                            if(!class_id || !body) {
                                Toast('请选择课程!')
                                return;
                            }

                            /*--------提交信息逻辑--------*/
                            if (!school) {
                                Toast('请填写学校')
                                return;
                            } else if (!name) {
                                Toast('请填写姓名')
                                return;
                            } else if (!cla) {
                                Toast('请填写班级')
                                return;
                            } else if (sex !== '男' && sex !== '女' ) {
                                Toast('请选择性别')
                                return;
                            } else if (!Pname) {
                                Toast('请填写家长姓名')
                                return;
                            } else if( !/^1\d{10}$/.test(tel) ) {
                                Toast('请填写正确的手机号')
                                return;
                            } else {
                                $.ajax({
                                    url: 'http://zbjy.fhyiii.cn/index/post',
                                    data: {
                                        school: school,
                                        username: name,
                                        class_name: cla,
                                        sex: sex,
                                        fm_name: Pname,
                                        fm_telphone: tel
                                    },
                                    type: 'post',
                                    dataType: 'json',
                                    success: function (data) {
                                        // 如果信息有误
                                        if(data.code !== 0 ) {
                                            Toast('提交的信息有误！')
                                            return
                                        } else {
                                            $('.school').val('')
                                            $('.name').val('')
                                            $('.class').val('')
                                            $('.Pname').val('')
                                            $('.tel').val('')
                                            $('#slt_organization').text('请选择性别')
                                        }
                                    }
                                })
                            }
                            /*--------支付逻辑--------*/
                            if(payType === 'wx') { // 发起微信支付
                                Dialog.init('<img src="./images/load3.gif" width="48px"/>',{
                                    mask : 0,
                                    addClass : 'dialog_load',
                                    onload : function(){
                                        $.ajax({
                                            url: 'http://zbjy.fhyiii.cn/index/pay',
                                            data: {
                                                body,
                                                class_id,
                                                telphone: tel
                                            },
                                            type: 'post',
                                            dataType: 'json',
                                            success: function (data) {
                                                if(data.code === 0) {
                                                    location.href = data.url
                                                    Dialog.close(that);
                                                }
                                            }
                                        })
                                    }
                                })

                            } else { // 发起支付宝支付
                                Dialog.init('发起支付宝支付',{
                                    title : '提示',
                                    button : {
                                        确定 : function(){Dialog.close(this);}
                                    }
                                });
                            }
                        })
                        showC()
                    }
                }
            })
        }
    });
})

// 提示信息
function Toast(content) {
    Dialog.init(content, {
        time: 1000,
        mask: false,
        addClass : 'toast',
        style: 'color: #fff'
    })
}

// 下拉
function showC() {
    var iconList = $('.icon_next')
    var list = $('.icon_next .box')
    var orderList = $('.isShow')
    var isShow = false
    for (let i = 0; i < iconList.length; i++) {
        iconList[i].onclick = function () {
            if(list[i].className === 'down') { //  收缩
                list[i].className = 'up'
                isShow = false
                orderList[i].style.display = 'none'
                // orderList[i].style.height = 50 + 'px'
            } else { // 展开
                list[i].className = 'down'
                isShow = true
                orderList[i].style.display = 'block'
                // orderList[i].style.height = 108 + 'px'
            }
        }
    }
}

// 性别选择
function showSex() {
    Dialog.init('请选择性别',{
        title : '选择', //添加标题
        maskClick : false, //点击背景层是否关闭弹层
        button : { //按钮
            男 : function(){
                $('#slt_organization').text('男')
                Dialog.close(this);
            },
            女 : function(){
                $('#slt_organization').text('女')
                Dialog.close(this);
            }
        },
    })
}
