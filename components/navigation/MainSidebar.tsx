"use client";

import { Home, MessageCircle, Compass, MenuIcon, Star } from "lucide-react";
import {
	Sidebar,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarContent,
	useSidebar,
} from "@/components/ui/sidebar";

export function MainSidebar() {
	const { toggleSidebar } = useSidebar();

	return (
		<Sidebar collapsible="icon" className="border-r" defaultChecked={false}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<a onClick={toggleSidebar} className="cursor-pointer">
								<MenuIcon className="w-5 h-5" />
								<span>Collapse</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<a href="/dashboard">
								<Home className="w-5 h-5" />
								<span>Home</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<a href="/explore">
								<Compass className="w-5 h-5" />
								<span>Explore</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<a href="/favorites">
								<Star className="w-5 h-5" />
								<span>Favorites</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<a href="/chat">
								<MessageCircle className="w-5 h-5" />
								<span>Messages</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent />
		</Sidebar>
	);
}
