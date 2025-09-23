import TaoBaoIcon from '@/assets/images/TaoBao.svg'
import PhoneIcon from '@/assets/images/Phone.svg'
import MessageIcon from '@/assets/images/Message.svg'
import DocumentIcon from '@/assets/images/Document.svg'
import PackageIcon from '@/assets/images/Package.svg'
import ChatIcon from '@/assets/images/Chat.svg'
import QuestionIcon from '@/assets/images/Question.svg'
import LockIcon from '@/assets/images/Lock.svg'
import QuitIcon from '@/assets/images/Quit.svg'


export const AccountButtonData = [
    {
        id: 1,
        icon: TaoBaoIcon,
        title: 'Taobao в Кыргызстане',
        route: '/Screens/accountScreens/TaoBao/TaoBao',
    },
    {
        id: 2,
        icon: PhoneIcon,
        title: 'Контактные данные',
        route: '/Screens/accountScreens/Contacts/Contacts',
    },
    {
        id: 3,
        icon: MessageIcon,
        title: 'Новости',
        route: '/Screens/accountScreens/Messages/Messages',
    },
    {
        id: 4,
        icon: DocumentIcon,
        title: 'Условия компании',
        route: '/Screens/accountScreens/Conditions/Conditions',
    },
    {
        id: 5,
        icon: PackageIcon,
        title: 'Неизвестные товары',
        route: 'https://t.me/+Yn4OkYESMvU5Mjky',
    },
    {
        id: 6,
        icon: ChatIcon,
        title: 'Часто задаваемые вопросы',
        route: '/Screens/accountScreens/Questions/Questions',
    },
    {
        id: 7,
        icon: QuestionIcon,
        title: 'Помощь',
        route: null,
    },
    {
        id: 8,
        icon: LockIcon,
        title: 'Сменить пароль',
        route: '/Screens/accountScreens/ChangePassword/ChangePassword',
    },
    {
        id: 9,
        icon: QuitIcon,
        title: 'Выйти с аккаунта',
        route: null,
    },
]