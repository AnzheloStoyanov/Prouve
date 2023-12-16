import QRCode from "react-qr-code"
import Divider from "../../../components/common/Divider/Divider"
import { isMobileContext } from "../../../providers/isMobileContext"
import styles from './QrCode.module.css'
import { useContext } from "react"

const QrCode = () => {
    const context = useContext(isMobileContext)
    const { isMobile } = context;
    return (
        <div className={styles.qrCodeContainer}>
            {!isMobile && (<><span className={styles.sectionHeader}>QR код</span>
                <Divider style={{ margin: '25px 0' }} /></>)}
            <div className={styles.qrCodeWrapper}>
                <QRCode
                    value={'https://facebook.com'}
                    viewBox={`0 0 256 256`}
                />
            </div>
        </div>
    )
}

export default QrCode