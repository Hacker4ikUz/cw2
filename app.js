let url = 'https://vast-depths-87306.herokuapp.com/todos'
function restart() {
    axios.get(url)
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                reload(res.data.data)
                localStorage.setItem('cards', JSON.stringify(res.data.data))
                let len = document.querySelector('.right h2')
                len.innerHTML = `Tasks: ${res.data.data.length}`
            }
        })
        .catch(error => console.log(error))
}
restart()


// reload (otrisovka i td)
function reload(arr) {
    let progress_cont = document.querySelector('.progress_cont')
    let todos_cont = document.querySelector('.todos_cont')
    let issues_cont = document.querySelector('.issues_cont')
    let review_cont = document.querySelector('.review_cont')
    let done_cont = document.querySelector('.done_cont')

    done_cont.innerHTML = ''
    issues_cont.innerHTML = ''
    todos_cont.innerHTML = ''
    review_cont.innerHTML = ''
    progress_cont.innerHTML = ''

    let todo = []
    let progress = []
    let issues = []
    let review = []
    let done = []
    for (let item of arr) {
        if (item.status === 'todo') {
            todo.push(item)
            localStorage.setItem('todos', JSON.stringify(todo))
            todos_cont.innerHTML += `
            <div class="todos" id="${item._id}" data-status="${item.status}">
                <div class="todo_name">
                    <span>${item.title}</span>
                </div>
                <div class="btns">
                    <img class="next" src="./img/next.png">
                    <img class="del" src="./img/del.png">
                    <a href="./edit.html#${item._id}">
                        <img class="edit" src="./img/edit.png">
                    </a> 
                </div>
            </div>
            `
            todos_cont.previousSibling.previousSibling.childNodes[3].innerHTML = todo.length
            document.querySelector('.todolength').innerHTML = todo.length
            next('.todos .next', 'progress')
        }
        if (item.status === 'progress') {
            progress.push(item)
            localStorage.setItem('progress', JSON.stringify(progress))
            progress_cont.innerHTML += `
            <div class="progress" id="${item._id}" data-status="${item.status}">
                <div class="progress_name">
                    <span>${item.title}</span>
                </div>
                <div class="btns">
                    <img class="prishep" src="./img/prishep.png">
                    <img class="back" src="./img/prev.png">
                    <img class="next" src="./img/next.png">
                    <img class="del" src="./img/del.png">
                    <a href="./edit.html#${item._id}">
                        <img class="edit" src="./img/edit.png">
                    </a> 
                </div>
            </div>
            `
            progress_cont.previousSibling.previousSibling.childNodes[3].innerHTML = progress.length || '0'
            document.querySelector('.proglength').innerHTML = progress.length
            back('.progress .back', 'todo')
            next('.progress .next', 'issues')
        }
        if (item.status === 'issues') {
            issues.push(item)
            localStorage.setItem('issues', JSON.stringify(issues))
            issues_cont.innerHTML += `
            <div class="issues" id="${item._id}" data-status="${item.status}">
                <div class="issues_name">
                    <span>${item.title}</span>
                </div>
                <div class="btns">
                    <img class="back" src="./img/prev.png">
                    <img class="next" src="./img/next.png">
                    <img class="del" src="./img/del.png"> 
                    <a href="./edit.html#${item._id}">
                        <img class="edit" src="./img/edit.png">
                    </a> 
                </div>
            </div>
            `
            issues_cont.previousSibling.previousSibling.childNodes[3].innerHTML = issues.length || '0'
            document.querySelector('.isslength').innerHTML = issues.length
            back('.issues .back', 'progress')
            next('.issues .next', 'review')

        }
        if (item.status === 'review') {
            review.push(item)
            localStorage.setItem('review', JSON.stringify(review))
            review_cont.innerHTML += `
            <div class="review" id="${item._id}" data-status="${item.status}">
                <div class="review_name">
                    <span>${item.title}</span>
                </div>
                <div class="btns">
                    <img class="back" src="./img/prev.png">
                    <img class="next" src="./img/next.png">
                    <img class="del" src="./img/del.png"> 
                    <a href="./edit.html#${item._id}">
                        <img class="edit" src="./img/edit.png"  >
                    </a> 
                </div>
                </div>
                `
            review_cont.previousSibling.previousSibling.childNodes[3].innerHTML = review.length || '0'
            document.querySelector('.relength').innerHTML = review.length

            back('.review .back', 'issues')
            next('.review .next', 'done')

        }
        if (item.status === 'done') {
            done.push(item)
            localStorage.setItem('done', JSON.stringify(done))
            done_cont.innerHTML += `
            <div class="done" id="${item._id}" data-status="${item.status}">
                <div class="done_name">
                    <span> ${item.title}</span>
                </div>
                <div class="btns">
                    <img class="back" src="./img/prev.png">
                    <img class="del" src="./img/del.png">
                    <a href="./edit.html#${item._id}">
                        <img class="edit" src="./img/edit.png">
                    </a> 
                </div>
            </div>
            `
            done_cont.previousSibling.previousSibling.childNodes[3].innerHTML = done.length || '0'
            document.querySelector('.donelength').innerHTML = done.length
            back('.done .back', 'review')
        }
        // delete item 
        let dels = document.querySelectorAll('.del')
        dels.forEach(del => {
            del.onclick = (e) => {
                let id = e.target.parentNode.parentNode.id
                axios.delete(`${url}/${id}`)
                    .then(res => {
                        if (res.status === 200 || res.status === 201) {
                            restart()
                        }
                    })
            }
        });
        // left side menu
        let menu = document.querySelectorAll('.menu')
        menu.forEach(menu => {
            menu.onclick = () => {
                menus.forEach(elem => {
                    elem.classList.remove('active')
                });
                menu.classList.add('active')

                if (menu.firstChild.nextSibling.lastChild.previousSibling.innerHTML === 'ALL') {
                    display('block','block','block','block','block' )
                }
                if (menu.firstChild.nextSibling.lastChild.previousSibling.innerHTML === 'TODO') {
                    display('none','block','none','none','none' )
                }
                if (menu.firstChild.nextSibling.lastChild.previousSibling.innerHTML === 'PROGRESS') {
                    display('block','none','none','none','none' )
                }
                if (menu.firstChild.nextSibling.lastChild.previousSibling.innerHTML === 'ISSUES') {
                    display('none','none','block','none','none' )
                }
                if (menu.firstChild.nextSibling.lastChild.previousSibling.innerHTML === 'REVIEW') {
                    display('none','none','none','block','none' )
                }
                if (menu.firstChild.nextSibling.lastChild.previousSibling.innerHTML === 'DONE') {
                    display('none','none','none','none','block' )
                }
            }
        });
        let add = document.querySelectorAll('.add')
        add.forEach(elem => {
            elem.onclick = () => {
                let modal = document.querySelector('.modal')
                modal.style.top = '30%'
                let back = document.querySelector('.background')
                back.style.display = 'block'
                back.onclick = () => {
                    let modal = document.querySelector('.modal')
                    modal.style.top = '-130%'
                    let back = document.querySelector('.background')
                    back.style.display = 'none'
                }
            }
        });
    }
}
function back(clas, where) {
    let back2 = document.querySelectorAll(clas)
    back2.forEach(element => {
        element.onclick = (event) => {
            let id = event.target.parentNode.parentNode.id
            axios.get(url)
                .then(res => {
                    let array = res.data.data.filter(elem => elem._id === id)
                    for (let elem of array) {
                        elem.status = where
                        axios.patch(`${url}/${id}`, elem)
                            .then(res => {
                                if (res.status === 200 || res.status === 201) {
                                    restart()
                                }
                            })
                    }
                })
        }
    });
}
function next(clas, where) {
    let next = document.querySelectorAll(clas)
    next.forEach(element => {
        element.onclick = (event) => {
            let id = event.target.parentNode.parentNode.id
            axios.get(url)
                .then(res => {
                    let array = res.data.data.filter(elem => elem._id === id)
                    for (let elem of array) {
                        elem.status = where
                        axios.patch(`${url}/${id}`, elem)
                            .then(res => {
                                if (res.status === 200 || res.status === 201) {
                                    restart()
                                }
                            })
                    }
                })
        }
    });
}
function display(one, two, three, four, five) {
    let progress_box = document.querySelector('.progress_box')
    let todo_box = document.querySelector('.todo_box')
    let issues_box = document.querySelector('.issues_box')
    let review_box = document.querySelector('.review_box')
    let done_box = document.querySelector('.done_box')

    progress_box.style.display = one
    todo_box.style.display = two
    issues_box.style.display = three
    review_box.style.display = four
    done_box.style.display = five
}

// add item
let add = document.forms.add
add.onsubmit = (event) => {
    event.preventDefault()


    let modal = document.querySelector('.modal')
    modal.style.top = '-130%'
    let back = document.querySelector('.background')
    back.style.display = 'none'

    submit()
}
// submit
function submit() {
    let card = {
        deadline: "29.06",
        time: "16:30"
    }

    let fm = new FormData(add)

    fm.forEach((value, key) => {
        card[key] = value
    });

    axios.post(url, card)
        .then(res => {
            restart()
            console.log(res);
        })
}


