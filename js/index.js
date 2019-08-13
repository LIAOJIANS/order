$(function () {
    Dialog.init('<img src="./images/load3.gif" width="48px"/>',{
        mask : 0,
        addClass : 'dialog_load',
        time : 500,
    });
    var checks = $('.checkbox label')
    for (let i = 0; i < checks.length; i++) {
        checks[i].onclick = function () {
            if(checks[i].className === 'checked') {
                checks[i].className = ''
            } else {
                checks[i].className = 'checked'
                // console.log($(this).parent('.checkbox').next('cash').children('.ke').text())
            }
        }
    }
    var radioBox = $(':radio')
    var labs = $('.lab')
    console.log(labs)
    for (let i = 0; i < radioBox.length; i++) {
        labs[i].onclick = function () {

        }
    }

    // 缴费按钮
    $('.btn').click(function () {
        var checked = [] // 声明一个选中的数组对象
        // 循环课程
        for (let i = 0; i < checks.length; i++) {
            if(checks[i].className === 'checked') {
                var index = i
                // 选中的主题
                var kes = document.querySelectorAll('.ke')[index].innerText
                // 选中的价格
                var qian = document.querySelectorAll('.qian')[index].innerText
                checked.push(
                    { ke: kes, qian: qian }
                )
            }
        }
        console.log(checked)
        if(checked.length === 0) {
            Dialog.init('请选择课程', {
                time: 1000,
                mask: false,
                addClass : 'toast',
                style: 'color: #fff'
            })
            return;
        }
    })
    showC()
})

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

// function payType(event) {
//     // //
//     // if (event.srcElement.classList[0] === 'iconfont' ) {
//     //     event.srcElement.style.display = 'none'
//     // } else {
//     //     event.srcElement.children[0].style.display = 'block'
//     // }
//     // console.log(event)
//     // var wx = $('.wx').is(':checked')
//     // var zfb = $('.zfb').is(':checked')
//    console.log()
//
// }

