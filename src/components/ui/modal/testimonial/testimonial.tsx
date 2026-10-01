'use client';

import ModalControls from '@/components/ui/modal/components/ModalControls';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/store/modals/modals.slice';
import AppIcon from '@/components/ui/icon/icon';
import { Icon } from '@/config/icon';

const Testimonial = ({ authorName, authorPosition, text, date }: any) => {
    const dispatch = useDispatch();

    return (
        <article className="flex flex-col gap-4 w-full items-center">
            <div className="flex flex-col gap-4 w-full items-center mt-4">
                <div
                    className=" dialog-drag-handle w-16 h-16 aspect-square rounded-full bg-bronze-30 flex flex-col justify-center items-center ">
                    <AppIcon name={Icon.NAME.TESTIMONIAL} className="text-bronze h-6 w-6"/>
                </div>
            </div>

            <div
                className={'flex flex-col justify-center  w-full text-dark-9 border border-dark-4 rounded-sm bg-dark-1 p-2 pb-4'}>
                <p className={'text-14'}>"{text}"</p>
                <p className={'text-14 text-bronze mt-4 font-medium'}>{authorName}</p>
                <p className={'text-12 mt-1 text-dark-8'}>{authorPosition}</p>
                <hr className={'my-4 text-dark-3'}/>
                <div className={'flex flex-row items-center justify-between'}>
                    <p className={'text-12 text-dark-8'}>{date}</p>
                    <a href="https://www.linkedin.com/in/andrey-evtukh/details/recommendations/?detailScreenTabIndex=0"
                       target="_blank"
                       className={'text-12 text-dark-8 cursor-pointer flex flex-row items-center gap-2'}>
                        <span>View original review</span>
                        <AppIcon name={Icon.NAME.LINK_OUT} className={'h-4 aspect-square'}/>
                    </a>
                </div>
            </div>

            <ModalControls okText={'Close'} isValid={true} showCancel={false} onSubmit={() => dispatch(closeModal())}/>
        </article>
    );
};

export default Testimonial;