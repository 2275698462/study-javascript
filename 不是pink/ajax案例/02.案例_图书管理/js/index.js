/**
 * 目标1：渲染图书列表
 *  1.1 获取数据
 *  1.2 渲染数据
 */
const creator = '校花'

// 封装获取并渲染图书列表的函数
function getBooksList() {
    axios({
        url: 'http://hmajax.itheima.net/api/books',
        params: {
            creator // 外号：获取对应数据
        }
    }).then(result => {
        // console.log(result.data.data)
        const bookList = result.data.data
        const htmlStr = bookList.map((item, index) => {
            const {id, bookname, author, publisher} = item
            return `
             <tr>
                  <td>${index + 1}</td>
                  <td>${bookname}</td>
                  <td>${author}</td>
                  <td>${publisher}</td>
                  <td data-id=${id}>
                    <span class="del">删除</span>
                    <span class="edit">编辑</span>
                  </td>
             </tr>
            `
        }).join('')
        // console.log(htmlStr)
        document.querySelector('.list').innerHTML = htmlStr
    })
}

// 网页加载运行，获取并渲染列表
getBooksList()

const addModalDom = document.querySelector('.add-modal')
const addModal = new bootstrap.Modal(addModalDom)
document.querySelector('.add-btn').addEventListener('click', function () {
    const addForm = document.querySelector('.add-form')
    const bookObj = serialize(addForm, {hash: true, empty: true})
    console.log(bookObj)
    axios({
        url: 'http://hmajax.itheima.net/api/books',
        method: 'post',
        data: {
            ...bookObj,
            creator
        }
    }).then(result => {
        console.log(result.data.message)
        // 添加成功后重新渲染
        getBooksList()
        // 重置表单
        addForm.reset()
        addModal.hide()
    })


})

// 删除元素 -> 事件委托
document.querySelector('.list').addEventListener('click', e => {
    // 获取触发事件的真正元素 e.target
    // console.log(e.target)

    // 判断点击的是否位删除元素
    if (e.target.classList.contains('del')) {
        // console.log('点击删除元素')
        // 获取图书 id
        const theId = e.target.parentNode.dataset.id
        // console.log(theId)
        axios({
            url: `http://hmajax.itheima.net/api/books/${theId}`,
            method: 'delete'
        }).then(result => {
            console.log(result.data.message)
            getBooksList()
        })
    }

})

// 编辑
const editDom = document.querySelector('.edit-modal')
const editModal = new bootstrap.Modal(editDom)

// 动态元素，用事件委托
document.querySelector('.list').addEventListener('click', e => {
    // 判断点击的是否位编辑元素
    if (e.target.classList.contains('edit')) {
        // 数据回显，拿到自定义 id
        const theId = e.target.parentNode.dataset.id
        // console.log(theId)
        axios({
            url: `http://hmajax.itheima.net/api/books/${theId}`,
        }).then(result => {
            const bookObj = result.data.data
            // console.log(bookObj)
            // document.querySelector('.edit-form .bookname').value = bookObj.bookname
            // document.querySelector('.edit-form .author').value = bookObj.author
            // document.querySelector('.edit-form .publisher').value = bookObj.publisher
            // -----------------优雅写法-----------------
            const keys = Object.keys(bookObj)
            // console.log(keys) [ "id", "bookname", "author", "publisher" ]
            keys.forEach(keys => {
                document.querySelector(`.edit-form .${keys}`).value = bookObj[keys]
            })
        })

        editModal.show()
    }

})

// 编辑保存按钮
document.querySelector('.edit-btn').addEventListener('click', () => {
    // 获取表单
    const editForm = document.querySelector('.edit-form')
    const data = serialize(editForm, {hash: true, empty: true})
    axios({
        url: `http://hmajax.itheima.net/api/books/${data.id}`,
        method: 'put',
        data
    }).then(result => {
        console.log(result)
        getBooksList()
        // 隐藏弹框
        editModal.hide()
    })

})