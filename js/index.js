$(function () {

    var checks = $('.checkbox label')
    for (let i = 0; i < checks.length; i++) {
        checks[i].onclick = function () {
            if(checks[i].className === 'checked') {
                checks[i].className = ''
            } else {
                checks[i].className = 'checked'
            }
        }
    }
    var icon_radios = $('.icon_radio')
    for (let i = 0; i < icon_radios.length; i++) {
        icon_radios[i].onclick = function () {

        }
    }

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

