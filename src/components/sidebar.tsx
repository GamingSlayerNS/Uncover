import { Link } from 'react-router-dom';

import { BsFillLightningFill, BsFillBarChartFill, BsGearFill } from 'react-icons/bs';
import { FaFire } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';

const SideBar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0
                        flex flex-col
                        bg-primary text-secondary">
            <Link to={``}>
                <SideBarIcon icon={<FaFire size="28" />} text="Search 💡" />
            </Link>
            <Link to={`trending`}>
                <SideBarIcon icon={<BsFillLightningFill size="28" />} text="Trending 💡" />
            </Link>
            <Link to={`firestore`}>
                <SideBarIcon icon={<BsFillBarChartFill size="28" />} text="Firestore 💡" />
            </Link>
            <Link to={`admin-console`}>
                <SideBarIcon icon={<RiAdminFill size="28" />} text="Administator Console 💡" />
            </Link>
            <Divider />
            <Link to={'settings'}>
                <SideBarIcon icon={<BsGearFill size="28" />} text="Settings 💡" />
            </Link>
        </div>
    )
};

export const SideBarIcon = ({ icon, text = 'tooltip 💡' } : { icon: JSX.Element, text: string}) => {
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