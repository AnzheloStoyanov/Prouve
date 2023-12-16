import { useEffect, useState } from 'react';
import InputField from '../../../components/common/InputField/InputField';
import Divider from '../../../components/common/Divider/Divider';
import Button from '../../../components/common/Button/Button';
import SelectList from '../../../components/common/SelectList/SelectList';
import { allergensService, authService, usersService } from '../../../services';
import EditIcon from '../../../assets/images/edit-icon.png'
import CalendarIcon from '../../../assets/images/calendar-icon.png'
import styles from './Settings.module.css'
import DeliveryAddressLine from '../../../components/DeliveryAddressLine/DeliveryAddressLine';
import CustomDatepicker from '../../../components/common/CustomDatepicker/CustomDatepicker';

const Settings = () => {

    const defaultSettings = {
        personal: {
            name: '',
            email: '',
            phoneNumber: '',
            dateOfBirth: '',
            gender: ''
        },
        security: {
            password: '',
            newPassword: '',
            newPasswordConfirm: ''
        }
    }
    const [allergens, setAllAlergens] = useState([]);
    const [userAllergensIds, setUserAllergensIds] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState({});
    const [settings, setSettings] = useState(defaultSettings)
    const [addNewAddress, setAddNewAddress] = useState(false)

    const genders = [
        {
            id: 1,
            name: 'мъж'
        }, {
            id: 2,
            name: 'жена'
        }, {
            id: 3,
            name: 'друго'
        }]
    const mockAddresses = [
        {
            id: 1,
            name: 'Мария Иванова',
            address: 'ж.к. Славейков, бл.55, вх.4, ет.7, Бургас, 8000, България'
        }, {
            id: 2,
            name: 'Мария Иванова',
            address: 'ж.к. Изгрев, бл.88, вх.1, ет.14, Бургас, 8000, България'
        },
    ]
    const allAlergens = [
        {
            id: 1,
            name: 'Peanutsssssssssssssssssssssssssssssssssssssssssssssssssssss'
        }, {
            id: 2,
            name: 'Shelfish'
        }, {
            id: 3,
            name: 'Diary'
        },
        {
            id: 4,
            name: 'Eggs'
        }, {
            id: 5,
            name: 'Soy'
        }, {
            id: 6,
            name: 'Gluten'
        }, {
            id: 7,
            name: 'Mustard'
        }
    ]


    useEffect(() => {
        async function getAllAllergens() {
            const allergensData = await allergensService.getAllAllergens();
            setAllAlergens(allergensData);

        }

        async function getUserAllergens() {
            const userAllerensData = await allergensService.getUserAllergens();
            setUserAllergensIds([]);
        }

        async function getUserAddresses() {
            setAddresses(mockAddresses);
        }
        getAllAllergens();
        getUserAllergens();
        getUserAddresses();
    }, [])

    const handleCheckboxChange = (e) => {
        const value = parseInt(e.target.value);
        const index = userAllergensIds.indexOf(value);

        if (index !== -1) {

            userAllergensIds.splice(index, 1);
        } else {

            userAllergensIds.push(value);
        }
        setUserAllergensIds(userAllergensIds)
    }


    const handleAllergenChangesSubmit = (e) => {
        e.preventDefault();
    }

    const handleSettingsInputChange = (e, type) => {

        const { name, value } = e.target;

        setSettings((prev) => ({
            ...prev,
            [type]: {
                ...prev[type],
                [name]: value
            },
        }));
    }

    const handleNewAddressChange = (e) => {
        const { name, value } = e.target;

        setNewAddress((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDeleteAddress = (addressId) => {

        const newArray = addresses.filter((item) => item.id !== addressId);
        setAddresses(newArray)
    }

    const handleBirthDateChange = (date) => {

        setSettings((prev) => ({
            ...prev,
            personal: {
                ...prev.personal,
                dateOfBirth: date
            },
        }));
    }

    const handleNewAddressSubmit = (e) => {
        e.preventDefault();

        setAddresses([...addresses, newAddress])
        setAddNewAddress(false);
        setNewAddress({})
    }

    const handleUserSettinsSubmit = async (e) => {
        e.preventDefault();

        if (Object.keys(settings.personal).length !== 0) {
            const personalDataRes = await usersService.updatePersonalData(settings.personal);
        } else if (Object.keys(settings.security).length !== 0) {
            const securityDataRes = await authService.changePassword(settings.security)
        }
    }

    return (
        <>
            <div className={styles.settingsSection}>
                <span className={styles.sectionHeader}>настройки на профила</span>
                <Divider style={{ margin: '20px 0' }} />
                <form className={styles.settingsForm} onSubmit={handleUserSettinsSubmit}>
                    <div className={styles.formsWrapper}>
                        <div className={styles.personalDataForm}>
                            <span className={styles.formTitle}>ЛИЧНИ ДАННИ</span>
                            <div className={styles.inputWrapper}>
                                <InputField
                                    type='text'
                                    placeholder='име и фамилия'
                                    label='Име и фамилия'
                                    name={'name'}
                                    value={settings.name}
                                    onChange={(event) => handleSettingsInputChange(event, 'personal')}
                                /><img src={EditIcon} className='icon' name='edit-icon' />
                            </div>
                            <div className={styles.inputWrapper}>
                                <InputField
                                    type='text'
                                    placeholder='имейл'
                                    label='Email адрес'
                                    name={'email'}
                                    value={settings.email}
                                    onChange={(event) => handleSettingsInputChange(event, 'personal')}
                                /><img src={EditIcon} className='icon' name='edit-icon' />
                            </div>
                            <div className={styles.inputWrapper}>
                                <InputField
                                    type='text'
                                    placeholder='телефон'
                                    label='Телефон'
                                    name={'phoneNumber'}
                                    value={settings.phoneNumber}
                                    onChange={(event) => handleSettingsInputChange(event, 'personal')}
                                /><img src={EditIcon} className='icon' name='edit-icon' />
                            </div>
                            <div className={styles.inputWrapper}>
                                <div className={styles.datepickerLabel}>Дата на раждане</div>
                                <CustomDatepicker
                                    name={'dateOfBirth'}
                                    onChange={handleBirthDateChange}
                                /><img src={CalendarIcon} className='icon' name='calendar-icon' />
                            </div>
                            <SelectList
                                options={genders}
                                name={'gender'}
                                value={settings.gender}
                                style={{ marginTop: '20px' }}
                                label='Пол'
                                onChange={(event) => handleSettingsInputChange(event, 'personal')}
                            />
                        </div>
                        <div className={styles.securityForm}>
                            <span className={styles.formTitle}>ПАРОЛА</span>
                            <div className={styles.inputWrapper}>
                                <InputField
                                    type='password'
                                    placeholder='стара парола'
                                    label='Стара парола'
                                    name={'password'}
                                    value={settings.password}
                                    onChange={(event) => handleSettingsInputChange(event, 'security')}
                                />
                            </div>
                            <div className={styles.inputWrapper}>
                                <InputField
                                    type='password'
                                    placeholder='нова парола'
                                    label='Нова парола'
                                    name={'newPassword'}
                                    value={settings.newPassword}
                                    onChange={(event) => handleSettingsInputChange(event, 'security')}
                                />
                            </div>
                            <div className={styles.inputWrapper}>
                                <InputField
                                    type='password'
                                    placeholder='потвърдете паролата'
                                    label='Потвърдете паролата'
                                    name={'newPasswordConfirm'}
                                    value={settings.newPasswordConfirm}
                                    onChange={(event) => handleSettingsInputChange(event, 'security')}
                                />
                            </div>
                        </div>
                    </div>
                    <Button
                        style={{ width: '260px', borderRadius: '24px', alignSelf: 'center' }}
                    >
                        ЗАПАЗИ ПРОМЕНИТЕ
                    </Button>
                </form>
            </div>
            <div className={styles.preferencesSection}>
                <div className={styles.addressSection}>
                    <span className={styles.sectionHeader}>АДРЕС ЗА ДОСТАВКА</span>
                    <Divider style={{ margin: '20px 0' }} />
                    <ul className={styles.addressList}>
                        {addresses.map((address) => {
                            return (
                                <li key={address.id}>
                                    <DeliveryAddressLine
                                        name={address.name}
                                        address={address.address}
                                        handleDelete={() => handleDeleteAddress(address.id)}
                                    />
                                    <Divider />
                                </li>
                            )
                        })}
                    </ul>
                    {addNewAddress
                        ? <form onSubmit={handleNewAddressSubmit}>
                            <InputField
                                type='text'
                                placeholder='имена'
                                label='Имена'
                                name={'name'}
                                value={newAddress.name}
                                onChange={handleNewAddressChange}
                            />
                            <InputField
                                type='text'
                                placeholder='адрес за доставка'
                                label='Адрес за доставка'
                                name={'address'}
                                value={newAddress.address}
                                onChange={handleNewAddressChange}
                            />
                            <div style={{ marginTop: '16px', display: 'flex' }}>
                                <Button
                                    className='outlinedButton'
                                    style={{ padding: '12px 32px', borderRadius: '24px', width: '50%' }}
                                    onClick={() => setAddNewAddress(false)}
                                >
                                    ОТКАЖИ
                                </Button>
                                <Button
                                    type={'submit'}
                                    style={{ padding: '12px 32px', borderRadius: '24px' }}
                                >
                                    ЗАПАЗИ
                                </Button>
                            </div>
                        </form>
                        : <div className={styles.changeAddressSection}>
                            <Button
                                style={{ padding: '12px 32px', borderRadius: '24px' }}
                                onClick={() => setAddNewAddress(true)}
                            >
                                ДОБАВИ НОВ АДРЕС
                            </Button>
                        </div>}
                </div>
                <div className={styles.alergenSection}>
                    <span className={styles.sectionHeader}>АЛЕРГЕНИ</span>
                    <Divider style={{ margin: '20px 0' }} />
                    <form onSubmit={handleAllergenChangesSubmit}>
                        <ul className={styles.allergenList}>
                            {allergens.map((allergen) => {
                                return (
                                    <li key={allergen.id}>
                                        <div className={styles.allergenCheckbox}>
                                            <InputField
                                                className={'formGroupCheckbox'}
                                                value={allergen.id}
                                                type={'checkbox'}
                                                defaultChecked={userAllergensIds.some(id => id == allergen.id)}
                                                style={{ padding: '0', marginTop: '0px', marginRight: '5px', height: '20px' }}
                                                onChange={handleCheckboxChange}
                                            />
                                            <span>{allergen.name}</span>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        <Button style={{ padding: '12px 32px', borderRadius: '24px' }}>ЗАПАЗИ ПРОМЕНИТЕ</Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Settings;