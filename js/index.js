$(function () {
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
                // orderList[i].style.height = 0 + 'px'
            } else { // 展开
                list[i].className = 'down'
                isShow = true
                orderList[i].style.display = 'block'
                // orderList[i].style.height = 108 + 'px'
            }
        }
    }
}

