"use client";

import React from "react";
import { logout } from "../utils/auth";
import { useRouter } from "next/navigation";
import {
    RiAddCircleLine,
    RiAddLine,
    RiArrowUpCircleLine,
    RiDiscordLine,
    RiHeartPulseLine,
    RiIdCardLine,
    RiLogoutBoxLine,
    RiMailAddLine,
    RiMessageLine,
    RiSettings2Line,
    RiSlackLine,
    RiTelegramLine,
    RiUserSmileLine,
    RiWhatsappLine,
} from "@remixicon/react";

import { Button } from "@/app/components/Button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuIconWrapper,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSubMenu,
    DropdownMenuSubMenuContent,
    DropdownMenuSubMenuTrigger,
    DropdownMenuTrigger,
} from "@/app/components/DropDownMenu";

export const DropdownMenuHero = () => {
    const router = useRouter();

    return (
        <div className="flex justify-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="secondary"
                        className="cursor-pointer w-full"
                    >
                        Options
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <RiArrowUpCircleLine className="size-4 text-blue-500" />
                            <button
                                className="block w-full text-blue-500 text-left ml-2 cursor-pointer"
                                onClick={() =>
                                    router.push("/subscription/pricing")
                                }
                            >
                                Upgrade
                            </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <DropdownMenuIconWrapper>
                                <RiIdCardLine className="size-4 text-inherit" />
                            </DropdownMenuIconWrapper>
                            <button
                                className="block w-full h-full ml-2 text-left cursor-pointer"
                                onClick={() =>
                                    router.push("/subscription/status")
                                }
                            >
                                Billing
                            </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <DropdownMenuIconWrapper>
                                <RiSettings2Line className="size-4 text-inherit" />
                            </DropdownMenuIconWrapper>
                            <button
                                onClick={() => {
                                    router.push("/dashboard");
                                }}
                                className="block w-full ml-2 text-left cursor-pointer"
                            >
                                Account Settings
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                        {/* <DropdownMenuItem hint="Pro">
                            <span className="flex items-center gap-x-2">
                                <RiUserSmileLine className="size-4 text-inherit" />
                                <span>Manage workspace</span>
                            </span>
                        </DropdownMenuItem> */}

                        <DropdownMenuSubMenu>
                            <DropdownMenuSubMenuTrigger>
                                <span className="flex items-center gap-x-2">
                                    <RiAddCircleLine className="size-4 text-inherit" />
                                    <span>Invite users WIP</span>
                                </span>
                            </DropdownMenuSubMenuTrigger>
                            <DropdownMenuSubMenuContent>
                                <DropdownMenuItem>
                                    <span className="flex items-center gap-x-2">
                                        <RiMailAddLine className="size-4 text-inherit" />
                                        <span>Email WIP</span>
                                    </span>
                                </DropdownMenuItem>

                                <DropdownMenuSubMenu>
                                    <DropdownMenuSubMenuTrigger>
                                        <span className="flex items-center gap-x-2">
                                            <RiMessageLine className="size-4 text-inherit" />
                                            <span>Message WIP</span>
                                        </span>
                                    </DropdownMenuSubMenuTrigger>
                                    <DropdownMenuSubMenuContent>
                                        <DropdownMenuItem>
                                            <span className="flex items-center gap-x-2">
                                                <RiWhatsappLine className="size-4 text-inherit" />
                                                <span>Whatsapp WIP</span>
                                            </span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <span className="flex items-center gap-x-2">
                                                <RiTelegramLine className="size-4 text-inherit" />
                                                <span>Telegram WIP</span>
                                            </span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <span className="flex items-center gap-x-2">
                                                <RiDiscordLine className="size-4 text-inherit" />
                                                <span>Discord WIP</span>
                                            </span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <span className="flex items-center gap-x-2">
                                                <RiSlackLine className="size-4 text-inherit" />
                                                <span>Slack WIP</span>
                                            </span>
                                        </DropdownMenuItem>
                                    </DropdownMenuSubMenuContent>
                                </DropdownMenuSubMenu>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <span className="flex items-center gap-x-2">
                                        <RiAddCircleLine className="size-4 text-inherit" />
                                        <span>More... WIP</span>
                                    </span>
                                </DropdownMenuItem>
                            </DropdownMenuSubMenuContent>
                        </DropdownMenuSubMenu>
                        {/* <DropdownMenuItem shortcut="⌘T">
                            <span className="flex items-center gap-x-2">
                                <RiAddLine className="size-4 text-inherit" />
                                <span>New Workspace</span>
                            </span>
                        </DropdownMenuItem> */}
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        <RiHeartPulseLine className="size-4 text-inherit" />
                        <a
                            href="https://paypal.me/Navist"
                            target="_blank"
                            className="block w-full ml-2 text-left cursor-pointer"
                        >
                            Support
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <RiLogoutBoxLine className="size-4 text-inherit" />
                        <button
                            onClick={() => {
                                logout();
                                router.push("/login");
                            }}
                            className="block w-full ml-2 text-left cursor-pointer"
                        >
                            Logout
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
