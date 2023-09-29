import { PaperClipIcon } from '@heroicons/react/20/solid'
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { server } from "../../../server";
import { backend_url } from "../../../server";
import axios from 'axios';
import Loader from '../../Layout/Loader';

const ViewUser = () => {
    const { id } = useParams();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const response = await axios.get(`${server}/user/user-info/${id}`);
    //             const { data } = response;
    //             setUser(data.user);
    //             setIsLoading(false);
    //         } catch (error) {
    //             console.error("Error fetching user:", error);
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchUser();
    // }, [id]);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${server}/user/user-info/${id}`);
                const { data } = response;
                console.log(data); // Log the response data to the console
                setUser(data.user);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

    if (isLoading) {
        return <div><Loader /></div>;
    }

    if (!user) {
        return <div>User not found.</div>;
    }

    if (isLoading) {
        return <div><Loader /></div>;
    }

    if (!user) {
        return <div>User not found.</div>;
    }

    return (
        <div>
            <div className="px-4 sm:px-0 flex justify-center items-center">
                <div className="text-center">
                    <h3 className="text-2xl font-semibold leading-7 text-gray-900">
                        User Information
                    </h3>
                    <p className="mt-1 max-w-2xl text-lg leading-6 text-gray-500">
                        Personal details.
                    </p>
                </div>
            </div>
            {/* profile image */}
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="flex items-center">
                        <div className="flex items-center ml-32">
                            <div className="w-1/2 flex-shrink-20 -space-x-2 overflow-hidden ml-30">
                                <img
                                    className="inline-block w-48 rounded-full ring-2 ring-white ml-30"
                                    src={`${backend_url}${user?.avatar}`}
                                    alt=""
                                />
                            </div>
                            <div className="w-1/2 ml-40">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 " style={{ width: '200%' }}>
                                        Full name:
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" style={{ width: '200%' }}>
                                        <span className="inline-block max-w-full">{user.name}</span>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Email:
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {user.email}
                                    </dd>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ml-32">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Phone:
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {user.phoneNumber}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ml-32">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Role:
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {user.role}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ml-32">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Created At:
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {user.createdAt}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ml-32">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Address:
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {/* {user.address} */}
                            <ul>
                                {user.addresses.map((address, index) => (
                                    <li key={index}>
                                        {address.addressType}, {address.address1}, {address.address2}, {address.city}, {address.country}, {address.zipCode}
                                    </li>
                                ))}
                            </ul>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900 ml-32">Attachments</dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0 ml-30">
                            <ul>
                                {user.documents.map((document, index) => (
                                    <li key={index}>

                                    </li>
                                ))}
                            </ul>
                            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200 mr-30">
                                {user.documents.map((document, index) => (
                                    <li key={index} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                        <div className="flex w-0 flex-1 items-center">
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span className="truncate font-medium">{document.documentType}</span>
                                            </div>
                                            <svg
                                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                {/* // src={`${backend_url}${user?.avatar}`} */}
                                                <span className="truncate font-medium">{document.pdfFile}</span>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <a href={`${backend_url}${document.pdfFile}`} target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                View
                                            </a>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>



    );
};

export default ViewUser;