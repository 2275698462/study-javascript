/**
 * 目标：网站-更换背景
 *  1. 选择图片上传，设置body背景
 *  2. 上传成功时，"保存"图片url网址
 *  3. 网页运行后，"获取"url网址使用
 * */

document.querySelector('.bg-ipt').addEventListener('change', evt => {
    console.log(evt.target.files[0])
    const fd = new FormData()
    fd.append('img', evt.target.files[0])
    axios({
        url: 'http://hmajax.itheima.net/api/uploadimg',
        method: 'post',
        data: fd
    }).then(result => {
        // console.log(result.data.data.url)
        const imgUrl = result.data.data.url
        document.body.style.backgroundImage = `url(${imgUrl})`

        // 保存到本地
        localStorage.setItem('bdTmg', imgUrl)
    })
})

const bgUrl = localStorage.getItem('bdTmg')
console.log(bgUrl)
bgUrl && (document.body.style.backgroundImage = `url(${bgUrl})`)

