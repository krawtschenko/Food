window.addEventListener('DOMContentLoaded', () => {
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item')
    const tabsContent = document.querySelectorAll('.tabcontent')
    const tabsParent = document.querySelector('.tabheader__items')

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none'
        })

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        })
    }

    function showTabContent(i = 1) {
        tabsContent[i].style.display = 'block'
        tabs[i].classList.add('tabheader__item_active')
    }

    hideTabContent()
    showTabContent()

    tabsParent.addEventListener('click', (event) => {
        const target = event.target

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })

    //Timer
    const deadline = '2023-01-01'

    function getTimeRemaining(endtime) {
        let total, days, hours, minutes, seconds

        total = Date.parse(endtime) - Date.parse(Date())

        if (total <= 0) {
            days = 0
            hours = 0
            minutes = 0
            seconds = 0
        } else {
            days = Math.round(total / (1000 * 60 * 60 * 24))
            hours = Math.round((total / (1000 * 60 * 60)) % 24)
            minutes = Math.round((total / (1000 * 60)) % 60)
            seconds = Math.round((total / 1000) % 60)
        }


        return {
            total, days, hours, minutes, seconds
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }

    function setClock() {
        const days = document.querySelector('#days')
        const hours = document.querySelector('#hours')
        const minutes = document.querySelector('#minutes')
        const seconds = document.querySelector('#seconds')
        const timeInterval = setInterval(updateClock, 1000)

        updateClock()

        function updateClock() {
            const t = getTimeRemaining(deadline)

            days.innerHTML = getZero(t.days)
            hours.innerHTML = getZero(t.hours)
            minutes.innerHTML = getZero(t.minutes)
            seconds.innerHTML = getZero(t.seconds)

            if (t.total <= 0) {
                clearInterval(timeInterval)
            }
        }
    }

    setClock()

    //Modal
    const modalTrigger = document.querySelectorAll('[data-modal]'), modal = document.querySelector('.modal'),
        modalClose = document.querySelector('[data-close]')

    function openModal() {
        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
    }

    function closeModal() {
        modal.style.display = 'none'
        document.body.style.overflow = ''
    }

    modalTrigger.forEach(elem => {
        elem.addEventListener('click', openModal)
    })

    modalClose.addEventListener('click', closeModal)

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal()
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && (modal.style.display = 'block')) {
            closeModal()
        }
    })

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(); //если то что пролистанное + то что сейчас на экране = всей странице (конец страницы)
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
})

