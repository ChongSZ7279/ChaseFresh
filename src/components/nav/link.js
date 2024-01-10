
import { FaHome } from "react-icons/fa";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { FaPlusCircle } from "react-icons/fa";
import { BsListTask } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
export const links = [
    {   
        name: 'Home', 
        path: '/home', 
        icon: FaHome },
    { 
        name: 'Refrigerator', 
        path: '/refrigerator', 
        icon: CgSmartHomeRefrigerator,
    },
    {
        name: 'Thing', 
        path: '/add-thing', 
        icon: FaPlusCircle,
    },
    { 
        name: 'Type',
        path: '/add-type',
        icon: BsListTask,
    },
    { 
        name: 'Personal',
        path: '/personal-information',
        icon: IoPersonOutline,
    },
];