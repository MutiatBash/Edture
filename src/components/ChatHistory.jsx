import React from "react";
import ChatUser from "./ChatUser";

const ChatHistory = () => {
	return (
		<div className="bg-white pr-4 pt-4 border-r-[0.5px] border-r-lightGray w-[30%] fixed top-24 min-h-screen left-60 overflow-auto">
			<div className="">
				<ul className="flex flex-col gap-7">
					<ChatUser/>
					<ChatUser/>
					<ChatUser/>
					<ChatUser/>
					<ChatUser/>
					<ChatUser/>
					<ChatUser/>
					<ChatUser/>
					<ChatUser/>
					<ChatUser/>
					<ChatUser/>
					<ChatUser/>
					<ChatUser/>
					<ChatUser/>
					<ChatUser/>
					<ChatUser/>
				</ul>
			</div>
		</div>
	);
};

export default ChatHistory;
