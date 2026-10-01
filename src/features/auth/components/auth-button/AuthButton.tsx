'use client';

import { Navigation } from '@/config/navigation';
import { AnimatePresence } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';

import AppSpinner from '@/components/ui/spinner/spinner';
import AppIcon from '@/components/ui/icon/icon';
import ModalAnimation from '@/components/ui/modal/ModalAnimation';

import { Icon } from '@/config/icon';
import { RootState } from '@/store/store';
import { openModal } from '@/store/modals/modals.slice';
import { Menu, MenuItem, MenuProps } from '@mui/material';
import { useState } from 'react';
import { useLogout } from '@/features/auth/hooks/useLogout';

const AuthButton = ({ location = Navigation.LOCATION.HEADER }: { location?: Navigation.Location }) => {
    const isSide = location === Navigation.LOCATION.SIDE;
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const { logout, loading: logoutLoading } = useLogout();
    const { userId, userName, role, email, authLoading } = useSelector(
        (state: RootState) => state.user
    );

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (authLoading) return;
        if (userId) {
            setAnchorEl(event.currentTarget);
        } else {
            dispatch(openModal({ id: 'login' }));
        }
    };

    const handleClose = () => setAnchorEl(null);
    const handleLogout = async () => {
        handleClose();
        await logout();
    };


    const renderIcon = () => {
        if (authLoading || logoutLoading) {
            return (
                <ModalAnimation key="spinner" className="h-full">
                    <AppSpinner/>
                </ModalAnimation>
            );
        }

        if (!userId) {
            return (
                <ModalAnimation key="user" className="h-full">
                    <AppIcon name={Icon.NAME.USER} className="h-full"/>
                </ModalAnimation>
            );
        }

        return (
            <ModalAnimation key="authenticated-user" className="h-full">
                <AppIcon name={Icon.NAME.USER} className="h-full text-bronze"/>
            </ModalAnimation>
        );
    };

    const menuItemSx = {
        fontFamily: 'Light',
        fontSize: '14px',
        minHeight: '40px',
        px: 2,
        '&:hover': {
            backgroundColor: '#2d2f33'
        }
    };

    const anchorOrigin: MenuProps['anchorOrigin'] = isSide
        ? { vertical: 'center', horizontal: 'right' }
        : { vertical: 'bottom', horizontal: 'right' };

    const transformOrigin: MenuProps['transformOrigin'] = isSide
        ? { vertical: 'center', horizontal: 'left' }
        : { vertical: 'top', horizontal: 'right' };

    return (
        <>
            <button
                translate="no"
                className={[
                    'h-full p-1 bg-dark-1 flex flex-row text-dark-6 aspect-square items-center justify-center cursor-pointer relative',
                    isSide ? 'rounded-full p-2 border border-dark-6' : 'rounded-md'
                ].join(' ')}
                onClick={handleClick}
            >
                <AnimatePresence mode="wait">
                    {renderIcon()}
                </AnimatePresence>
            </button>

            <Menu anchorEl={anchorEl}
                  translate="no"
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={anchorOrigin}
                  transformOrigin={transformOrigin}
                  slotProps={{
                      list: {
                          sx: {
                              pb: !isSide ? 0 : 1
                          }
                      },
                      paper: {
                          sx: {
                              mt: isSide ? 0 : 1,
                              ml: isSide ? 2 : 0,
                              minWidth: 180,
                              backgroundColor: '#242529',
                              border: '1px solid #4d4d4d',
                              borderRadius: '6px',
                              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                              color: '#f2f2f2',
                              overflow: 'visible',

                              ...(isSide && {
                                  '&::before': {
                                      content: '""',
                                      position: 'absolute',
                                      left: '-6px',
                                      top: '50%',
                                      width: '10px',
                                      height: '10px',
                                      backgroundColor: '#242529',
                                      borderLeft: '1px solid #4d4d4d',
                                      borderBottom: '1px solid #4d4d4d',
                                      transform: 'translateY(-50%) rotate(45deg)',
                                      zIndex: 0
                                  }
                              }),

                              ...(!isSide && {
                                  '&::before': {
                                      content: '""',
                                      position: 'absolute',
                                      left: '100%',
                                      top: '0%',
                                      ml: -2.6,
                                      width: '10px',
                                      height: '10px',
                                      backgroundColor: '#242529',
                                      borderLeft: '1px solid #4d4d4d',
                                      borderBottom: '1px solid #4d4d4d',
                                      transform: 'translateY(-50%) rotate(135deg)',
                                      zIndex: 0
                                  }
                              })
                          }
                      }
                  }}
            >
                <MenuItem sx={menuItemSx}
                          className="text-dark-9! flex! items-end! justify-center! flex-col! cursor-default! hover:bg-transparent!">
                    <div className={'text-14 font-medium! text-bronze!'}>{userName}</div>
                    <div className={'text-14 font-light!'}>{email}</div>
                    <div className={'text-12 mt-3'}>[Role : {role}]</div>
                </MenuItem>
                <MenuItem sx={menuItemSx}
                          className="text-bronze! border-0! border-t! border-t-dark-3! border-t-solid! p-3! flex! items-center! justify-center!"
                          onClick={handleLogout}> Logout </MenuItem>
            </Menu>
        </>
    );
};

export default AuthButton;