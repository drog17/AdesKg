import newsImg1 from '@/assets/images/newsImage1.jpg'
import newsImg2 from '@/assets/images/newsImage2.jpg'

export const AccountNewsData = [
    {
        id: 1,
        image: newsImg1,
        description: 'Акция на доставку в Ades KG!!!',
        route: '/Screens/accountScreens/Messages/NewsScreen/NewsScreen',
        lorem: [
            {
                id: 1,
                title: 'С 1 по 15 ноября стоимость доставки в пределах города снижена на 20%. Теперь доставка всего за 120 сом! Для клиентов за чертой города действуют специальные скидки, которые можно обсудить с курьером.'
            },
            {
                id: 2,
                title: 'Не упустите возможность воспользоваться выгодными условиями и получить свои товары быстрее и дешевле. Оформляйте доставку уже сегодня!'
            }
        ]
    },
    {
        id: 2,
        image: newsImg2,
        description: 'Обновили список запрещенных товаров',
        route: '/Screens/accountScreens/Messages/NewsScreen/NewsScreen',
        lorem: [
            {
                id: 1,
                title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            }
        ]
    }
]