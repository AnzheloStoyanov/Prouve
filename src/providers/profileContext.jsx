import { createContext, useContext, useState } from 'react';

const ProfilePageContext = createContext();

export const UserProfileProvider = ({ children }) => {
    const [selectedPage, setSelectedPage] = useState({});

    const updatePage = (page) => {
        setSelectedPage(page);
    };

    return (
        <ProfilePageContext.Provider value={{ selectedPage, updatePage }}>
            {children}
        </ProfilePageContext.Provider>
    );
};

export const useProfilePageContext = () => useContext(ProfilePageContext);