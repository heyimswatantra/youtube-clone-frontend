import { Children, useState } from 'react'

import { ChevronDown, ChevronUp, Clapperboard, Home, Library, ListVideo, Repeat } from "lucide-react";
import { ElementType, ReactNode } from "react";
import Button, { buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";
import { playlists } from "../constants/sidebar";
import { useSidebarContext } from "../store/SidebarContext";
import { PageHeaderFirstSection } from './Header';


export default function SideBar() {
    const { isSmallOpen, isLargeOpen, close } = useSidebarContext()
  return (
    <>
        <aside className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${isLargeOpen ? "lg:hidden" : "lg:flex" }`}>
            <SmallSideBarItem Icon={Home} title="Home" url="/" />
            <SmallSideBarItem Icon={Repeat} title="Shorts" url="/shorts" />
            <SmallSideBarItem Icon={Clapperboard} title="Subscriptions" url="/subscriptions" />
            <SmallSideBarItem Icon={Library} title="Library" url="/library" />
         </aside>
         {isSmallOpen && (
            <div onClick={close} className='lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50' />
         )}
         <aside className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 lg:flex ${isLargeOpen ? "lg:flex" : "lg:hidden" }  ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden" }`}>
            <div className='lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white'>
                <PageHeaderFirstSection />
            </div>
             <LargeSidebarSection >
                <LargeSidebarItem isActive IconOrImageUrl={Home} title="Home" url="/" />
                <LargeSidebarItem IconOrImageUrl={Clapperboard} title="Shorts" url="/" />
                <LargeSidebarItem IconOrImageUrl={Library} title="Playlists" url="/" />
             </LargeSidebarSection>

             <hr />

             <LargeSidebarSection visibleItemCount={5}>
                <LargeSidebarItem IconOrImageUrl={Home} title="Home" url="/" />
                <LargeSidebarItem IconOrImageUrl={Clapperboard} title="Home" url="/" />
                <LargeSidebarItem IconOrImageUrl={Library} title="Home" url="/" />
                {playlists.map(playlist => (
                    <LargeSidebarItem 
                        key={playlist.id}
                        IconOrImageUrl={ListVideo}
                        title={playlist.name}
                        url={`/playlist?list=${playlist.id}`}
                    />
                ))}
             </LargeSidebarSection>

             <hr />

             <LargeSidebarSection visibleItemCount={5}>
                <LargeSidebarItem IconOrImageUrl={Home} title="Home" url="/" />
                <LargeSidebarItem IconOrImageUrl={Clapperboard} title="Home" url="/" />
                <LargeSidebarItem IconOrImageUrl={Library} title="Home" url="/" />
                {playlists.map(playlist => (
                    <LargeSidebarItem 
                        key={playlist.id}
                        IconOrImageUrl={ListVideo}
                        title={playlist.name}
                        url={`/playlist?list=${playlist.id}`}
                    />
                ))}
             </LargeSidebarSection>

             <hr />

             <LargeSidebarSection visibleItemCount={5}>
                <LargeSidebarItem IconOrImageUrl={Home} title="Home" url="/" />
                <LargeSidebarItem IconOrImageUrl={Clapperboard} title="Home" url="/" />
                <LargeSidebarItem IconOrImageUrl={Library} title="Home" url="/" />
                {playlists.map(playlist => (
                    <LargeSidebarItem 
                        key={playlist.id}
                        IconOrImageUrl={ListVideo}
                        title={playlist.name}
                        url={`/playlist?list=${playlist.id}`}
                    />
                ))}
             </LargeSidebarSection>

             <hr />

             <LargeSidebarSection visibleItemCount={5}>
                <LargeSidebarItem IconOrImageUrl={Home} title="Home" url="/" />
                <LargeSidebarItem IconOrImageUrl={Clapperboard} title="Home" url="/" />
                <LargeSidebarItem IconOrImageUrl={Library} title="Home" url="/" />
                {playlists.map(playlist => (
                    <LargeSidebarItem 
                        key={playlist.id}
                        IconOrImageUrl={ListVideo}
                        title={playlist.name}
                        url={`/playlist?list=${playlist.id}`}
                    />
                ))}
             </LargeSidebarSection>

         </aside>
    </>
  )
}

type SmallSideBarIconProps = {
    Icon: ElementType
    title: string
    url: string
}

function SmallSideBarItem({Icon, title, url}: SmallSideBarIconProps) {
    return <a href={url} className={twMerge(buttonStyles({variant: "ghost"}), "py-4 flex flex-col items-center gap-1 rounded-lg" )}>
        <Icon className="w-6 h-6" />
        <div className="text-sm">{title}</div>
    </a>
}

type LargeSidebarSectionProps = {
    children: ReactNode
    title?: string
    visibleItemCount?: number
}

function LargeSidebarSection({ 
    children,
    title,
    visibleItemCount = Number.POSITIVE_INFINITY
}: LargeSidebarSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const childrenArray = Children.toArray(children).flat()
    const showExpandButton = childrenArray.length > visibleItemCount
    const visibleChildren = isExpanded
        ? childrenArray
        : childrenArray.slice(0, visibleItemCount)
    const ButtonIcon = isExpanded ? ChevronUp : ChevronDown

    return (
        <div>
            {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div> }
            {visibleChildren}
            {showExpandButton && 
                <Button 
                    variant="ghost" 
                    onClick={() => setIsExpanded(e => !e)}
                    className="w-full flex items-center rounded-lg gap-4 p-3"
                >
                    <ButtonIcon className="w-6 h-6" />
                    <div>{isExpanded ? "Show Less" : "Show More"}</div>
                </Button>
            }
        </div>
    )
}

type LargeSidebarItemProps = {
    IconOrImageUrl: ElementType | string
    title: string
    url: string
    isActive?: boolean
}

function LargeSidebarItem({IconOrImageUrl, title, url, isActive}: LargeSidebarItemProps) {
    return (
        <a 
            href={url} 
            className={twMerge(
                buttonStyles({variant: "ghost"}), `w-full flex items-center rounded-lg gap-4 p-3 ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined}`
            )}
        >
            {typeof IconOrImageUrl === "string" ? (
                <img src={IconOrImageUrl} className='w-6 h-6 rounded-full'/>
            ) : (
                <IconOrImageUrl className="w-6 h-6" />
            )}
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                {title}
            </div>
        </a>
    )
}