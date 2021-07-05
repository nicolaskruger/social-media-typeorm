import { FC, useState } from 'react'
import { LocalStorageEnum } from '../../../enum'
import { LoaderContext, UserContext } from '../../../hooks'
import { MessageContext } from '../../../hooks/context/message.context'
import { useLocalStorage } from '../../../hooks/localstorage/localstorage.hook'
import { defMessage, defUser } from '../../../types'



const { user } = LocalStorageEnum;



export const CombineProviders: FC = ({ children }) => (

    <>
        <UserContext.Provider value={useLocalStorage(defUser, user)}>
            <LoaderContext.Provider value={useState(Boolean(false))}>
                <MessageContext.Provider value={useState(defMessage)}>
                    {children}
                </MessageContext.Provider>
            </LoaderContext.Provider>
        </UserContext.Provider>
    </>
)