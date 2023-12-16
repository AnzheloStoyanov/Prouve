import Settings from '../pages/Profile/Settings/Settings'
import Orders from '../pages/Profile/Orders/Orders'
import Payments from '../pages/Profile/Payments/Payments'
import QrCode from '../pages/Profile/QRCode/QRCode';
import PaymentsIcon from '../assets/images/payments-icon.png'
import SettingsIcon from '../assets/images/settings-icon.png'
import QrCodeIcon from '../assets/images/qr-code-icon.png'
import OrdersIcon from '../assets/images/orders-icon.png'

export const pages = [
    {
        label: 'Последни поръчки',
        component: <Orders />,
        icon: OrdersIcon
    }, {
        label: 'QR код',
        component: <QrCode />,
        icon: QrCodeIcon
    }, {
        label: 'Настройки на профила',
        component: <Settings />,
        icon: SettingsIcon
    }, {
        label: 'Плащания',
        component: <Payments />,
        icon: PaymentsIcon
    }]
