/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */

const creator = '校花'
// 回显信息
axios({
    url: 'http://hmajax.itheima.net/api/settings',
    params: {
        creator
    }
}).then(result => {
    const userObj = result.data.data
    // console.log(userObj)
    Object.keys(userObj).forEach(key => {
        if (key === 'avatar') {
            document.querySelector('.prew').src = userObj[key]
        } else if (key === 'gender') {
            const gRadioList = document.querySelectorAll('.gender')
            const gNum = userObj[key]
            gRadioList[gNum].checked = true
        } else {
            document.querySelector(`.${key}`).value = userObj[key]
        }

    })

})

// 修改图片
document.querySelector('.upload').addEventListener('change', e => {
    // console.log(e.target.files[0])
    const data = new FormData()
    data.append('avatar', e.target.files[0])
    data.append('creator', creator)
    axios({
        url: 'http://hmajax.itheima.net/api/avatar',
        method: 'put',
        data
    }).then(result => {
        const imgUrl = result.data.data.avatar
        // 回显头像
        document.querySelector('.prew').src = imgUrl
    })
})

// 信息修改
document.querySelector('.submit').addEventListener('click', () => {
    // 收集表单信息
    const userForm = document.querySelector('.user-form')
    const userObj = serialize(userForm, {hash: true, empty: true})
    userObj.gender = +userObj.gender // 改变数据类型
    // console.log(userObj)
    axios({
        url: 'http://hmajax.itheima.net/api/settings',
        method: 'put',
        data: {
            ...userObj,
            creator
        }
    }).then(result => {
        // console.log(result)
        const toastDom = document.querySelector('.my-toast')
        const toast = new bootstrap.Toast(toastDom)

        toast.show()
    })

})