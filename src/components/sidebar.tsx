import { BsPlus, BsFillLightningFill , BsGearFill } from 'react-icons/bs'
import { FaFire, FaPoo } from 'react-icons/fa';

const SideBar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0
                        flex flex-col
                        bg-primary text-secondary">
            <SideBarIcon icon={<FaFire size="28" />} text="tooltip 💡" />
            <SideBarIcon icon={<BsPlus size="32" />} text="tooltip 💡" />
            <SideBarIcon icon={<BsFillLightningFill size="20" />} text="tooltip 💡" />
            <SideBarIcon icon={<FaPoo size="20" />} text="tooltip 💡" />
            <Divider />
            <SideBarIcon icon={<BsGearFill size="22" />} text="tooltip 💡" />
        </div>
    )
};

const SideBarIcon = ({ icon, text = 'tooltip 💡' } : { icon: JSX.Element, text: string}) => {
    return (
        <div className="sidebar-icon group">
            {icon}

            <span className="sidebar-tooltip group-hover:scale-100">
                {text}
            </span>
        </div>
    )
};

const Divider = () => <hr className="sidebar-hr" />

export default SideBar;